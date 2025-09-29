/**
 * Google Maps utilities for distance calculation and routing
 */

/**
 * Convert meters to miles with specified decimal places
 */
export function metersToMiles(meters: number, decimals: number = 1): number {
  const miles = meters / 1609.344;
  return Math.round(miles * Math.pow(10, decimals)) / Math.pow(10, decimals);
}

/**
 * Debounce function to limit API calls
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Check if a route has toll or congestion warnings
 */
export function hasUndesirableWarnings(route: google.maps.DirectionsRoute): boolean {
  const warnings = (route.warnings || []).join(' ');
  return /toll|congestion/i.test(warnings);
}

/**
 * Find the best route avoiding tolls and congestion when possible
 */
export function selectBestRoute(routes: google.maps.DirectionsRoute[]): google.maps.DirectionsRoute {
  if (routes.length === 0) {
    throw new Error('No routes available');
  }
  
  // Try to find a route without toll/congestion warnings
  const routeWithoutWarnings = routes.find(route => !hasUndesirableWarnings(route));
  
  // Return the best route or fallback to first route
  return routeWithoutWarnings || routes[0];
}

/**
 * Calculate total distance from route legs
 */
export function calculateRouteDistance(route: google.maps.DirectionsRoute): number {
  return route.legs.reduce((total, leg) => total + leg.distance!.value, 0);
}

/**
 * Geocode an address to get place_id
 */
export async function geocodeAddress(
  geocoder: google.maps.Geocoder,
  address: string
): Promise<string | null> {
  return new Promise((resolve) => {
    geocoder.geocode(
      {
        address,
        componentRestrictions: { country: 'GB' }
      },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          resolve(results[0].place_id);
        } else {
          resolve(null);
        }
      }
    );
  });
}

