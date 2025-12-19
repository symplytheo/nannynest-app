import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import {
  MOCK_ORDER_DETAIL_CANCELLED,
  MOCK_ORDER_DETAIL_COMPLETED,
  type OrderDetail,
} from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function NannyOrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock: Get order details based on ID
  // In real app, fetch from API
  const [orderDetail] = useState<OrderDetail>(
    id === "p2" ? MOCK_ORDER_DETAIL_CANCELLED : MOCK_ORDER_DETAIL_COMPLETED
  );

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const isCompleted = orderDetail.status === "completed";

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color={colors.gray900} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {isCompleted ? (
            <>
              {/* Client Info (for nanny) */}
              <View style={styles.clientSection}>
                <AppText style={styles.clientLabel}>Client</AppText>
                <AppText style={styles.clientName}>Jennifer Smith</AppText>
                <AppText style={styles.date}>{orderDetail.date}</AppText>
              </View>

              {/* Time Spent */}
              <View style={styles.timeSection}>
                <AppText style={styles.timeLabel}>Time spent</AppText>
                <AppText style={styles.timeValue}>{orderDetail.timeSpent}</AppText>
              </View>
            </>
          ) : (
            <>
              {/* Cancelled Header */}
              <View style={styles.cancelledHeader}>
                <AppText style={styles.cancelledTitle}>Order cancelled</AppText>
                <AppText style={styles.date}>{orderDetail.date}</AppText>
              </View>
            </>
          )}

          {/* Payment Section */}
          <View style={styles.paymentSection}>
            <AppText style={styles.sectionTitle}>Payment</AppText>

            <View style={styles.paymentRow}>
              <AppText style={styles.paymentLabel}>Subtotal</AppText>
              <AppText style={styles.paymentValue}>{formatCurrency(orderDetail.subtotal)}</AppText>
            </View>

            <View style={styles.paymentRow}>
              <AppText style={styles.paymentLabel}>VAT</AppText>
              <AppText style={styles.paymentValue}>{formatCurrency(orderDetail.vat)}</AppText>
            </View>

            <View style={styles.paymentRow}>
              <AppText style={styles.paymentLabel}>Service charge</AppText>
              <AppText style={styles.paymentValue}>
                {formatCurrency(orderDetail.serviceCharge)}
              </AppText>
            </View>

            <View style={styles.paymentRow}>
              <AppText style={styles.paymentLabel}>Discount</AppText>
              <AppText style={styles.paymentValue}>{formatCurrency(orderDetail.discount)}</AppText>
            </View>

            <View style={[styles.paymentRow, styles.totalRow]}>
              <AppText style={styles.totalLabel}>Total</AppText>
              <AppText style={styles.totalValue}>{formatCurrency(orderDetail.total)}</AppText>
            </View>

            <View style={styles.paymentMethodBadge}>
              <Ionicons name="card-outline" size={16} color={colors.primary400} />
              <AppText style={styles.paymentMethodText}>{orderDetail.paymentMethod}</AppText>
              <AppText style={styles.paymentMethodAmount}>
                {formatCurrency(orderDetail.total)}
              </AppText>
            </View>
          </View>

          {/* Refund Section (for cancelled orders) */}
          {!isCompleted && orderDetail.cancellationFee && orderDetail.refundAmount && (
            <View style={styles.refundSection}>
              <AppText style={styles.sectionTitle}>Refund</AppText>

              <View style={styles.paymentRow}>
                <AppText style={styles.paymentLabel}>Cancellation fee</AppText>
                <AppText style={styles.paymentValue}>
                  {formatCurrency(orderDetail.cancellationFee)}
                </AppText>
              </View>

              <View style={[styles.paymentRow, styles.totalRow]}>
                <AppText style={styles.totalLabel}>Total refund</AppText>
                <AppText style={styles.totalValue}>
                  {formatCurrency(orderDetail.refundAmount)}
                </AppText>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  clientSection: {
    marginBottom: 20,
  },
  clientLabel: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray500,
    marginBottom: 8,
  },
  clientName: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
  timeSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: 24,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
  timeValue: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  cancelledHeader: {
    marginBottom: 24,
  },
  cancelledTitle: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
    marginBottom: 8,
  },
  paymentSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 16,
  },
  paymentRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
  paymentValue: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  totalRow: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    marginTop: 4,
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  paymentMethodBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: colors.gray50,
    borderRadius: 8,
  },
  paymentMethodText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
    flex: 1,
  },
  paymentMethodAmount: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  refundSection: {
    marginBottom: 24,
  },
});
