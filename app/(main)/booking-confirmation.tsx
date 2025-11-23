import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function BookingConfirmationScreen() {
  const router = useRouter();
  const { nannyId } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  // Mock data
  const bookingDetails = {
    nanny: "Sarah Johnson",
    date: "Nov 25, 2025",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    numberOfChildren: 1,
    amount: 110,
  };

  const handleConfirmBooking = async () => {
    setLoading(true);
    try {
      // TODO: API call to confirm booking
      await new Promise((resolve) => setTimeout(resolve, 2000));

      router.replace("/(main)/booking-success" as any);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Confirm Booking</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Booking Summary Card */}
        <View style={styles.summaryCard}>
          <AppText style={styles.summaryTitle}>Booking Summary</AppText>

          <View style={styles.nannySection}>
            <View style={styles.avatarPlaceholder}>
              <AppText style={styles.avatarText}>SJ</AppText>
            </View>
            <AppText style={styles.nannyName}>{bookingDetails.nanny}</AppText>
          </View>

          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="calendar-outline" size={18} color={colors.gray600} />
                <AppText style={styles.detailLabel}>Date:</AppText>
              </View>
              <AppText style={styles.detailValue}>{bookingDetails.date}</AppText>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="time-outline" size={18} color={colors.gray600} />
                <AppText style={styles.detailLabel}>Time:</AppText>
              </View>
              <AppText style={styles.detailValue}>{bookingDetails.time}</AppText>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="hourglass-outline" size={18} color={colors.gray600} />
                <AppText style={styles.detailLabel}>Duration:</AppText>
              </View>
              <AppText style={styles.detailValue}>{bookingDetails.duration}</AppText>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailLabelContainer}>
                <Ionicons name="people-outline" size={18} color={colors.gray600} />
                <AppText style={styles.detailLabel}>Children:</AppText>
              </View>
              <AppText style={styles.detailValue}>{bookingDetails.numberOfChildren}</AppText>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.totalSection}>
            <AppText style={styles.totalLabel}>Total Amount</AppText>
            <AppText style={styles.totalAmount}>${bookingDetails.amount}</AppText>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentCard}>
          <AppText style={styles.paymentTitle}>Payment Method</AppText>
          <TouchableOpacity style={styles.paymentOption}>
            <View style={styles.paymentLeft}>
              <View style={styles.paymentIconContainer}>
                <Ionicons name="card-outline" size={24} color={colors.primary400} />
              </View>
              <View>
                <AppText style={styles.paymentLabel}>Credit Card</AppText>
                <AppText style={styles.paymentSubtext}>**** **** **** 4532</AppText>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <AppText style={styles.notesTitle}>Important Notes</AppText>
          <AppText style={styles.notesText}>
            • You can cancel or reschedule up to 24 hours before the booking{"\n"}• Payment will be
            charged after the service is completed{"\n"}• You&apos;ll receive a confirmation email
            shortly
          </AppText>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <AppButton
          label="Confirm & Pay"
          variant="filled"
          color="brand"
          onPress={handleConfirmBooking}
          loading={loading}
          disabled={loading}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  scrollView: {
    flex: 1,
  },
  summaryCard: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 20,
  },
  nannySection: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary600,
  },
  nannyName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray900,
  },
  detailsSection: {
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
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
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 20,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary600,
  },
  paymentCard: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 16,
  },
  paymentOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.gray50,
    borderRadius: 12,
  },
  paymentLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  paymentIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 2,
  },
  paymentSubtext: {
    fontSize: 14,
    color: colors.gray600,
  },
  notesCard: {
    marginHorizontal: 24,
    marginTop: 16,
    padding: 20,
    backgroundColor: colors.primary100,
    borderRadius: 16,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
    marginBottom: 12,
  },
  notesText: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.gray700,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
