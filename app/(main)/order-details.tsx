import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import {
  MOCK_ORDER_DETAIL_CANCELLED,
  MOCK_ORDER_DETAIL_COMPLETED,
  type OrderDetail,
} from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Mock: Get order details based on ID
  // In real app, fetch from API
  const [orderDetail] = useState<OrderDetail>(
    id === "p2" ? MOCK_ORDER_DETAIL_CANCELLED : MOCK_ORDER_DETAIL_COMPLETED
  );

  const [rating, setRating] = useState(0);
  const [expandedChecklists, setExpandedChecklists] = useState<string[]>([]);

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const toggleChecklist = (checklistId: string) => {
    setExpandedChecklists((prev) =>
      prev.includes(checklistId) ? prev.filter((id) => id !== checklistId) : [...prev, checklistId]
    );
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
              {/* Nanny Info */}
              <View style={styles.nannySection}>
                <Image
                  source={{ uri: orderDetail.nanny.avatar }}
                  style={styles.avatar}
                  contentFit="cover"
                />
                <View style={styles.nannyInfo}>
                  <AppText style={styles.nannyName}>{orderDetail.nanny.name}</AppText>
                  <AppText style={styles.date}>{orderDetail.date}</AppText>
                </View>
              </View>

              {/* Time Spent */}
              <View style={styles.timeSection}>
                <AppText style={styles.timeLabel}>Time spent</AppText>
                <AppText style={styles.timeValue}>{orderDetail.timeSpent}</AppText>
              </View>

              {/* Feedback Section */}
              <View style={styles.feedbackSection}>
                <AppText style={styles.feedbackTitle}>How was your experience?</AppText>
                <AppText style={styles.feedbackSubtitle}>
                  Share your feedback and help us improve
                </AppText>
                <View style={styles.starsContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      activeOpacity={0.7}
                    >
                      <AntDesign
                        name="star"
                        size={32}
                        color={star <= rating ? "#FFB800" : colors.gray300}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <AppButton
                  label="Get help"
                  variant="outlined"
                  color="brand"
                  onPress={() => {}}
                  fullWidth
                  style={styles.actionButton}
                />
                <AppButton
                  label="Rebook"
                  variant="outlined"
                  color="brand"
                  onPress={() => {}}
                  fullWidth
                  style={styles.actionButton}
                />
              </View>
            </>
          ) : (
            <>
              {/* Cancelled Header */}
              <View style={styles.cancelledHeader}>
                <AppText style={styles.cancelledTitle}>Order cancelled</AppText>
                <AppText style={styles.date}>{orderDetail.date}</AppText>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <AppButton
                  label="Get help"
                  variant="outlined"
                  color="brand"
                  onPress={() => {}}
                  fullWidth
                  style={styles.actionButton}
                  size="small"
                />
                <AppButton
                  label="Rebook"
                  variant="outlined"
                  color="brand"
                  onPress={() => {}}
                  fullWidth
                  style={styles.actionButton}
                  size="small"
                />
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

          {/* Tasks Completed Section (for completed orders) */}
          {isCompleted && orderDetail.checklists.length > 0 && (
            <View style={styles.tasksSection}>
              <View style={styles.tasksSectionHeader}>
                <AppText style={styles.sectionTitle}>Tasks completed</AppText>
                <AppText style={styles.tasksCount}>
                  {orderDetail.completedTasks} of {orderDetail.totalTasks} done
                </AppText>
              </View>

              {orderDetail.checklists.map((checklist) => {
                const isExpanded = expandedChecklists.includes(checklist.id);
                const completedCount = checklist.tasks.filter((t) => t.completed).length;

                return (
                  <View key={checklist.id} style={styles.checklistItem}>
                    <TouchableOpacity
                      style={styles.checklistHeader}
                      onPress={() => toggleChecklist(checklist.id)}
                      activeOpacity={0.7}
                    >
                      <AppText style={styles.checklistTitle}>{checklist.title}</AppText>
                      <View style={styles.checklistRight}>
                        <View style={styles.countBadge}>
                          <AppText style={styles.countText}>{completedCount}</AppText>
                        </View>
                        <Ionicons
                          name={isExpanded ? "chevron-up" : "chevron-down"}
                          size={20}
                          color={colors.gray700}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
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
    alignItems: "center",
    backgroundColor: colors.gray100,
    borderRadius: 20,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  nannySection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  nannyInfo: {
    flex: 1,
  },
  nannyName: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    lineHeight: 18,
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
    marginBottom: 24,
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray700,
  },
  feedbackSection: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    alignItems: "center",
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
    lineHeight: 14,
  },
  feedbackSubtitle: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
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
  actionButtons: {
    gap: 16,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    borderColor: colors.gray200,
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
    fontWeight: fontWeights.semiBold,
    color: colors.gray700,
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
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  paymentMethodBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingTop: 12,
  },
  paymentMethodText: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    flex: 1,
  },
  paymentMethodAmount: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  refundSection: {
    marginBottom: 24,
  },
  tasksSection: {
    marginBottom: 24,
  },
  tasksSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  tasksCount: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.success400,
  },
  checklistItem: {
    marginBottom: 12,
  },
  checklistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderRadius: 12,
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
    flex: 1,
  },
  checklistRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countBadge: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
});
