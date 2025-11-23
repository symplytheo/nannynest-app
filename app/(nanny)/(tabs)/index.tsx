import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function NannyDashboardScreen() {
  const router = useRouter();

  const stats = {
    totalBookings: 156,
    completedToday: 2,
    earnings: 3450,
    rating: 4.8,
  };

  const upcomingBookings = [
    {
      id: "1",
      clientName: "Jennifer M.",
      date: "Nov 25, 2025",
      time: "10:00 AM - 2:00 PM",
      children: 2,
      amount: 100,
      location: {
        latitude: 37.7849,
        longitude: -122.4094,
        address: "123 Main St, San Francisco, CA",
      },
    },
    {
      id: "2",
      clientName: "Michael P.",
      date: "Nov 26, 2025",
      time: "3:00 PM - 7:00 PM",
      children: 1,
      amount: 112,
      location: {
        latitude: 37.7899,
        longitude: -122.407,
        address: "456 Oak Ave, San Francisco, CA",
      },
    },
  ];

  // Nanny's current location
  const nannyLocation = {
    latitude: 37.7879,
    longitude: -122.4075,
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText style={styles.greeting}>Hello, Sarah! 👋</AppText>
            <AppText style={styles.subtitle}>Ready for your day?</AppText>
          </View>
        </View>

        {/* Map Section */}
        <View style={styles.mapSection}>
          <AppText style={styles.mapTitle}>Your Location & Nearby Jobs</AppText>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              initialRegion={{
                latitude: nannyLocation.latitude,
                longitude: nannyLocation.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}
            >
              {/* Nanny's location marker */}
              <Marker coordinate={nannyLocation} title="You are here" pinColor={colors.primary500}>
                <View style={styles.nannyMarker}>
                  <AppText style={styles.nannyMarkerText}>👩‍🏫</AppText>
                </View>
              </Marker>

              {/* Booking location markers */}
              {upcomingBookings.map((booking) => (
                <Marker
                  key={booking.id}
                  coordinate={booking.location}
                  title={booking.clientName}
                  description={booking.location.address}
                  pinColor={colors.error}
                />
              ))}
            </MapView>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <AppText style={styles.statValue}>{stats.totalBookings}</AppText>
            <AppText style={styles.statLabel}>Total Jobs</AppText>
          </View>
          <View style={styles.statCard}>
            <AppText style={styles.statValue}>{stats.completedToday}</AppText>
            <AppText style={styles.statLabel}>Today</AppText>
          </View>
          <View style={styles.statCard}>
            <AppText style={styles.statValue}>${stats.earnings}</AppText>
            <AppText style={styles.statLabel}>Earnings</AppText>
          </View>
          <View style={styles.statCard}>
            <AppText style={styles.statValue}>⭐ {stats.rating}</AppText>
            <AppText style={styles.statLabel}>Rating</AppText>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Quick Actions</AppText>
          <View style={styles.actionsGrid}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(nanny)/kyc-verification" as any)}
            >
              <Ionicons name="shield-checkmark-outline" size={32} color={colors.primary400} />
              <AppText style={styles.actionLabel}>Verify KYC</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="calendar-outline" size={32} color={colors.primary400} />
              <AppText style={styles.actionLabel}>Calendar</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => router.push("/(nanny)/wallet" as any)}
            >
              <Ionicons name="wallet-outline" size={32} color={colors.primary400} />
              <AppText style={styles.actionLabel}>Earnings</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionCard}>
              <Ionicons name="star-outline" size={32} color={colors.primary400} />
              <AppText style={styles.actionLabel}>Reviews</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Upcoming Bookings */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Upcoming Bookings</AppText>
            <TouchableOpacity>
              <AppText style={styles.seeAllText}>See all</AppText>
            </TouchableOpacity>
          </View>

          {upcomingBookings.map((booking) => (
            <View key={booking.id} style={styles.bookingCard}>
              <View style={styles.bookingHeader}>
                <View style={styles.avatarPlaceholder}>
                  <AppText style={styles.avatarText}>
                    {booking.clientName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AppText>
                </View>
                <View style={styles.bookingInfo}>
                  <AppText style={styles.bookingName}>{booking.clientName}</AppText>
                  <AppText style={styles.bookingDate}>{booking.date}</AppText>
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

              {booking.location && (
                <View style={styles.bookingLocation}>
                  <Ionicons name="location-outline" size={16} color={colors.gray600} />
                  <AppText style={styles.bookingLocationText}>{booking.location.address}</AppText>
                </View>
              )}

              {/* Action Buttons */}
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
  greeting: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray600,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 24,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: "45%",
    padding: 16,
    backgroundColor: colors.primary100,
    borderRadius: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary600,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray700,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary400,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  actionCard: {
    flex: 1,
    minWidth: "22%",
    padding: 16,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray200,
    gap: 8,
  },
  actionLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.gray900,
    textAlign: "center",
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
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
  },
  bookingInfo: {
    flex: 1,
  },
  bookingName: {
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
  bookingLocation: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.gray100,
  },
  bookingLocationText: {
    fontSize: 13,
    color: colors.gray600,
    flex: 1,
  },
  bookingActions: {
    flexDirection: "row",
    gap: 8,
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
  mapSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  mapTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 12,
  },
  mapContainer: {
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray200,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  map: {
    width: SCREEN_WIDTH - 48,
    height: 220,
  },
  nannyMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary500,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  nannyMarkerText: {
    fontSize: 20,
  },
});
