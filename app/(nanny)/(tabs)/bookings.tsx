import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

type Booking = {
  id: string;
  clientName: string;
  date: string;
  time: string;
  children: number;
  amount: number;
  status: "pending" | "accepted" | "completed" | "cancelled";
};

const MOCK_BOOKINGS: Booking[] = [
  {
    id: "1",
    clientName: "Jennifer M.",
    date: "Nov 25, 2025",
    time: "10:00 AM - 2:00 PM",
    children: 2,
    amount: 100,
    status: "pending",
  },
  {
    id: "2",
    clientName: "Michael P.",
    date: "Nov 26, 2025",
    time: "3:00 PM - 7:00 PM",
    children: 1,
    amount: 112,
    status: "accepted",
  },
  {
    id: "3",
    clientName: "Sarah K.",
    date: "Nov 20, 2025",
    time: "9:00 AM - 1:00 PM",
    children: 3,
    amount: 150,
    status: "completed",
  },
];

export default function NannyBookingsScreen() {
  const [selectedTab, setSelectedTab] = useState<"pending" | "accepted" | "completed">("pending");

  const filteredBookings = MOCK_BOOKINGS.filter((booking) => booking.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return colors.gray600;
      case "accepted":
        return colors.primary400;
      case "completed":
        return colors.success;
      default:
        return colors.gray600;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <AppText style={styles.title}>My Bookings</AppText>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "pending" && styles.activeTab]}
          onPress={() => setSelectedTab("pending")}
        >
          <AppText style={[styles.tabText, selectedTab === "pending" && styles.activeTabText]}>
            Pending
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "accepted" && styles.activeTab]}
          onPress={() => setSelectedTab("accepted")}
        >
          <AppText style={[styles.tabText, selectedTab === "accepted" && styles.activeTabText]}>
            Accepted
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

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {filteredBookings.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={64} color={colors.gray300} />
            <AppText style={styles.emptyText}>No {selectedTab} bookings</AppText>
            <AppText style={styles.emptySubtext}>
              Your {selectedTab} bookings will appear here
            </AppText>
          </View>
        ) : (
          <View style={styles.bookingsContainer}>
            {filteredBookings.map((booking) => (
              <View key={booking.id} style={styles.bookingCard}>
                <View style={styles.bookingHeader}>
                  <View style={styles.clientInfo}>
                    <View style={styles.avatarPlaceholder}>
                      <AppText style={styles.avatarText}>
                        {booking.clientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AppText>
                    </View>
                    <View>
                      <AppText style={styles.clientName}>{booking.clientName}</AppText>
                      <AppText style={styles.bookingDate}>{booking.date}</AppText>
                    </View>
                  </View>
                  <AppText style={styles.bookingAmount}>${booking.amount}</AppText>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.bookingDetailItem}>
                    <Ionicons name="time-outline" size={16} color={colors.gray600} />
                    <AppText style={styles.bookingDetailText}>{booking.time}</AppText>
                  </View>
                  <View style={styles.bookingDetailItem}>
                    <Ionicons name="people-outline" size={16} color={colors.gray600} />
                    <AppText style={styles.bookingDetailText}>
                      {booking.children} {booking.children === 1 ? "child" : "children"}
                    </AppText>
                  </View>
                </View>

                {booking.status === "pending" && (
                  <View style={styles.bookingActions}>
                    <TouchableOpacity style={styles.acceptButton}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.white} />
                      <AppText style={styles.acceptButtonText}>Accept</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.declineButton}>
                      <Ionicons name="close-circle-outline" size={20} color={colors.error} />
                      <AppText style={styles.declineButtonText}>Decline</AppText>
                    </TouchableOpacity>
                  </View>
                )}

                {booking.status === "accepted" && (
                  <TouchableOpacity style={styles.viewDetailsButton}>
                    <AppText style={styles.viewDetailsText}>View Details</AppText>
                    <Ionicons name="chevron-forward" size={20} color={colors.primary400} />
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}
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
    gap: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.gray100,
  },
  activeTab: {
    backgroundColor: colors.primary400,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray600,
  },
  activeTabText: {
    color: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  bookingsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  bookingCard: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  clientInfo: {
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
  clientName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 2,
  },
  bookingDate: {
    fontSize: 14,
    color: colors.gray600,
  },
  bookingAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary600,
  },
  bookingDetails: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 12,
  },
  bookingDetailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  bookingDetailText: {
    fontSize: 14,
    color: colors.gray700,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: colors.success,
    borderRadius: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  declineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.error,
  },
  declineButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.error,
  },
  viewDetailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    backgroundColor: colors.primary100,
    borderRadius: 8,
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary400,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 8,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray600,
  },
});
