# Redux Store Usage Examples

This file contains practical examples of how to use the Redux store in your NannyNest mobile app.

## 1. Integrate Redux into your app

Update your root `app/_layout.tsx` file:

```tsx
import { StoreProvider } from "@/store/provider";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <StoreProvider>
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(nanny)" options={{ headerShown: false }} />
      </Stack>
    </StoreProvider>
  );
}
```

## 2. Login Example

Use in your `app/(auth)/login.tsx`:

```tsx
import { View, TextInput, Button, Text } from 'react-native';
import { useAppSelector } from '@/store/hooks';
import { useLoginMutation } from '@/store/api/auth/auth.api';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    try {
      const result = await login({ email, password }).unwrap();
      // Success! The auth state is automatically updated
      console.log('Logged in:', result.user);

      // Navigate based on user role
      if (result.user.role === 'nanny') {
        router.replace('/(nanny)/(tabs)');
      } else {
        router.replace('/(main)/(tabs)');
      }
    } catch (error) {
      // Error is automatically handled by error middleware
      // It will show an Alert to the user
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      {isAuthenticated && <Text>Welcome, {user?.firstName}!</Text>}
    </View>
  );
```

## 3. Access Auth State

Access auth state anywhere in your app:

```tsx
import { logout } from '@/store/slices/auth.slice';

function ProfileScreen() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/(auth)/login');
  };

  return (
    <View>
      <Text>Name: {user?.firstName} {user?.lastName}</Text>
      <Text>Email: {user?.email}</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
```

## 4. Registration and Other Mutations

Use other auth mutations:

```tsx
  useRegisterMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
} from '@/store/api/auth/auth.api';

function RegisterScreen() {
  const [register, { isLoading }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      await register({
        email: 'user@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        role: 'client',
      }).unwrap();
      // Navigate to verify email screen
    } catch (error) {
      // Error handled automatically
    }
  };

  return (
    // Your UI here
  );
}
```

## Key Features

- ✅ **Automatic state updates**: Auth state is automatically updated on successful login/register
- ✅ **Error handling**: Errors are automatically caught and displayed to users
- ✅ **Type safety**: Full TypeScript support with proper typing
- ✅ **Persistence**: Auth state persists across app restarts
- ✅ **Loading states**: Easy access to loading states for better UX

## Available Hooks

All auth-related hooks from `@/store/api/auth/auth.api`:

- `useLoginMutation()`
- `useRegisterMutation()`
- `useVerifyEmailMutation()`
- `useResendVerificationCodeMutation()`
- `useResetPasswordMutation()`
- `useVerifyResetCodeMutation()`
- `useCreateNewPasswordMutation()`
- `useChangePasswordMutation()`
- `useGetCurrentUserQuery()`
- `useLogoutMutation()`
- `useRefreshTokenMutation()`
