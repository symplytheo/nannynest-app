# Redux Store Setup

This directory contains the Redux Toolkit and RTK Query setup for the NannyNest mobile app.

## Structure

```
store/
├── index.ts                 # Store configuration
├── hooks.ts                 # Typed Redux hooks
├── provider.tsx            # Redux Provider component
├── root.reducer.ts         # Root reducer combining all slices
├── error.middleware.ts     # Error handling middleware
├── api/
│   ├── api.ts             # Base RTK Query API setup
│   ├── types.ts           # Common API types
│   └── auth/
│       ├── auth.api.ts    # Auth endpoints
│       └── auth.types.ts  # Auth request/response types
└── slices/
    └── auth.slice.ts      # Auth state slice
```

## Usage

### 1. Wrap your app with StoreProvider

In your root `_layout.tsx`:

\`\`\`tsx
import { StoreProvider } from '@/store/provider';

export default function RootLayout() {
return (
<StoreProvider>
{/_ Your app components _/}
</StoreProvider>
);
}
\`\`\`

### 2. Use hooks in components

\`\`\`tsx
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useLoginMutation } from '@/store/api/auth/auth.api';
import { logout } from '@/store/slices/auth.slice';

function LoginScreen() {
const dispatch = useAppDispatch();
const { user, isAuthenticated } = useAppSelector((state) => state.auth);
const [login, { isLoading, error }] = useLoginMutation();

const handleLogin = async () => {
try {
await login({ email: 'user@example.com', password: 'password' }).unwrap();
// Success handled by slice
} catch (err) {
// Error handled by middleware
}
};

const handleLogout = () => {
dispatch(logout());
};

return (
// Your UI
);
}
\`\`\`

### 3. Available Auth Hooks

- `useLoginMutation()` - Login user
- `useRegisterMutation()` - Register new user
- `useVerifyEmailMutation()` - Verify email with code
- `useResendVerificationCodeMutation()` - Resend verification code
- `useResetPasswordMutation()` - Send password reset code
- `useVerifyResetCodeMutation()` - Verify reset code
- `useCreateNewPasswordMutation()` - Create new password after reset
- `useChangePasswordMutation()` - Change password (authenticated)
- `useGetCurrentUserQuery()` - Fetch current user data
- `useLogoutMutation()` - Logout user
- `useRefreshTokenMutation()` - Refresh authentication token

## Configuration

### API Base URL

Set your API base URL in `.env`:

\`\`\`
EXPO_PUBLIC_API_URL=https://your-api-url.com
\`\`\`

Or update the default in `store/api/api.ts`.

## Adding New Features

### 1. Create API endpoints

\`\`\`tsx
// store/api/orders/orders.api.ts
import { baseApi } from '../api';

export const ordersApi = baseApi.injectEndpoints({
endpoints: (builder) => ({
getOrders: builder.query({
query: () => '/orders',
providesTags: ['Order'],
}),
}),
});

export const { useGetOrdersQuery } = ordersApi;
\`\`\`

### 2. Create slice (if needed)

\`\`\`tsx
// store/slices/orders.slice.ts
import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
name: 'orders',
initialState: { selectedOrder: null },
reducers: {
selectOrder: (state, action) => {
state.selectedOrder = action.payload;
},
},
});

export const { selectOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
\`\`\`

### 3. Add to root reducer

\`\`\`tsx
// store/root.reducer.ts
import ordersReducer from './slices/orders.slice';

export const rootReducer = combineReducers({
[baseApi.reducerPath]: baseApi.reducer,
auth: authReducer,
orders: ordersReducer, // Add here
});
\`\`\`

## Features

- ✅ RTK Query for API calls with automatic caching
- ✅ Redux Persist for state persistence
- ✅ Automatic error handling with user-friendly alerts
- ✅ Token-based authentication
- ✅ TypeScript support with full type safety
- ✅ Automatic re-fetching on focus/reconnect
- ✅ Redux DevTools integration (development only)
