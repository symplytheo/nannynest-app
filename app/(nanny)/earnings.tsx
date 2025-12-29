import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import { MOCK_EARNINGS, type Earning } from "~/constants/wallet";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function EarningsScreen() {
  const [earnings] = useState<Earning[]>(MOCK_EARNINGS);

  const formatCurrency = (amount: number) => {
    return `₦ ${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Earnings" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {earnings.map((earning) => (
            <View key={earning.id} style={styles.earningItem}>
              <View style={styles.earningLeft}>
                <AppText style={styles.earningType}>{earning.type}</AppText>
                <AppText style={styles.earningStatus}>{earning.status}</AppText>
              </View>
              <View style={styles.earningRight}>
                <AppText style={styles.earningAmount}>{formatCurrency(earning.amount)}</AppText>
                <AppText style={styles.earningStatus}>{earning.date}</AppText>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  earningItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  earningLeft: {
    flex: 1,
  },
  earningType: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.black,
    marginBottom: 4,
    lineHeight: 18,
  },
  earningStatus: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    lineHeight: 16,
  },
  earningRight: {
    alignItems: "flex-end",
  },
  earningAmount: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.success400,
    marginBottom: 4,
    lineHeight: 18,
  },
});
