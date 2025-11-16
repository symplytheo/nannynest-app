import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to onboarding after 3 seconds
    const timeout = setTimeout(() => {
      router.replace("/(auth)/onboarding" as any);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* Logo or App Icon */}
      <View style={styles.logoContainer}>
        <Image
          source={require("~/assets/images/icon.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* App Name */}
      <AppText style={styles.appName}>NannyNest</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logo: {
    width: 80,
    height: 80,
  },
  appName: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.white,
    letterSpacing: 0.5,
  },
});
