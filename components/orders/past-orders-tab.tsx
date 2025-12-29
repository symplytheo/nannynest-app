import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import OrderCard from "~/components/orders/order-card";
import { MOCK_PAST_ORDERS, type PastOrder } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type PastOrdersTabProps = {
  context: "client" | "nanny";
};

export default function PastOrdersTab({ context }: PastOrdersTabProps) {
  const router = useRouter();
  const pastOrders = MOCK_PAST_ORDERS;

  // Group past orders by month
  const groupedPastOrders = pastOrders.reduce((acc, order) => {
    const key = `${order.month} ${order.year}`;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(order);
    return acc;
  }, {} as Record<string, PastOrder[]>);

  if (Object.keys(groupedPastOrders).length === 0) {
    return (
      <View style={styles.emptyState}>
        <AppText style={styles.emptyTitle}>No past orders</AppText>
        <AppText style={styles.emptyDescription}>
          Your completed and cancelled orders will appear here.
        </AppText>
      </View>
    );
  }

  const getDetailsRoute = (orderId: string) => {
    return context === "nanny"
      ? `/(main)/order-details?id=${orderId}`
      : `/(main)/order-details?id=${orderId}`;
  };

  return (
    <View>
      {Object.entries(groupedPastOrders).map(([monthYear, orders]) => (
        <View key={monthYear} style={styles.monthGroup}>
          <AppText style={styles.monthHeader}>{monthYear}</AppText>
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onPress={() => router.push(getDetailsRoute(order.id) as any)}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
    marginBottom: 12,
  },
  emptyDescription: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    textAlign: "center",
    lineHeight: 20,
  },
  monthGroup: {
    marginBottom: 24,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    marginBottom: 4,
  },
});
