# 🚚 Mudanzas Edyta London - Next.js Quote Calculator

A professional removal service website with Google Maps integration for accurate distance calculation and route planning.

## 🗺️ Google Maps Setup (REQUIRED)

### 1. Enable Required APIs

In [Google Cloud Console](https://console.cloud.google.com/), enable these APIs:

- **Maps JavaScript API** - For map display and interaction
- **Places API** - For address autocomplete
- **Directions API** - For route calculation
- **Geocoding API** - For address validation

### 2. Create API Key

1. Go to Google Cloud Console → Credentials
2. Create API Key
3. Copy the key to your `.env.local`:

```bash
NEXT_PUBLIC_GMAPS_KEY=your_api_key_here
```

### 3. Configure API Restrictions (IMPORTANT)

**Application Restrictions:**
- Type: HTTP referrers (websites)
- Website restrictions: `yourdomain.com/*`, `localhost:3000/*`

**API Restrictions:**
- Restrict key to the 4 APIs listed above

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Copy environment file
cp env.example .env.local

# Add your Google Maps API key to .env.local
NEXT_PUBLIC_GMAPS_KEY=your_actual_api_key_here

# Start development server
npm run dev
```

Visit `http://localhost:3000/quote` to see the calculator in action.

## 📁 Project Structure

```
├── components/
│   └── RouteMilesMap.tsx     # Main Google Maps component
├── lib/
│   └── maps.ts               # Maps utilities and helpers
├── app/
│   └── quote/
│       └── page.tsx          # Example quote calculator page
├── package.json              # Dependencies including @googlemaps/js-api-loader
└── README.md                 # This file
```

## 🧩 Component Usage

```tsx
import RouteMilesMap from '@/components/RouteMilesMap';

function MyPage() {
  const handleMilesChange = (miles: number) => {
    console.log('Distance updated:', miles);
    // Update your calculator here
  };

  return (
    <RouteMilesMap
      onMilesChange={handleMilesChange}
      maxStops={5}
      initial={{
        pickup: 'London Bridge, London',
        destination: 'Canary Wharf, London',
        stops: ['Tower Bridge, London']
      }}
      className="my-custom-class"
    />
  );
}
```

## ⚙️ Component Props

| Prop | Type | Description |
|------|------|-------------|
| `onMilesChange?` | `(miles: number) => void` | Callback when distance changes |
| `maxStops?` | `number` | Maximum extra stops (default: 5) |
| `initial?` | `object` | Initial addresses |
| `className?` | `string` | Additional CSS classes |

## 🎯 Features

### ✅ Smart Route Selection
- Avoids tolls when possible
- Selects routes without congestion warnings
- Falls back to fastest route if needed

### ✅ Accurate Distance Calculation
- Uses Google Directions API for real driving distances
- Converts meters to miles (1 decimal place)
- Accounts for waypoints and traffic

### ✅ UK-Focused
- Address autocomplete restricted to UK (`gb`)
- Optimized for London postal codes
- Proper handling of UK address formats

### ✅ Integration Ready
- Updates hidden `#miles` input automatically
- Calls `window.recalcQuote()` after route calculation
- Provides `onMilesChange` callback for React integration

### ✅ User Experience
- 300ms debounced API calls
- Loading states and error handling
- Responsive design with Tailwind CSS
- Add/remove extra stops dynamically

## 🔧 Technical Details

### Route Selection Algorithm
1. Request multiple route alternatives
2. Filter out routes with toll/congestion warnings
3. Select best route or fallback to first route
4. Sum distance from all route legs
5. Convert meters to miles with 1 decimal precision

### Error Handling
- Graceful API failures
- Invalid address handling
- Network timeout recovery
- User-friendly error messages

### Performance
- Debounced route calculations (300ms)
- Efficient re-renders with React hooks
- Minimal API calls with smart caching

## 💰 API Costs (Estimated)

For a typical removal business:

- **Places Autocomplete**: ~$2.83/1000 requests
- **Directions API**: ~$5.00/1000 requests  
- **Geocoding**: ~$5.00/1000 requests

**Monthly estimate**: $20-100 depending on usage

## 🐛 Troubleshooting

### "API key not found"
- Check `.env.local` has `NEXT_PUBLIC_GMAPS_KEY`
- Restart development server after adding key

### "This API project is not authorized"
- Enable required APIs in Google Cloud Console
- Check API key restrictions match your domain

### Autocomplete not working
- Verify Places API is enabled
- Check browser console for errors
- Ensure API key has proper restrictions

### Routes not calculating
- Confirm Directions API is enabled
- Check addresses are valid UK locations
- Verify network connectivity

## 📞 Support

For technical issues with the Google Maps integration, check:
1. Google Cloud Console API usage
2. Browser developer console for errors
3. Network tab for failed API requests

## 🚀 Deployment

1. Add your production domain to API key restrictions
2. Set `NEXT_PUBLIC_GMAPS_KEY` in your deployment environment
3. Build and deploy: `npm run build && npm start`

The component will automatically work with your existing quote calculator by updating the hidden `#miles` input and calling `window.recalcQuote()`.