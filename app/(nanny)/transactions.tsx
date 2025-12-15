import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import TransactionItem from "~/components/wallet/transaction-item";
import { MOCK_TRANSACTIONS, type Transaction } from "~/constants/wallet";
import colors from "~/theme/colors";

export default function TransactionsScreen() {
  const router = useRouter();

  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Transactions" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {transactions.map((transaction) => (
            <View key={transaction.id}>
              <TransactionItem
                type={transaction.type}
                status={transaction.status}
                amount={transaction.amount}
                date={transaction.date}
                isWithdrawal={transaction.isWithdrawal}
                onPress={() =>
                  router.push(`/(nanny)/transaction-details?id=${transaction.id}` as any)
                }
              />

              {/* divider */}
              <View style={styles.divider} />
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 18,
  },
});
