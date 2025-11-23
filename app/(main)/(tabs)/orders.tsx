import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

type OrderStatus = "ongoing" | "completed" | "cancelled";

type Order = {
  id: string;
  nannyName: string;
  date: string;
  time: string;
  duration: string;
  status: OrderStatus;
  amount: number;
};

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    nannyName: "Sarah Johnson",
    date: "Nov 25, 2025",
    time: "10:00 AM - 2:00 PM",
    duration: "4 hours",
    status: "ongoing",
    amount: 100,
  },
  {
    id: "2",
    nannyName: "Emily Davis",
    date: "Nov 20, 2025",
    time: "9:00 AM - 5:00 PM",
    duration: "8 hours",
    status: "completed",
    amount: 224,
  },
  {
    id: "3",
    nannyName: "Jessica Brown",
    date: "Nov 15, 2025",
    time: "2:00 PM - 6:00 PM",
    duration: "4 hours",
    status: "completed",
    amount: 88,
  },
];

export default function OrdersScreen() {
  const [selectedTab, setSelectedTab] = useState<"ongoing" | "completed">("ongoing");

  const filteredOrders = MOCK_ORDERS.filter((order) => {
    if (selectedTab === "ongoing") return order.status === "ongoing";
    return order.status === "completed" || order.status === "cancelled";
  });

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "ongoing":
        return colors.primary400;
      case "completed":
        return colors.success;
      case "cancelled":
        return colors.error;
      default:
        return colors.gray600;
    }
  };

  const getStatusBgColor = (status: OrderStatus) => {
    switch (status) {
      case "ongoing":
        return colors.primary100;
      case "completed":
        return colors.success + "20";
      case "cancelled":
        return colors.error + "20";
      default:
        return colors.gray200;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.title}>My Orders</AppText>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "ongoing" && styles.activeTab]}
          onPress={() => setSelectedTab("ongoing")}
        >
          <AppText style={[styles.tabText, selectedTab === "ongoing" && styles.activeTabText]}>
            Ongoing
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "completed" && styles.activeTab]}
          onPress={() => setSelectedTab("completed")}
        >
          <AppText style={[styles.tabText, selectedTab === "completed" && styles.activeTabText]}>
            Completed
          </AppText>
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.ordersContainer}>
          {filteredOrders.length === 0 ? (
            <View style={styles.emptyState}>
              <AppText style={styles.emptyText}>No orders yet</AppText>
              <AppText style={styles.emptySubtext}>
                Your {selectedTab} orders will appear here
              </AppText>
            </View>
          ) : (
            filteredOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <View style={styles.nannyInfo}>
                    <View style={styles.avatarPlaceholder}>
                      <AppText style={styles.avatarText}>
                        {order.nannyName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AppText>
                    </View>
                    <View>
                      <AppText style={styles.nannyName}>{order.nannyName}</AppText>
                      <AppText style={styles.orderDate}>{order.date}</AppText>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusBgColor(order.status) },
                    ]}
                  >
                    <AppText style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </AppText>
                  </View>
                </View>

                <View style={styles.orderDetails}>
                  <View style={styles.detailRow}>
                    <AppText style={styles.detailLabel}>Time:</AppText>
                    <AppText style={styles.detailValue}>{order.time}</AppText>
                  </View>
                  <View style={styles.detailRow}>
                    <AppText style={styles.detailLabel}>Duration:</AppText>
                    <AppText style={styles.detailValue}>{order.duration}</AppText>
                  </View>
                  <View style={styles.detailRow}>
                    <AppText style={styles.detailLabel}>Amount:</AppText>
                    <AppText style={styles.amountText}>${order.amount}</AppText>
                  </View>
                </View>

                {order.status === "ongoing" && (
                  <TouchableOpacity style={styles.trackButton}>
                    <AppText style={styles.trackButtonText}>Track Order</AppText>
                  </TouchableOpacity>
                )}
              </View>
            ))
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
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 24,
    marginBottom: 20,
    gap: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.gray100,
  },
  activeTab: {
    backgroundColor: colors.primary400,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray600,
  },
  activeTabText: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  ordersContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray600,
  },
  orderCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  nannyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
  },
  nannyName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 14,
    color: colors.gray600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  orderDetails: {
    gap: 8,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
  },
  amountText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
  },
  trackButton: {
    backgroundColor: colors.primary400,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
  },
  trackButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
});
