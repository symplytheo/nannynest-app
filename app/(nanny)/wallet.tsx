import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  description: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "credit",
    description: "Booking Payment - Jennifer M.",
    amount: 100,
    date: "Nov 20, 2025",
    status: "completed",
  },
  {
    id: "2",
    type: "credit",
    description: "Booking Payment - Michael P.",
    amount: 112,
    date: "Nov 18, 2025",
    status: "completed",
  },
  {
    id: "3",
    type: "debit",
    description: "Service Fee",
    amount: -15,
    date: "Nov 18, 2025",
    status: "completed",
  },
  {
    id: "4",
    type: "credit",
    description: "Booking Payment - Sarah K.",
    amount: 150,
    date: "Nov 15, 2025",
    status: "completed",
  },
  {
    id: "5",
    type: "credit",
    description: "Booking Payment - David L.",
    amount: 125,
    date: "Nov 12, 2025",
    status: "pending",
  },
];

export default function WalletScreen() {
  const router = useRouter();

  const totalBalance = 3450;
  const pendingBalance = 125;
  const availableBalance = totalBalance - pendingBalance;

  const handleWithdraw = () => {
    console.log("Withdraw funds");
    // TODO: Implement withdrawal flow
  };

  const handleAddBankAccount = () => {
    console.log("Add bank account");
    // TODO: Navigate to add bank account screen
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButtonContainer}
          >
            <Ionicons name="chevron-back" size={28} color={colors.gray900} />
            <AppText style={styles.backButton}>Back</AppText>
          </TouchableOpacity>
          <AppText style={styles.title}>Wallet</AppText>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <AppText style={styles.balanceLabel}>Total Balance</AppText>
          <AppText style={styles.balanceAmount}>${totalBalance.toFixed(2)}</AppText>

          <View style={styles.balanceDetails}>
            <View style={styles.balanceDetailItem}>
              <AppText style={styles.balanceDetailLabel}>Available</AppText>
              <AppText style={styles.balanceDetailValue}>${availableBalance.toFixed(2)}</AppText>
            </View>
            <View style={styles.balanceDivider} />
            <View style={styles.balanceDetailItem}>
              <AppText style={styles.balanceDetailLabel}>Pending</AppText>
              <AppText style={styles.balanceDetailValue}>${pendingBalance.toFixed(2)}</AppText>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <AppButton
            label="Withdraw"
            variant="filled"
            color="brand"
            onPress={handleWithdraw}
            style={styles.actionButton}
          />
          <AppButton
            label="Add Bank Account"
            variant="outlined"
            color="brand"
            onPress={handleAddBankAccount}
            style={styles.actionButton}
          />
        </View>

        {/* Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Transaction History</AppText>
          </View>

          {TRANSACTIONS.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionLeft}>
                <View
                  style={[
                    styles.transactionIcon,
                    transaction.type === "credit"
                      ? styles.transactionIconCredit
                      : styles.transactionIconDebit,
                  ]}
                >
                  <AppText style={styles.transactionIconText}>
                    {transaction.type === "credit" ? "↓" : "↑"}
                  </AppText>
                </View>
                <View style={styles.transactionInfo}>
                  <AppText style={styles.transactionDescription}>{transaction.description}</AppText>
                  <AppText style={styles.transactionDate}>{transaction.date}</AppText>
                </View>
              </View>

              <View style={styles.transactionRight}>
                <AppText
                  style={[
                    styles.transactionAmount,
                    transaction.type === "credit"
                      ? styles.transactionAmountCredit
                      : styles.transactionAmountDebit,
                  ]}
                >
                  {transaction.type === "credit" ? "+" : ""}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </AppText>
                <View
                  style={[
                    styles.statusBadge,
                    transaction.status === "pending"
                      ? styles.statusBadgePending
                      : styles.statusBadgeCompleted,
                  ]}
                >
                  <AppText
                    style={[
                      styles.statusText,
                      transaction.status === "pending"
                        ? styles.statusTextPending
                        : styles.statusTextCompleted,
                    ]}
                  >
                    {transaction.status}
                  </AppText>
                </View>
              </View>
            </View>
          ))}
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
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  backButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  backButton: {
    fontSize: 16,
    color: colors.gray900,
    fontWeight: "500",
    marginLeft: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
  },
  balanceCard: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 24,
    backgroundColor: colors.primary500,
    borderRadius: 20,
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 24,
  },
  balanceDetails: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  balanceDetailItem: {
    flex: 1,
    alignItems: "center",
  },
  balanceDetailLabel: {
    fontSize: 12,
    color: colors.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  balanceDetailValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  balanceDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.white,
    opacity: 0.3,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
  },
  transactionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray900,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  transactionIconCredit: {
    backgroundColor: colors.success + "20",
  },
  transactionIconDebit: {
    backgroundColor: colors.error + "20",
  },
  transactionIconText: {
    fontSize: 20,
    fontWeight: "700",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDescription: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: colors.gray600,
  },
  transactionRight: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  transactionAmountCredit: {
    color: colors.success,
  },
  transactionAmountDebit: {
    color: colors.error,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusBadgePending: {
    backgroundColor: colors.gray200,
  },
  statusBadgeCompleted: {
    backgroundColor: colors.success + "20",
  },
  statusText: {
    fontSize: 10,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  statusTextPending: {
    color: colors.gray700,
  },
  statusTextCompleted: {
    color: colors.success,
  },
});
