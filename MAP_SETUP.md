# Map Setup for NannyNest

## What's New

The nanny dashboard now includes an interactive map showing:

- **Nanny's current location** (pink marker with emoji 👩‍🏫)
- **Nearby upcoming bookings** (red pin markers)
- **Booking addresses** displayed on each booking card

## Installed Package

- `react-native-maps` - Installed via `npx expo install react-native-maps`

## Changes Made

### 1. Nanny Dashboard (`/app/(nanny)/(tabs)/index.tsx`)

- Added MapView component with placeholder San Francisco coordinates
- Display nanny's location with custom marker
- Show all upcoming bookings as markers on the map
- Added location addresses to booking cards
- Map shows a small area around the nanny's location (0.02 degree delta)

### 2. Configuration (`app.json`)

- Added Google Maps API key placeholders for both iOS and Android
- **Note**: Maps will work with a basic view without API keys, but for production you'll need:
  - Google Maps API key for Android
  - Google Maps API key for iOS

## Getting Google Maps API Keys (Optional)

For production builds, you'll want to get proper API keys:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps SDK for Android
   - Maps SDK for iOS
4. Create credentials (API Keys)
5. Replace `YOUR_GOOGLE_MAPS_API_KEY` in `app.json` with your actual keys

## Testing

The map uses placeholder coordinates in San Francisco:

- **Nanny Location**: 37.7879, -122.4075
- **Booking 1**: 37.7849, -122.4094
- **Booking 2**: 37.7899, -122.4070

## Customization

You can customize the map by:

- Changing marker colors (currently using `colors.primary500` and `colors.error`)
- Adjusting the map region/zoom level (change `latitudeDelta` and `longitudeDelta`)
- Adding more marker types or custom marker components
- Enabling map features like traffic, buildings, etc.

## Map Features

- **Interactive**: Users can pan and zoom
- **Markers**: Custom emoji marker for nanny, standard pins for bookings
- **Info**: Tap markers to see title and description
- **Styling**: Rounded corners with shadow to match app design

## Future Enhancements

- Real-time location tracking
- Route navigation to booking locations
- Distance calculation and ETA
- Cluster markers when there are many bookings
- Filter bookings by date/status on the map
