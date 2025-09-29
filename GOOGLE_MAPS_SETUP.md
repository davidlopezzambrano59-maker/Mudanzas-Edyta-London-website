# 🗺️ Google Maps API Setup Instructions

## 📋 Quick Setup Guide

### Step 1: Get Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable these APIs:
   - **Maps JavaScript API**
   - **Places API**
   - **Directions API**
   - **Geocoding API**
4. Create credentials → API Key
5. Copy your API key

### Step 2: Update Your Website
1. Open `index.html`
2. Find this line (around line 780):
   ```html
   <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&libraries=places&region=GB&callback=initMap"></script>
   ```
3. Replace `YOUR_API_KEY_HERE` with your actual API key

### Step 3: Configure API Restrictions (Recommended)
1. In Google Cloud Console, go to your API key
2. Set **Application restrictions** to "HTTP referrers"
3. Add your website domain (e.g., `yourdomain.com/*`)
4. Set **API restrictions** to only the APIs you need

## 🚀 Features You'll Get

### ✅ Address Autocomplete
- UK-only address suggestions
- Real-time validation
- Postcode recognition

### ✅ Accurate Distance Calculation
- Driving distances in miles (rounded to 1 decimal)
- Accounts for actual road routes
- Includes traffic considerations

### ✅ Interactive Route Map
- Visual route display
- Your brand colors (orange)
- Route duration estimates

### ✅ Extra Stops Support
- Up to 5 waypoints
- Add/remove stops dynamically
- Automatic route recalculation

### ✅ Smart Pricing Integration
- Automatic mileage updates
- Real-time quote recalculation
- All charges applied correctly

## 💰 API Costs (Typical Usage)

- **Places Autocomplete**: ~$2.83 per 1000 requests
- **Directions API**: ~$5.00 per 1000 requests
- **Geocoding**: ~$5.00 per 1000 requests

**Estimated monthly cost for small business**: $10-50

## 🔧 Troubleshooting

### API Key Issues
- Check the API key is correct
- Ensure all required APIs are enabled
- Verify domain restrictions

### No Autocomplete
- Check browser console for errors
- Verify Places API is enabled
- Check API key restrictions

### Distance Not Calculating
- Ensure Directions API is enabled
- Check address validity
- Verify geocoding is working

## 🌟 Your Enhanced Calculator Now Has:

1. **Real Google Maps Integration** ✅
2. **UK Address Autocomplete** ✅
3. **Accurate Driving Distances** ✅
4. **Visual Route Display** ✅
5. **Extra Stops Management** ✅
6. **300ms Debounced Updates** ✅
7. **Error Handling** ✅
8. **Mobile Responsive** ✅

Just add your API key and you're ready to go! 🚀


