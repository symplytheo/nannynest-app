import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function BookingSuccessScreen() {
  const router = useRouter();

  const handleGoHome = () => {
    router.replace("/(main)/(tabs)" as any);
  };

  const handleViewBooking = () => {
    router.replace("/(main)/(tabs)/orders" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <View style={styles.content}>
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.successCircle}>
            <AppText style={styles.checkmark}>✓</AppText>
          </View>
        </View>

        {/* Success Message */}
        <AppText style={styles.title}>Booking Confirmed!</AppText>
        <AppText style={styles.subtitle}>
          Your booking has been successfully confirmed. The nanny will contact you shortly.
        </AppText>

        {/* Booking Details Card */}
        <View style={styles.detailsCard}>
          <AppText style={styles.detailsTitle}>Booking Details</AppText>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Booking ID:</AppText>
            <AppText style={styles.detailValue}>#NN-2025-001</AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Nanny:</AppText>
            <AppText style={styles.detailValue}>Sarah Johnson</AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Date & Time:</AppText>
            <AppText style={styles.detailValue}>Nov 25, 10:00 AM</AppText>
          </View>

          <View style={styles.detailRow}>
            <AppText style={styles.detailLabel}>Amount Paid:</AppText>
            <AppText style={[styles.detailValue, styles.amountValue]}>$110</AppText>
          </View>
        </View>

        {/* Message */}
        <View style={styles.messageCard}>
          <AppText style={styles.messageText}>
            📧 A confirmation email has been sent to your registered email address.
          </AppText>
        </View>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <AppButton
          label="View Booking"
          variant="outlined"
          color="brand"
          onPress={handleViewBooking}
          fullWidth
          style={styles.button}
        />
        <AppButton
          label="Go to Home"
          variant="filled"
          color="brand"
          onPress={handleGoHome}
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 32,
  },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    fontSize: 60,
    fontWeight: "700",
    color: colors.white,
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
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  detailsCard: {
    width: "100%",
    padding: 20,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    marginBottom: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 16,
    color: colors.gray600,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
  },
  amountValue: {
    color: colors.primary600,
    fontSize: 18,
  },
  messageCard: {
    width: "100%",
    padding: 16,
    backgroundColor: colors.primary100,
    borderRadius: 12,
  },
  messageText: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 20,
    textAlign: "center",
  },
  actions: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    marginBottom: 0,
  },
});
