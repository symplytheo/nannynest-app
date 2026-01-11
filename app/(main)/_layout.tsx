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
      <Stack.Screen name="service-booking" />
      <Stack.Screen name="booking-details" />
      <Stack.Screen name="booking-checklist" />
      <Stack.Screen name="booking-connect-nanny" />
      <Stack.Screen name="booking-confirmation" />
      <Stack.Screen name="booking-success" />
      <Stack.Screen name="edit-service-location" />
    </Stack>
  );
}
