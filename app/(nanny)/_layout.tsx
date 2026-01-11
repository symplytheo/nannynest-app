import { Stack } from "expo-router";

export default function NannyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="about" />
      <Stack.Screen name="bank-accounts" />
      <Stack.Screen name="earnings" />
      <Stack.Screen name="onboarding-checklist" />
      <Stack.Screen name="order-details" />
      <Stack.Screen name="review-ratings" />
      <Stack.Screen name="transaction-details" />
      <Stack.Screen name="transactions" />
      <Stack.Screen name="onboarding/complete-profile" />
      <Stack.Screen name="onboarding/face-verification" />
      <Stack.Screen name="onboarding/submission-status" />
      <Stack.Screen name="onboarding/upload-licenses" />
    </Stack>
  );
}
