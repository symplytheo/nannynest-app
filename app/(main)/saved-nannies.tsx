import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

type SavedNanny = {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  hourlyRate: number;
  experience: string;
};

const SAVED_NANNIES: SavedNanny[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 124,
    hourlyRate: 25,
    experience: "5 years",
  },
  {
    id: "2",
    name: "Emily Davis",
    rating: 4.9,
    reviews: 98,
    hourlyRate: 28,
    experience: "7 years",
  },
];

export default function SavedNanniesScreen() {
  const router = useRouter();

  const handleNannyPress = (nannyId: string) => {
    router.push(`/(main)/nanny-profile?id=${nannyId}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Saved Nannies</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {SAVED_NANNIES.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color={colors.gray300} />
            <AppText style={styles.emptyText}>No saved nannies yet</AppText>
            <AppText style={styles.emptySubtext}>Nannies you save will appear here</AppText>
          </View>
        ) : (
          <View style={styles.nanniesContainer}>
            {SAVED_NANNIES.map((nanny) => (
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
                </View>

                <View style={styles.nannyInfo}>
                  <View style={styles.nannyHeader}>
                    <AppText style={styles.nannyName}>{nanny.name}</AppText>
                    <TouchableOpacity>
                      <Ionicons name="heart" size={24} color={colors.error} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color="#FFB800" />
                    <AppText style={styles.ratingText}>{nanny.rating}</AppText>
                    <AppText style={styles.reviewsText}>({nanny.reviews})</AppText>
                  </View>

                  <View style={styles.nannyDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="briefcase-outline" size={14} color={colors.gray600} />
                      <AppText style={styles.detailValue}>{nanny.experience}</AppText>
                    </View>
                  </View>

                  <View style={styles.nannyFooter}>
                    <AppText style={styles.priceText}>
                      ${nanny.hourlyRate}
                      <AppText style={styles.priceUnit}>/hour</AppText>
                    </AppText>
                  </View>
                </View>
              </TouchableOpacity>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  scrollView: {
    flex: 1,
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
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.gray600,
  },
  nanniesContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 16,
  },
  nannyCard: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  nannyImageContainer: {
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
  nannyInfo: {
    flex: 1,
  },
  nannyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  nannyName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
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
    alignItems: "center",
    gap: 6,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray700,
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
});
