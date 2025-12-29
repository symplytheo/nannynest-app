import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type TransactionItemProps = {
  type: string;
  status: string;
  amount: number;
  date: string;
  isWithdrawal?: boolean;
  onPress?: () => void;
};

export default function TransactionItem({
  type,
  status,
  amount,
  date,
  isWithdrawal = true,
  onPress,
}: TransactionItemProps) {
  const formatCurrency = (value: number) => {
    return `₦ ${value.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const iconName = isWithdrawal ? "arrow-top-right" : "arrow-bottom-left";
  const iconBgColor = isWithdrawal ? "#FBEAE9" : "#E3EFFC";
  const iconColor = isWithdrawal ? colors.error400 : colors.secondary400;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
      disabled={!onPress}
    >
      <View style={styles.left}>
        <View style={[styles.iconContainer, { backgroundColor: iconBgColor }]}>
          <MaterialCommunityIcons name={iconName} size={24} color={iconColor} />
        </View>
        <View style={styles.info}>
          <AppText style={styles.type}>{type}</AppText>
          <AppText style={styles.status}>{status}</AppText>
        </View>
      </View>

      <View style={styles.right}>
        <AppText style={styles.type}>{formatCurrency(amount)}</AppText>
        <AppText style={styles.status}>{date}</AppText>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 16,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
  },
  type: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.black,
    marginBottom: 4,
    lineHeight: 18,
  },
  status: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    lineHeight: 16,
  },
  right: {
    alignItems: "flex-end",
  },
});
