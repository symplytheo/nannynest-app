import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import { colors } from "~/theme";

export default function FaceVerificationScreen() {
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);

  const handleStartVerification = () => {
    // Implement face verification logic
    // This would typically open the camera or verification flow
    console.log("Start face verification");

    // Simulate verification for now
    setTimeout(() => {
      setIsVerified(true);
    }, 2000);
  };

  const handleContinue = () => {
    if (isVerified) {
      router.back();
    }
  };

  const handleSkip = () => {
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={authStyles.scrollView}
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <AuthHeader title="Face Verification" showBackButton />

        {/* Content */}
        <View style={authStyles.content}>
          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="scan-outline" size={64} color={colors.primary400} />
            </View>
          </View>

          {/* Title and Description */}
          <View style={styles.textSection}>
            <AppText style={styles.title}>Face Verification</AppText>
            <AppText style={styles.description}>
              Get ready for a portrait picture. Get a place with good lighting.
            </AppText>
          </View>

          {/* Verification Status */}
          {isVerified && (
            <View style={styles.successContainer}>
              <View style={styles.successIcon}>
                <Ionicons name="checkmark-circle" size={24} color={colors.success} />
              </View>
              <AppText style={styles.successText}>Face verification completed!</AppText>
            </View>
          )}

          {/* Bottom Buttons */}
          <View style={styles.bottomButtons}>
            {!isVerified ? (
              <>
                <AppButton
                  label="Start Verification"
                  variant="filled"
                  color="brand"
                  onPress={handleStartVerification}
                  fullWidth
                  size="small"
                />
                <AppButton
                  label="Skip for now"
                  variant="text"
                  color="brand"
                  onPress={handleSkip}
                  fullWidth
                  size="small"
                  style={styles.skipButton}
                />
              </>
            ) : (
              <AppButton
                label="Continue"
                variant="filled"
                color="brand"
                onPress={handleContinue}
                fullWidth
                size="small"
              />
            )}
          </View>

          {/* Info Cards */}
          <View style={styles.infoCards}>
            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="sunny-outline" size={20} color={colors.primary400} />
              </View>
              <AppText style={styles.infoText}>Good lighting is essential</AppText>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="glasses-outline" size={20} color={colors.primary400} />
              </View>
              <AppText style={styles.infoText}>Remove glasses if possible</AppText>
            </View>

            <View style={styles.infoCard}>
              <View style={styles.infoIconContainer}>
                <Ionicons name="camera-outline" size={20} color={colors.primary400} />
              </View>
              <AppText style={styles.infoText}>Face the camera directly</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  iconSection: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 32,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
  textSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 12,
    textAlign: "center",
  },
  description: {
    fontSize: 15,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: colors.success50 || "#E8F5E9",
    marginBottom: 24,
  },
  successIcon: {
    width: 24,
    height: 24,
  },
  successText: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.success,
  },
  bottomButtons: {
    gap: 16,
    marginTop: 16,
    marginBottom: 32,
  },
  skipButton: {
    marginTop: 0,
  },
  infoCards: {
    gap: 12,
    marginTop: 8,
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.gray50 || "#F9FAFB",
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: colors.gray700,
    fontWeight: "500",
  },
});
