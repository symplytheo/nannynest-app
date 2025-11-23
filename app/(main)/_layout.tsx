import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="nanny-profile" />
      <Stack.Screen name="booking-details" />
      <Stack.Screen name="booking-confirmation" />
      <Stack.Screen name="booking-success" />
    </Stack>
  );
}
