import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import type { PastOrder } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type OrderCardProps = {
  order: PastOrder;
  onPress: () => void;
};

export default function OrderCard({ order, onPress }: OrderCardProps) {
  const statusConfig = {
    completed: {
      label: "Completed",
      backgroundColor: colors.success50,
      textColor: colors.success400,
    },
    cancelled: {
      label: "Cancelled",
      backgroundColor: colors.gray100,
      textColor: colors.gray700,
    },
  };

  const config = statusConfig[order.status];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <AppText style={styles.date}>
            {order.date}, {order.startTime} - {order.endTime}
          </AppText>
          <View style={[styles.statusBadge, { backgroundColor: config.backgroundColor }]}>
            <AppText style={[styles.statusText, { color: config.textColor }]}>
              {config.label}
            </AppText>
          </View>
        </View>
        <AppText style={styles.address}>{order.address}</AppText>
        <AppText style={styles.orderNumber}># {order.orderNumber}</AppText>
      </View>
      <TouchableOpacity style={styles.iconButton} onPress={onPress} activeOpacity={0.7}>
        <Ionicons name="refresh" size={20} color={colors.gray900} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  content: {
    flex: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 8,
  },
  date: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 100,
  },
  statusText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    lineHeight: 12,
  },
  address: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    marginBottom: 4,
    lineHeight: 18,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    lineHeight: 18,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
});
