import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to splash screen on app load
    router.replace("/(auth)/splash" as any);
  }, [router]);

  return null;
}
