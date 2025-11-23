import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function KYCVerificationScreen() {
  const router = useRouter();

  const handleStartVerification = () => {
    router.push("/(nanny)/kyc-personal-info" as any);
  };

  const handleSkipForNow = () => {
    router.replace("/(nanny)/(tabs)" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconCircle}>
            <AppText style={styles.iconText}>🔐</AppText>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.title}>Complete Your KYC</AppText>
          <AppText style={styles.subtitle}>
            To start offering your services, we need to verify your identity and credentials
          </AppText>
        </View>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <AppText style={styles.stepNumberText}>1</AppText>
            </View>
            <View style={styles.stepContent}>
              <AppText style={styles.stepTitle}>Personal Information</AppText>
              <AppText style={styles.stepDescription}>
                Provide your basic details and contact information
              </AppText>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <AppText style={styles.stepNumberText}>2</AppText>
            </View>
            <View style={styles.stepContent}>
              <AppText style={styles.stepTitle}>Document Upload</AppText>
              <AppText style={styles.stepDescription}>
                Upload your ID, certifications, and background check
              </AppText>
            </View>
          </View>

          <View style={styles.stepItem}>
            <View style={styles.stepNumber}>
              <AppText style={styles.stepNumberText}>3</AppText>
            </View>
            <View style={styles.stepContent}>
              <AppText style={styles.stepTitle}>Verification</AppText>
              <AppText style={styles.stepDescription}>
                We&apos;ll review your information (usually takes 24-48 hours)
              </AppText>
            </View>
          </View>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <AppText style={styles.infoTitle}>Why do we need this?</AppText>
          <AppText style={styles.infoText}>
            We verify all nannies to ensure the safety and trust of families using our platform.
            Your information is securely stored and only used for verification purposes.
          </AppText>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          label="Start Verification"
          variant="filled"
          color="brand"
          onPress={handleStartVerification}
          fullWidth
          style={styles.button}
        />
        <AppButton
          label="Skip for Now"
          variant="text"
          color="brand"
          onPress={handleSkipForNow}
          fullWidth
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 48,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
    lineHeight: 24,
    textAlign: "center",
  },
  stepsContainer: {
    marginBottom: 32,
  },
  stepItem: {
    flexDirection: "row",
    marginBottom: 24,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },
  infoCard: {
    padding: 20,
    backgroundColor: colors.primary100,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 20,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 8,
  },
  button: {
    marginBottom: 0,
  },
});
