import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { RoleSelectionCard } from "~/components/auth";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

const { width, height } = Dimensions.get("window");

export default function OnboardingScreen() {
  const router = useRouter();
  const [showRoleSelection, setShowRoleSelection] = useState(false);

  // Animation values
  const backgroundScale = useRef(new Animated.Value(1)).current;
  const bottomContentOpacity = useRef(new Animated.Value(1)).current;
  const bottomContentTranslateY = useRef(new Animated.Value(0)).current;
  const roleContentOpacity = useRef(new Animated.Value(0)).current;
  const roleContentTranslateY = useRef(new Animated.Value(50)).current;

  const handleGetStarted = () => {
    // Animate transition to role selection
    Animated.parallel([
      // Zoom in background
      Animated.timing(backgroundScale, {
        toValue: 1.2,
        duration: 400,
        useNativeDriver: true,
      }),
      // Slide down and fade out bottom content
      Animated.timing(bottomContentOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(bottomContentTranslateY, {
        toValue: 100,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRoleSelection(true);
      // Slide up and fade in role selection
      Animated.parallel([
        Animated.timing(roleContentOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(roleContentTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleClose = () => {
    // Reverse animation
    Animated.parallel([
      Animated.timing(roleContentOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(roleContentTranslateY, {
        toValue: 50,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowRoleSelection(false);
      // Reset to initial state
      Animated.parallel([
        Animated.timing(backgroundScale, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContentOpacity, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(bottomContentTranslateY, {
          toValue: 0,
          duration: 400,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  const handleLogin = () => {
    router.push("/(auth)/login" as any);
  };

  const handleClientRole = () => {
    router.push("/(auth)/client-register" as any);
  };

  const handleNannyRole = () => {
    console.log("Nanny role selected");
    // TODO: Navigate to nanny registration
  };

  return (
    <View style={styles.container}>
      {/* Background Image with Zoom Animation */}
      <Animated.View
        style={[
          styles.backgroundContainer,
          {
            transform: [{ scale: backgroundScale }],
          },
        ]}
      >
        <ImageBackground
          source={require("~/assets/images/auth/onboarding_bg.png")}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          {/* Gradient Overlay */}
          <LinearGradient
            colors={["#8F1C5B80", "#29081A"]}
            style={styles.gradient}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          />
        </ImageBackground>
      </Animated.View>

      {/* Content */}
      <View style={styles.content}>
        {/* Title  */}
        {!showRoleSelection && (
          <Animated.View
            style={[
              styles.titleContainer,
              {
                opacity: bottomContentOpacity,
                transform: [{ translateY: bottomContentTranslateY }],
              },
            ]}
          >
            <AppText style={styles.title}>Giving your kids and elderly the best attention.</AppText>
          </Animated.View>
        )}

        {/* Initial Buttons (State 1) */}
        {!showRoleSelection && (
          <Animated.View
            style={[
              styles.bottomContainer,
              {
                opacity: bottomContentOpacity,
                transform: [{ translateY: bottomContentTranslateY }],
              },
            ]}
          >
            <AppButton
              label="Get Started"
              variant="filled"
              color="brand"
              onPress={handleGetStarted}
              fullWidth
              style={styles.button}
              size="small"
            />
            <AppButton
              label="Log in"
              variant="outlined"
              color="brand"
              onPress={handleLogin}
              fullWidth
              style={{ ...styles.button, ...styles.loginButton }}
              size="small"
            />
          </Animated.View>
        )}

        {/* Role Selection (State 2) */}
        {showRoleSelection && (
          <Animated.View
            style={[
              styles.roleSelectionContainer,
              {
                opacity: roleContentOpacity,
                transform: [{ translateY: roleContentTranslateY }],
              },
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={handleClose} activeOpacity={0.7}>
              <View style={styles.closeButtonCircle}>
                <Ionicons name="close" size={24} color="black" />
              </View>
            </TouchableOpacity>

            {/* Role Cards */}
            <View style={styles.roleCards}>
              <RoleSelectionCard
                title="I want to hire (Client)"
                role="client"
                onPress={handleClientRole}
              />
              <RoleSelectionCard
                title="I want to work (Nanny)"
                role="nanny"
                onPress={handleNannyRole}
              />
            </View>
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary900,
  },
  backgroundContainer: {
    ...StyleSheet.absoluteFillObject,
    height: height * 0.75, // 75% of screen height
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingTop: height * 0.5,
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 34,
  },
  title: {
    fontSize: 50,
    fontWeight: fontWeights.bold,
    color: colors.white,
    lineHeight: 51,
    letterSpacing: -1,
  },
  bottomContainer: {
    gap: 16,
  },
  button: {
    marginBottom: 0,
    height: 48,
  },
  loginButton: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  roleSelectionContainer: {
    alignItems: "center",
  },
  closeButton: {
    marginBottom: 40,
  },
  closeButtonCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  roleCards: {
    width: "100%",
  },
});
