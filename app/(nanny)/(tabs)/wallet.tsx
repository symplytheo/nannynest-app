import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import TransactionItem from "~/components/wallet/transaction-item";
import WalletBalanceCard from "~/components/wallet/wallet-balance-card";
import {
  MOCK_MONTHLY_EARNINGS,
  MOCK_TRANSACTIONS,
  MOCK_WALLET_BALANCE,
  type Transaction,
} from "~/constants/wallet";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function WalletPage() {
  const router = useRouter();

  const [balance] = useState(MOCK_WALLET_BALANCE);
  const [monthlyEarnings] = useState(MOCK_MONTHLY_EARNINGS);
  const [recentTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS.slice(0, 3));

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.title}>Wallet</AppText>
        </View>

        {/* Balance Card */}
        <WalletBalanceCard balance={balance} monthlyEarnings={monthlyEarnings} />

        {/* Action Cards */}
        <View style={styles.actionCards}>
          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/(nanny)/earnings" as any)}
            activeOpacity={0.7}
          >
            <View style={styles.actionCardLeft}>
              <MaterialCommunityIcons name="wallet-outline" size={24} color={colors.primary400} />
              <AppText style={styles.actionLabel}>View Earnings</AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.black} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionCard}
            onPress={() => router.push("/(nanny)/bank-accounts" as any)}
            activeOpacity={0.7}
          >
            <View style={styles.actionCardLeft}>
              <Ionicons name="business-outline" size={24} color={colors.primary400} />

              <AppText style={styles.actionLabel}>Bank Accounts</AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.black} />
          </TouchableOpacity>
        </View>

        {/* Transactions Section */}
        <View style={styles.transactionsSection}>
          <TouchableOpacity
            style={styles.transactionsHeader}
            onPress={() => router.push("/(nanny)/transactions" as any)}
            activeOpacity={0.7}
          >
            <AppText style={styles.transactionsTitle}>Transactions</AppText>
            <Ionicons name="chevron-forward" size={20} color={colors.black} />
          </TouchableOpacity>

          <View style={styles.transactionsList}>
            {recentTransactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                type={transaction.type}
                status={transaction.status}
                amount={transaction.amount}
                date={transaction.date}
                isWithdrawal={transaction.isWithdrawal}
                onPress={() =>
                  router.push(`/(nanny)/transaction-details?id=${transaction.id}` as any)
                }
              />
            ))}
          </View>
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
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  actionCards: {
    paddingHorizontal: 20,
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#10192812",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.65,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  actionLabel: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  transactionsSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  transactionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  transactionsTitle: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.gray700,
  },
  transactionsList: {
    gap: 24,
  },
});
