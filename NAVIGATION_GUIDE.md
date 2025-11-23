# Navigation Guide - NannyNest Mobile App

## How to Access Different Flows

### 🔐 Authentication Entry Point

**Current Setup**: The app starts at the **Login** screen (`/app/index.tsx` redirects to `/(auth)/login`)

### 👨‍👩‍👧 Client/Parent Flow

**How to access:**

1. **Option 1: Standard Login** (`/(auth)/login`)

   - Open the app
   - Enter any email/password
   - Click "Log In"
   - You'll be redirected to Parent Home (`/(main)/(tabs)`)

2. **Option 2: Role Selection Login** (`/(auth)/role-selection-login`)
   - Select "I'm a Parent" card
   - Enter credentials
   - Click "Log In"
   - You'll be redirected to Parent Home

**Parent Flow Includes:**

- **Home Tab** - Browse and search for nannies
- **Orders Tab** - View booking history and upcoming bookings
- **Profile Tab** - Manage account settings
- **Booking Flow**:
  - Tap nanny card → Nanny Profile
  - "Book Now" → Booking Details (date, time, children)
  - "Continue" → Booking Confirmation
  - "Confirm Booking" → Booking Success

### 👩‍🍼 Nanny Flow

**How to access:**

1. **Option 1: Role Selection Login** (`/(auth)/role-selection-login`)

   - Navigate to: `/(auth)/role-selection-login`
   - Select "I'm a Nanny" card
   - Enter any credentials
   - Click "Log In"
   - You'll be redirected to Nanny Dashboard (`/(nanny)/(tabs)`)

2. **Option 2: Change Login Screen Default**
   - Edit `/app/index.tsx`
   - Change redirect from `/(auth)/login` to `/(auth)/role-selection-login`

**Nanny Flow Includes:**

- **Dashboard Tab** - View stats, map with job locations, upcoming bookings
- **Bookings Tab** - Manage all booking requests and history
- **Profile Tab** - Account settings and wallet access
- **Special Features**:
  - Interactive Map showing nanny location and nearby jobs
  - Wallet for earnings tracking
  - KYC Verification flow

### 💰 Wallet Screen (Nanny Only)

**How to access:**

1. Login as Nanny (use role selection)
2. Navigate to Profile tab
3. Tap "My Wallet" 💰 menu item
4. View balance, transactions, and withdrawal options

**Wallet Features:**

- Total balance with available/pending breakdown
- Transaction history
- Withdraw funds button
- Add bank account option

## Navigation Structure

### Root Structure

```
/
├── (auth)/              # Authentication flows
│   ├── login.tsx
│   ├── register.tsx
│   ├── role-selection-login.tsx
│   ├── reset-password.tsx
│   └── ...
├── (main)/              # Parent/Client app
│   ├── (tabs)/
│   │   ├── index.tsx      (Home)
│   │   ├── orders.tsx     (Bookings)
│   │   └── profile.tsx    (Profile)
│   ├── nanny-profile.tsx
│   ├── booking-details.tsx
│   ├── booking-confirmation.tsx
│   └── booking-success.tsx
└── (nanny)/             # Nanny app
    ├── (tabs)/
    │   ├── index.tsx      (Dashboard with Map)
    │   ├── bookings.tsx   (Job Management)
    │   └── profile.tsx    (Settings)
    ├── wallet.tsx         (💰 NEW!)
    ├── kyc-verification.tsx
    ├── kyc-personal-info.tsx
    ├── kyc-documents.tsx
    └── kyc-status.tsx
```

## Testing Different Flows

### Test as Parent

```typescript
// In /app/index.tsx
<Redirect href="/(auth)/login" />
// Login with any credentials → Goes to /(main)/(tabs)
```

### Test as Nanny

```typescript
// In /app/index.tsx - Option 1: Change redirect
<Redirect href="/(auth)/role-selection-login" />
// Then select "I'm a Nanny"

// Option 2: Manually navigate
// After login, go to URL: /(auth)/role-selection-login
```

## Fixed Issues ✅

### 1. Profile Menu Items Now Clickable

**Nanny Profile** (`/(nanny)/(tabs)/profile.tsx`):

- ✅ All menu items now have click handlers
- ✅ "My Wallet" navigates to wallet screen
- ✅ Other items log navigation intent
- ✅ "Log out" returns to login screen

**Parent Profile** (`/(main)/(tabs)/profile.tsx`):

- ✅ All menu items now have click handlers
- ✅ Menu items navigate to respective routes
- ✅ "Log out" returns to login screen
- ✅ "Delete account" logs action (ready for modal implementation)

### 2. Wallet Screen Created

**Location**: `/app/(nanny)/wallet.tsx`
**Features**:

- Balance card with total, available, and pending amounts
- Transaction history with credit/debit indicators
- Status badges (completed/pending)
- Withdraw and Add Bank Account buttons
- Back button navigation

### 3. Map on Nanny Dashboard

**Already working** from previous update:

- Shows nanny location (pink marker with emoji)
- Displays nearby booking locations (red pins)
- Interactive map (pan, zoom, tap markers)

## Quick Start Commands

### To test as Parent:

1. Run: `npm start` or `npx expo start`
2. Login with any credentials
3. Explore home, orders, and profile

### To test as Nanny:

1. Run: `npm start`
2. Navigate to role selection login
3. Select "I'm a Nanny"
4. Login with any credentials
5. Explore dashboard (with map), bookings, and profile
6. Go to Profile → "My Wallet" to see wallet

### To switch default flow:

Edit `/app/index.tsx` and change the redirect:

```tsx
// For Parent flow (default)
<Redirect href="/(auth)/login" />

// For Nanny flow with role selection
<Redirect href="/(auth)/role-selection-login" />
```

## Navigation Tips

### Programmatic Navigation

```typescript
// Push (can go back)
router.push("/(nanny)/wallet");

// Replace (can't go back)
router.replace("/(main)/(tabs)");

// Go back
router.back();
```

### Current Navigation Paths

- Login → `/(auth)/login`
- Role Selection → `/(auth)/role-selection-login`
- Parent Home → `/(main)/(tabs)`
- Nanny Dashboard → `/(nanny)/(tabs)`
- Wallet → `/(nanny)/wallet`

## Future Enhancements

### Suggested Improvements:

1. **Add Profile Sub-screens**:

   - Personal Info edit screen
   - Saved Nannies list
   - Help & Support center
   - Terms and Privacy pages

2. **Persistent Auth State**:

   - Remember logged-in user
   - Store user role (parent/nanny)
   - Auto-redirect to correct flow

3. **Bank Account Management**:

   - Add/remove bank accounts
   - Default payment method
   - Verification flow

4. **Wallet Enhancements**:
   - Filter transactions by date
   - Export transaction history
   - Earnings analytics
   - Tax documents

## Troubleshooting

### Can't see map on nanny dashboard?

- Make sure `react-native-maps` is installed
- Check console for map errors
- Verify location coordinates are valid

### Menu items not clicking?

- ✅ Fixed in this update
- All menu items now have `onPress` handlers
- Check console logs to see navigation intent

### Can't access wallet?

- ✅ Wallet screen created at `/(nanny)/wallet.tsx`
- Accessible from Nanny Profile → "My Wallet"
- Only available in nanny flow

### Wrong flow after login?

- Check login screen's `onSubmit` redirect
- Standard login → `/(main)/(tabs)` (Parent)
- Role selection login → Depends on selected role
