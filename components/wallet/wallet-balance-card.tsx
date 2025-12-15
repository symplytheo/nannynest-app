import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type WalletBalanceCardProps = {
  balance: number;
  monthlyEarnings: number;
};

export default function WalletBalanceCard({ balance, monthlyEarnings }: WalletBalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return `₦ ${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>Balance</AppText>
      <AppText style={styles.balance}>{formatCurrency(balance)}</AppText>

      <View style={styles.badge}>
        <AppText style={styles.badgeText}>
          {formatCurrency(monthlyEarnings)} earned this month
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary400,
    borderRadius: 16,
    height: 289,
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 24,
    overflow: "hidden",
  },
  label: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.primary100,
    marginBottom: 8,
  },
  balance: {
    fontSize: 24,
    fontWeight: fontWeights.bold,
    color: colors.white,
    marginBottom: 20,
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#00000059",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 99,
    marginTop: "auto",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.success75,
  },
});
