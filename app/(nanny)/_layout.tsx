import { Stack } from "expo-router";

export default function NannyLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="kyc-verification" />
      <Stack.Screen name="kyc-documents" />
      <Stack.Screen name="kyc-personal-info" />
      <Stack.Screen name="kyc-status" />
    </Stack>
  );
}
