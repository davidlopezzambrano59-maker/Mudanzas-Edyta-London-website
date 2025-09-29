/**
 * REQUIRED GOOGLE MAPS APIS:
 * - Maps JavaScript API
 * - Places API  
 * - Directions API
 * - Geocoding API
 * 
 * SETUP:
 * 1. Enable the above APIs in Google Cloud Console
 * 2. Set NEXT_PUBLIC_GMAPS_KEY in your .env.local
 * 3. Configure API key restrictions:
 *    - Application restrictions: HTTP referrers (websites)
 *    - Add your domain: yourdomain.com/*
 *    - API restrictions: Restrict to the 4 APIs listed above
 */

'use client';

import React, { useState, useEffect } from 'react';
import RouteMilesMap from '@/components/RouteMilesMap';

export default function QuotePage() {
  const [miles, setMiles] = useState<number>(0);
  const [vanSize, setVanSize] = useState<number>(45);
  const [loaders, setLoaders] = useState<number>(1);
  const [hours, setHours] = useState<number>(2);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Mock pricing calculation (replace with your actual logic)
  const calculateQuote = () => {
    const baseHourly = vanSize + (loaders * 25);
    const billableHours = Math.max(2, hours);
    const distanceCharge = miles * 1.5; // £1.50 per mile
    const total = (baseHourly * billableHours) + distanceCharge;
    setTotalCost(total);
  };

  // Recalculate when dependencies change
  useEffect(() => {
    calculateQuote();
  }, [miles, vanSize, loaders, hours]);

  // Make recalcQuote available globally for the map component
  useEffect(() => {
    (window as any).recalcQuote = calculateQuote;
    return () => {
      delete (window as any).recalcQuote;
    };
  }, [miles, vanSize, loaders, hours]);

  const handleMilesChange = (newMiles: number) => {
    setMiles(newMiles);
    console.log('Miles updated:', newMiles);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            🚚 Mudanzas Edyta London - Quote Calculator
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Route and Map Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                📍 Route Planning
              </h2>
              
              <RouteMilesMap
                onMilesChange={handleMilesChange}
                maxStops={5}
                initial={{
                  pickup: '',
                  destination: '',
                  stops: []
                }}
                className="w-full"
              />
            </div>

            {/* Quote Calculator Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                💰 Quote Calculator
              </h2>

              <div className="space-y-4">
                {/* Van Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    🚐 Van Size
                  </label>
                  <select
                    value={vanSize}
                    onChange={(e) => setVanSize(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value={40}>Small Van (£40/hour)</option>
                    <option value={45}>Medium Van (£45/hour)</option>
                    <option value={50}>Luton Van - 17.3m³ (£50/hour)</option>
                  </select>
                </div>

                {/* Number of Loaders */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    👷 Number of Loaders
                  </label>
                  <select
                    value={loaders}
                    onChange={(e) => setLoaders(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value={0}>No additional loaders</option>
                    <option value={1}>1 loader (+£25/hour)</option>
                    <option value={2}>2 loaders (+£50/hour)</option>
                    <option value={3}>3 loaders (+£75/hour)</option>
                  </select>
                </div>

                {/* Estimated Hours */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ⏰ Estimated Hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <small className="text-gray-500 text-sm">2-hour minimum applies</small>
                </div>

                {/* Distance Display */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    📍 Distance
                  </label>
                  <div className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    {miles > 0 ? `${miles} miles` : 'Enter addresses to calculate'}
                  </div>
                </div>

                {/* Quote Breakdown */}
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <h3 className="font-semibold text-orange-800 mb-3">Quote Breakdown</h3>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Van Rate:</span>
                      <span>£{vanSize}/hour</span>
                    </div>
                    
                    {loaders > 0 && (
                      <div className="flex justify-between">
                        <span>Loaders ({loaders} × £25):</span>
                        <span>£{loaders * 25}/hour</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between">
                      <span>Hourly Rate:</span>
                      <span>£{vanSize + (loaders * 25)}/hour</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Labour ({Math.max(2, hours)}h):</span>
                      <span>£{((vanSize + (loaders * 25)) * Math.max(2, hours)).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Distance ({miles} miles):</span>
                      <span>£{(miles * 1.5).toFixed(2)}</span>
                    </div>
                    
                    <hr className="border-orange-200" />
                    
                    <div className="flex justify-between font-bold text-lg text-orange-800">
                      <span>Total:</span>
                      <span>£{totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      const message = `🚚 QUOTE REQUEST - Mudanzas Edyta London Limited

📍 ROUTE
Distance: ${miles} miles

🚐 SERVICE DETAILS
Van: ${vanSize === 40 ? 'Small' : vanSize === 45 ? 'Medium' : 'Luton'} Van
Loaders: ${loaders}
Duration: ${Math.max(2, hours)} hours

💰 TOTAL: £${totalCost.toFixed(2)}

✅ Please confirm this quote and let me know your preferred moving date!

"Lift on the way" 🚀`;
                      
                      const url = `https://wa.me/447456507570?text=${encodeURIComponent(message)}`;
                      window.open(url, '_blank');
                    }}
                    className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    📱 Book via WhatsApp
                  </button>
                  
                  <button
                    onClick={() => window.location.href = 'tel:+447456507570'}
                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    📞 Call 07456 507 570
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Debug Info (remove in production) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-2">Debug Info</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Miles: {miles}</div>
                <div>Van Size: £{vanSize}/hour</div>
                <div>Loaders: {loaders} (£{loaders * 25}/hour)</div>
                <div>Hours: {hours} (billable: {Math.max(2, hours)})</div>
                <div>Total Cost: £{totalCost.toFixed(2)}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

