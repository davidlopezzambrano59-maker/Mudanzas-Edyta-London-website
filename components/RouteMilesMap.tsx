'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { 
  metersToMiles, 
  debounce, 
  selectBestRoute, 
  calculateRouteDistance,
  geocodeAddress 
} from '@/lib/maps';

interface RouteMilesMapProps {
  onMilesChange?: (miles: number) => void;
  maxStops?: number;
  initial?: {
    pickup?: string;
    stops?: string[];
    destination?: string;
  };
  className?: string;
}

interface ExtraStop {
  id: string;
  value: string;
  autocomplete?: google.maps.places.Autocomplete;
}

export default function RouteMilesMap({
  onMilesChange,
  maxStops = 5,
  initial,
  className = ''
}: RouteMilesMapProps) {
  // Refs
  const mapRef = useRef<HTMLDivElement>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const milesInputRef = useRef<HTMLInputElement>(null);

  // State
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string>('');
  const [status, setStatus] = useState<string>('Loading Maps...');
  const [miles, setMiles] = useState<number>(0);
  const [extraStops, setExtraStops] = useState<ExtraStop[]>([]);
  const [pickup, setPickup] = useState(initial?.pickup || '');
  const [destination, setDestination] = useState(initial?.destination || '');

  // Google Maps instances
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);
  const [pickupAutocomplete, setPickupAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [destinationAutocomplete, setDestinationAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  // Initialize Google Maps
  useEffect(() => {
    const initMaps = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GMAPS_KEY;
        if (!apiKey) {
          throw new Error('Google Maps API key not found. Please set NEXT_PUBLIC_GMAPS_KEY');
        }

        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places'],
          region: 'GB'
        });

        await loader.load();

        if (!mapRef.current) return;

        // Initialize map
        const mapInstance = new google.maps.Map(mapRef.current, {
          zoom: 10,
          center: { lat: 51.5074, lng: -0.1278 }, // London center
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ]
        });

        // Initialize services
        const directionsServiceInstance = new google.maps.DirectionsService();
        const directionsRendererInstance = new google.maps.DirectionsRenderer({
          map: mapInstance,
          suppressMarkers: false,
          polylineOptions: {
            strokeColor: '#FF8A00',
            strokeWeight: 4
          }
        });
        const geocoderInstance = new google.maps.Geocoder();

        setMap(mapInstance);
        setDirectionsService(directionsServiceInstance);
        setDirectionsRenderer(directionsRendererInstance);
        setGeocoder(geocoderInstance);

        // Setup autocomplete
        if (pickupInputRef.current && destinationInputRef.current) {
          setupAutocomplete(pickupInputRef.current, destinationInputRef.current);
        }

        // Initialize extra stops if provided
        if (initial?.stops) {
          const initialStops: ExtraStop[] = initial.stops.map((stop, index) => ({
            id: `stop-${Date.now()}-${index}`,
            value: stop
          }));
          setExtraStops(initialStops);
        }

        setIsLoaded(true);
        setStatus('Maps loaded successfully');
        setError('');

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load Google Maps';
        setError(errorMessage);
        setStatus('Error loading Maps');
        console.error('Google Maps initialization error:', err);
      }
    };

    initMaps();
  }, [initial?.stops]);

  // Setup autocomplete for pickup and destination
  const setupAutocomplete = useCallback((pickupInput: HTMLInputElement, destinationInput: HTMLInputElement) => {
    const autocompleteOptions: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: 'gb' },
      fields: ['place_id', 'geometry', 'name']
    };

    const pickupAC = new google.maps.places.Autocomplete(pickupInput, autocompleteOptions);
    const destinationAC = new google.maps.places.Autocomplete(destinationInput, autocompleteOptions);

    pickupAC.addListener('place_changed', () => {
      debouncedCalculateRoute();
    });

    destinationAC.addListener('place_changed', () => {
      debouncedCalculateRoute();
    });

    setPickupAutocomplete(pickupAC);
    setDestinationAutocomplete(destinationAC);
  }, []);

  // Get place ID for an address
  const getPlaceId = useCallback(async (address: string): Promise<string | null> => {
    if (!geocoder || !address.trim()) return null;
    return geocodeAddress(geocoder, address.trim());
  }, [geocoder]);

  // Calculate route
  const calculateRoute = useCallback(async () => {
    if (!directionsService || !directionsRenderer || !pickup.trim() || !destination.trim()) {
      setStatus('Enter pickup and destination addresses');
      return;
    }

    try {
      setStatus('Calculating route...');

      // Get place IDs
      const originPlaceId = await getPlaceId(pickup);
      const destinationPlaceId = await getPlaceId(destination);

      if (!originPlaceId || !destinationPlaceId) {
        throw new Error('Could not find valid addresses');
      }

      // Get waypoints from extra stops
      const waypoints: google.maps.DirectionsWaypoint[] = [];
      for (const stop of extraStops) {
        if (stop.value.trim()) {
          const placeId = await getPlaceId(stop.value);
          if (placeId) {
            waypoints.push({
              location: { placeId },
              stopover: true
            });
          }
        }
      }

      // Calculate route
      const request: google.maps.DirectionsRequest = {
        origin: { placeId: originPlaceId },
        destination: { placeId: destinationPlaceId },
        waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidTolls: true,
        provideRouteAlternatives: true
      };

      directionsService.route(request, (result, status) => {
        if (status === 'OK' && result) {
          try {
            // Select best route
            const bestRoute = selectBestRoute(result.routes);
            
            // Create new result with only the best route for rendering
            const bestRouteResult: google.maps.DirectionsResult = {
              ...result,
              routes: [bestRoute]
            };

            // Display route
            directionsRenderer.setDirections(bestRouteResult);

            // Calculate total distance
            const totalMeters = calculateRouteDistance(bestRoute);
            const calculatedMiles = metersToMiles(totalMeters, 1);

            // Update state and callbacks
            setMiles(calculatedMiles);
            setStatus(`Route calculated: ${calculatedMiles} miles`);
            setError('');

            // Update hidden input
            if (milesInputRef.current) {
              milesInputRef.current.value = calculatedMiles.toString();
            }

            // Call callbacks
            onMilesChange?.(calculatedMiles);
            
            // Call global recalc function if available
            if (typeof window !== 'undefined' && 'recalcQuote' in window) {
              (window as any).recalcQuote?.();
            }

          } catch (routeError) {
            console.error('Route processing error:', routeError);
            setError('Error processing route');
            setStatus('Route calculation failed');
          }
        } else {
          console.error('Directions request failed:', status);
          setError(`Route calculation failed: ${status}`);
          setStatus('Unable to calculate route');
        }
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Route calculation error';
      console.error('Calculate route error:', err);
      setError(errorMessage);
      setStatus('Route calculation failed');
    }
  }, [directionsService, directionsRenderer, pickup, destination, extraStops, getPlaceId, onMilesChange]);

  // Debounced route calculation
  const debouncedCalculateRoute = useCallback(
    debounce(calculateRoute, 300),
    [calculateRoute]
  );

  // Handle input changes
  useEffect(() => {
    if (isLoaded && (pickup || destination)) {
      debouncedCalculateRoute();
    }
  }, [pickup, destination, extraStops, isLoaded, debouncedCalculateRoute]);

  // Add extra stop
  const addExtraStop = useCallback(() => {
    if (extraStops.length >= maxStops) return;

    const newStop: ExtraStop = {
      id: `stop-${Date.now()}`,
      value: ''
    };

    setExtraStops(prev => [...prev, newStop]);
  }, [extraStops.length, maxStops]);

  // Remove extra stop
  const removeExtraStop = useCallback((id: string) => {
    setExtraStops(prev => prev.filter(stop => stop.id !== id));
  }, []);

  // Update extra stop value
  const updateExtraStop = useCallback((id: string, value: string) => {
    setExtraStops(prev => 
      prev.map(stop => 
        stop.id === id ? { ...stop, value } : stop
      )
    );
  }, []);

  // Setup autocomplete for extra stop
  const setupExtraStopAutocomplete = useCallback((input: HTMLInputElement, stopId: string) => {
    if (!isLoaded) return;

    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: 'gb' },
      fields: ['place_id', 'geometry', 'name']
    });

    autocomplete.addListener('place_changed', () => {
      debouncedCalculateRoute();
    });

    // Store autocomplete instance
    setExtraStops(prev => 
      prev.map(stop => 
        stop.id === stopId ? { ...stop, autocomplete } : stop
      )
    );
  }, [isLoaded, debouncedCalculateRoute]);

  return (
    <div className={`route-miles-map ${className}`}>
      {/* Hidden miles input for integration */}
      <input
        ref={milesInputRef}
        id="miles"
        type="hidden"
        value={miles}
        readOnly
      />

      {/* Address inputs */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📍 Pickup Address
          </label>
          <input
            ref={pickupInputRef}
            type="text"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            onBlur={() => debouncedCalculateRoute()}
            placeholder="Enter pickup address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🏁 Destination Address
          </label>
          <input
            ref={destinationInputRef}
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onBlur={() => debouncedCalculateRoute()}
            placeholder="Enter destination address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Extra stops */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            🛑 Extra Stops (Optional)
          </label>
          <div className="space-y-2">
            {extraStops.map((stop, index) => (
              <div key={stop.id} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={stop.value}
                  onChange={(e) => updateExtraStop(stop.id, e.target.value)}
                  onBlur={() => debouncedCalculateRoute()}
                  onFocus={(e) => {
                    if (!stop.autocomplete) {
                      setupExtraStopAutocomplete(e.target, stop.id);
                    }
                  }}
                  placeholder={`Extra stop ${index + 1}`}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="button"
                  onClick={() => removeExtraStop(stop.id)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  ×
                </button>
              </div>
            ))}
            
            {extraStops.length < maxStops && (
              <button
                type="button"
                onClick={addExtraStop}
                className="w-full px-3 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-md hover:border-orange-500 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                + Add Stop ({extraStops.length}/{maxStops})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Status and distance display */}
      <div className="mb-4">
        {error ? (
          <div className="text-red-600 text-sm">⚠️ {error}</div>
        ) : (
          <div className="text-gray-600 text-sm">{status}</div>
        )}
        
        {miles > 0 && !error && (
          <div className="text-lg font-semibold text-orange-600 mt-2">
            Distance: {miles} miles
          </div>
        )}
      </div>

      {/* Map */}
      <div 
        ref={mapRef}
        className="w-full h-80 rounded-lg border border-gray-300 bg-gray-100"
        style={{ minHeight: '320px' }}
      />

      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto mb-2"></div>
            <div className="text-gray-600">Loading Maps...</div>
          </div>
        </div>
      )}
    </div>
  );
}

