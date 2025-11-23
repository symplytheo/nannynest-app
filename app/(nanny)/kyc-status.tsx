import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function KYCStatusScreen() {
  const router = useRouter();

  const handleGoToHome = () => {
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
            <AppText style={styles.iconText}>⏳</AppText>
          </View>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.title}>Under Review</AppText>
          <AppText style={styles.subtitle}>
            Thank you for submitting your verification documents. We&apos;re currently reviewing
            your information.
          </AppText>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "100%" }]} />
          </View>
          <AppText style={styles.progressText}>Step 3 of 3 - Complete</AppText>
        </View>

        {/* Status Card */}
        <View style={styles.statusCard}>
          <AppText style={styles.statusTitle}>What happens next?</AppText>

          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <AppText style={styles.statusIcon}>📋</AppText>
            </View>
            <View style={styles.statusContent}>
              <AppText style={styles.statusItemTitle}>Document Review</AppText>
              <AppText style={styles.statusItemDescription}>
                Our team is verifying your documents and information
              </AppText>
            </View>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <AppText style={styles.statusIcon}>🔍</AppText>
            </View>
            <View style={styles.statusContent}>
              <AppText style={styles.statusItemTitle}>Background Check</AppText>
              <AppText style={styles.statusItemDescription}>
                We&apos;re conducting a thorough background verification
              </AppText>
            </View>
          </View>

          <View style={styles.statusItem}>
            <View style={styles.statusIconContainer}>
              <AppText style={styles.statusIcon}>✉️</AppText>
            </View>
            <View style={styles.statusContent}>
              <AppText style={styles.statusItemTitle}>Notification</AppText>
              <AppText style={styles.statusItemDescription}>
                You&apos;ll receive an email once verification is complete
              </AppText>
            </View>
          </View>
        </View>

        {/* Timeline Card */}
        <View style={styles.timelineCard}>
          <AppText style={styles.timelineTitle}>Expected Timeline</AppText>
          <AppText style={styles.timelineText}>
            Verification typically takes 24-48 hours. We&apos;ll notify you as soon as your account
            is approved.
          </AppText>
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <AppText style={styles.infoTitle}>Need Help?</AppText>
          <AppText style={styles.infoText}>
            If you have any questions about your verification status, please contact our support
            team at support@nannynest.com
          </AppText>
        </View>
      </ScrollView>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          label="Go to Dashboard"
          variant="filled"
          color="brand"
          onPress={handleGoToHome}
          fullWidth
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
  progressContainer: {
    marginBottom: 32,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.success,
    textAlign: "center",
  },
  statusCard: {
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 20,
  },
  statusItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  statusIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statusIcon: {
    fontSize: 24,
  },
  statusContent: {
    flex: 1,
  },
  statusItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  statusItemDescription: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },
  timelineCard: {
    padding: 20,
    backgroundColor: colors.primary100,
    borderRadius: 16,
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
    marginBottom: 8,
  },
  timelineText: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 20,
  },
  infoCard: {
    padding: 20,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
});
