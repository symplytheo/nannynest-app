import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type OrderItem = {
  count: number;
  label: string;
  time: string;
};

export default function BookingDetailsScreen() {
  const router = useRouter();

  const [promoCode, setPromoCode] = useState("");
  const [showPromoModal, setShowPromoModal] = useState(false);
  const [paymentReceived, setPaymentReceived] = useState(false);

  // Mock order data
  const orderDetails: OrderItem[] = [
    { count: 2, label: "Baby (below 3yrs)", time: "8AM-4PM" },
    { count: 1, label: "Kid (3-12yrs)", time: "8AM-4PM" },
  ];

  const subtotal = 50;
  const vat = 4.21;
  const serviceCharge = 6.25;
  const total = 60.46;

  const handleContinue = () => {
    // Simulate payment received
    // setPaymentReceived(true);
    setTimeout(() => {
      setPaymentReceived(false);
      router.push("/(main)/booking-checklist" as any);
    }, 2000);
  };

  const handlePromoSubmit = () => {
    // Handle promo code submission
    console.log("Promo code:", promoCode);
    setShowPromoModal(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="close" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Order Review</AppText>
        <View style={{ width: 40 }} />
      </View>

      {/* Payment Received Banner */}
      {paymentReceived && (
        <View style={styles.successBanner}>
          <View style={styles.successContent}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success600} />
            <View>
              <AppText style={styles.successTitle}>Payment Received</AppText>
              <AppText style={styles.successSubtitle}>Your payment is confirmed</AppText>
            </View>
          </View>
          <TouchableOpacity onPress={() => setPaymentReceived(false)}>
            <Ionicons name="close" size={20} color={colors.gray600} />
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Payment Method */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Payment method</AppText>
          <View style={styles.radioOption}>
            <View style={styles.radioSelected}>
              <View style={styles.radioDot} />
            </View>
            <AppText style={styles.radioLabel}>Debit card</AppText>
          </View>
        </View>

        {/* Service Address */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Service address</AppText>
          <TouchableOpacity
            style={styles.addressCard}
            onPress={() => router.push("/(main)/edit-service-location" as any)}
          >
            <Ionicons name="location" size={20} color={colors.primary600} />
            <AppText style={styles.addressText}>15b, Olajide George street</AppText>
            <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
          </TouchableOpacity>
        </View>

        {/* Order Details */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Order details</AppText>
          {orderDetails.map((item, index) => (
            <View key={index} style={styles.orderItem}>
              <AppText style={styles.orderItemText}>
                {item.count} {item.label}
              </AppText>
              <AppText style={styles.orderItemTime}>{item.time}</AppText>
            </View>
          ))}
        </View>

        {/* Order Summary */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Order summary</AppText>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Subtotal</AppText>
            <AppText style={styles.summaryValue}>${subtotal}</AppText>
          </View>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>VAT</AppText>
            <AppText style={styles.summaryValue}>${vat.toFixed(2)}</AppText>
          </View>

          <View style={styles.summaryRow}>
            <AppText style={styles.summaryLabel}>Service charge</AppText>
            <AppText style={styles.summaryValue}>${serviceCharge.toFixed(2)}</AppText>
          </View>
        </View>

        {/* Promo Code */}
        <View style={styles.section}>
          <View style={styles.promoRow}>
            <AppText style={styles.sectionTitle}>Promo code</AppText>
            <TouchableOpacity onPress={() => setShowPromoModal(true)}>
              <AppText style={styles.promoLink}>Enter a code</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <AppText style={styles.totalLabel}>Total</AppText>
          <AppText style={styles.totalValue}>${total.toFixed(2)}</AppText>
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <AppText style={styles.termsText}>
          By tapping the button, you agree to Nannynest Terms of Service and Payment Terms
        </AppText>
        <AppButton label="Continue" onPress={handleContinue} />
      </View>

      {/* Promo Code Modal */}
      <Modal
        visible={showPromoModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPromoModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppText style={styles.modalTitle}>Enter Promo code</AppText>

            <TextInput
              style={styles.promoInput}
              placeholder="Enter code"
              placeholderTextColor={colors.gray400}
              value={promoCode}
              onChangeText={setPromoCode}
              autoCapitalize="characters"
            />

            <AppButton label="Submit" onPress={handlePromoSubmit} />
          </View>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
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
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  successBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.success50,
    borderLeftWidth: 4,
    borderLeftColor: colors.success600,
  },
  successContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  successTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  successSubtitle: {
    fontSize: 12,
    color: colors.gray600,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 12,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioSelected: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.primary600,
    justifyContent: "center",
    alignItems: "center",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary600,
  },
  radioLabel: {
    fontSize: 16,
    color: colors.gray900,
  },
  addressCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
  },
  addressText: {
    flex: 1,
    fontSize: 16,
    color: colors.gray900,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  orderItemText: {
    fontSize: 16,
    color: colors.gray900,
  },
  orderItemTime: {
    fontSize: 16,
    color: colors.gray600,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.gray600,
  },
  summaryValue: {
    fontSize: 16,
    color: colors.gray900,
  },
  promoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoLink: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary600,
  },
  totalSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 16,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  bottomBar: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 24,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    gap: 16,
  },
  termsText: {
    fontSize: 12,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
    marginBottom: 24,
  },
  promoInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.gray900,
    marginBottom: 24,
  },
});
