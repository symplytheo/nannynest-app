import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="nanny-profile" />
      <Stack.Screen name="service-booking" />
      <Stack.Screen name="booking-details" />
      <Stack.Screen name="booking-checklist" />
      <Stack.Screen name="booking-connect-nanny" />
      <Stack.Screen name="booking-success" />
      <Stack.Screen name="edit-service-location" />
      <Stack.Screen name="order-details" />
      <Stack.Screen name="add-order-checklist" />
      <Stack.Screen name="personal-info" />
      <Stack.Screen name="update-name" />
      <Stack.Screen name="update-phone" />
      <Stack.Screen name="change-password" />
      <Stack.Screen name="change-password-new" />
      <Stack.Screen name="delete-account" />
      <Stack.Screen name="saved-nannies" />
      <Stack.Screen name="create-task" />
      <Stack.Screen name="edit-task" />
      <Stack.Screen name="task-details" />
      <Stack.Screen name="saved-tasks" />
    </Stack>
  );
}
