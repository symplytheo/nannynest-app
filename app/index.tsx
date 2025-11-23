import { Redirect } from "expo-router";

export default function Index() {
  // For testing, redirect directly to login
  // In production, check auth state and redirect accordingly
  return <Redirect href="/(auth)/role-selection-login" />;
}
