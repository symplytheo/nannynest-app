import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

type NannyCard = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  distance: string;
  experience: string;
  image?: string;
  isAvailable: boolean;
};

const MOCK_NANNIES: NannyCard[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 124,
    hourlyRate: 25,
    distance: "0.5 km",
    experience: "5 years",
    isAvailable: true,
  },
  {
    id: "2",
    name: "Emily Davis",
    rating: 4.9,
    reviews: 98,
    hourlyRate: 28,
    distance: "1.2 km",
    experience: "7 years",
    isAvailable: true,
  },
  {
    id: "3",
    name: "Jessica Brown",
    rating: 4.7,
    reviews: 156,
    hourlyRate: 22,
    distance: "2.1 km",
    experience: "3 years",
    isAvailable: false,
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleNannyPress = (nannyId: string) => {
    router.push(`/(main)/nanny-profile?id=${nannyId}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <AppText style={styles.greeting}>Hello, Matthew 👋</AppText>
            <AppText style={styles.subtitle}>Find your perfect nanny</AppText>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color={colors.gray400}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or location..."
            placeholderTextColor={colors.gray400}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <AppText style={styles.mapText}>🗺️ Map View</AppText>
            <AppText style={styles.mapSubtext}>Nannies near you</AppText>
          </View>
        </View>

        {/* Available Nannies */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AppText style={styles.sectionTitle}>Available Nannies</AppText>
            <TouchableOpacity>
              <AppText style={styles.seeAllText}>See all</AppText>
            </TouchableOpacity>
          </View>

          {MOCK_NANNIES.map((nanny) => (
            <TouchableOpacity
              key={nanny.id}
              style={styles.nannyCard}
              onPress={() => handleNannyPress(nanny.id)}
              activeOpacity={0.7}
            >
              <View style={styles.nannyImageContainer}>
                <View style={styles.nannyImagePlaceholder}>
                  <AppText style={styles.nannyInitials}>
                    {nanny.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AppText>
                </View>
                {nanny.isAvailable && <View style={styles.availableBadge} />}
              </View>

              <View style={styles.nannyInfo}>
                <View style={styles.nannyHeader}>
                  <AppText style={styles.nannyName}>{nanny.name}</AppText>
                  <View style={styles.ratingContainer}>
                    <AppText style={styles.ratingText}>⭐ {nanny.rating}</AppText>
                    <AppText style={styles.reviewsText}>({nanny.reviews})</AppText>
                  </View>
                </View>

                <View style={styles.nannyDetails}>
                  <View style={styles.detailItem}>
                    <AppText style={styles.detailLabel}>Experience:</AppText>
                    <AppText style={styles.detailValue}>{nanny.experience}</AppText>
                  </View>
                  <View style={styles.detailItem}>
                    <AppText style={styles.detailLabel}>Distance:</AppText>
                    <AppText style={styles.detailValue}>{nanny.distance}</AppText>
                  </View>
                </View>

                <View style={styles.nannyFooter}>
                  <AppText style={styles.priceText}>
                    ${nanny.hourlyRate}
                    <AppText style={styles.priceUnit}>/hour</AppText>
                  </AppText>
                  <View
                    style={[
                      styles.statusBadge,
                      nanny.isAvailable
                        ? styles.availableStatusBadge
                        : styles.unavailableStatusBadge,
                    ]}
                  >
                    <AppText
                      style={[
                        styles.statusText,
                        nanny.isAvailable
                          ? styles.availableStatusText
                          : styles.unavailableStatusText,
                      ]}
                    >
                      {nanny.isAvailable ? "Available" : "Busy"}
                    </AppText>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 40,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 48,
    backgroundColor: colors.gray100,
    borderRadius: 24,
    paddingLeft: 48,
    paddingRight: 20,
    fontSize: 16,
    color: colors.gray900,
  },
  mapContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: colors.gray100,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  mapText: {
    fontSize: 32,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: colors.gray600,
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
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary400,
  },
  nannyCard: {
    flexDirection: "row",
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
  nannyImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  nannyImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  nannyInitials: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary600,
  },
  availableBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.success,
    borderWidth: 2,
    borderColor: colors.white,
  },
  nannyInfo: {
    flex: 1,
  },
  nannyHeader: {
    marginBottom: 8,
  },
  nannyName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 14,
    color: colors.gray600,
  },
  nannyDetails: {
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: "row",
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.gray600,
    marginRight: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
  },
  nannyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary600,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray600,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  availableStatusBadge: {
    backgroundColor: colors.success + "20",
  },
  unavailableStatusBadge: {
    backgroundColor: colors.gray200,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
  availableStatusText: {
    color: colors.success,
  },
  unavailableStatusText: {
    color: colors.gray600,
  },
});
