import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function NannyProfileScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [isSaved, setIsSaved] = useState(false);

  // Mock data - in real app, fetch based on id
  const nanny = {
    id: id || "1",
    name: "Sarah Johnson",
    rating: 4.8,
    reviews: 124,
    hourlyRate: 25,
    distance: "0.5 km",
    experience: "5 years",
    isAvailable: true,
    completedJobs: 156,
    responseTime: "10 mins",
    languages: ["English", "Spanish"],
    skills: ["First Aid Certified", "Early Childhood Education", "Special Needs Care"],
    about:
      "Hi! I'm Sarah, a dedicated childcare professional with 5 years of experience caring for children of all ages. I specialize in creating fun, educational activities and maintaining a safe, nurturing environment. I'm CPR certified and have a degree in Early Childhood Education.",
    reviewList: [
      {
        id: "1",
        userName: "Jennifer M.",
        rating: 5,
        date: "Nov 15, 2025",
        comment:
          "Sarah is amazing! My kids absolutely love her. She's punctual, professional, and really engaging with the children.",
      },
      {
        id: "2",
        userName: "Michael P.",
        rating: 5,
        date: "Oct 28, 2025",
        comment:
          "Highly recommend! Very responsible and caring. Our toddler took to her immediately.",
      },
    ],
  };

  const handleBookNow = () => {
    router.push(`/(main)/booking-details?nannyId=${nanny.id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Nanny Profile</AppText>
        <TouchableOpacity style={styles.saveButton} onPress={() => setIsSaved(!isSaved)}>
          <Ionicons name={isSaved ? "heart" : "heart-outline"} size={24} color={colors.error} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <AppText style={styles.avatarText}>
                {nanny.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AppText>
            </View>
            {nanny.isAvailable && <View style={styles.availableBadge} />}
          </View>
          <AppText style={styles.nannyName}>{nanny.name}</AppText>
          <View style={styles.ratingContainer}>
            <AppText style={styles.ratingText}>⭐ {nanny.rating}</AppText>
            <AppText style={styles.reviewsCount}>({nanny.reviews} reviews)</AppText>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <AppText style={styles.statValue}>{nanny.experience}</AppText>
            <AppText style={styles.statLabel}>Experience</AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText style={styles.statValue}>{nanny.completedJobs}</AppText>
            <AppText style={styles.statLabel}>Completed</AppText>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <AppText style={styles.statValue}>{nanny.responseTime}</AppText>
            <AppText style={styles.statLabel}>Response</AppText>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>About</AppText>
          <AppText style={styles.aboutText}>{nanny.about}</AppText>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Languages</AppText>
          <View style={styles.tagsContainer}>
            {nanny.languages.map((lang, index) => (
              <View key={index} style={styles.tag}>
                <AppText style={styles.tagText}>{lang}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Skills & Certifications</AppText>
          <View style={styles.skillsContainer}>
            {nanny.skills.map((skill, index) => (
              <View key={index} style={styles.skillItem}>
                <AppText style={styles.skillBullet}>✓</AppText>
                <AppText style={styles.skillText}>{skill}</AppText>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Reviews</AppText>
          {nanny.reviewList.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View>
                  <AppText style={styles.reviewUserName}>{review.userName}</AppText>
                  <AppText style={styles.reviewDate}>{review.date}</AppText>
                </View>
                <View style={styles.reviewRating}>
                  <AppText style={styles.reviewRatingText}>⭐ {review.rating}</AppText>
                </View>
              </View>
              <AppText style={styles.reviewComment}>{review.comment}</AppText>
            </View>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.priceContainer}>
          <AppText style={styles.priceLabel}>Hourly Rate</AppText>
          <AppText style={styles.priceText}>${nanny.hourlyRate}/hour</AppText>
        </View>
        <AppButton
          label="Book Now"
          variant="filled"
          color="brand"
          onPress={handleBookNow}
          style={styles.bookButton}
        />
      </View>
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
  saveButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 24,
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary600,
  },
  availableBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success,
    borderWidth: 3,
    borderColor: colors.white,
  },
  nannyName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
  },
  reviewsCount: {
    fontSize: 16,
    color: colors.gray600,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 24,
    marginHorizontal: 24,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    marginBottom: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.gray600,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray300,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 12,
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray700,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    backgroundColor: colors.primary100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary600,
  },
  skillsContainer: {
    gap: 12,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  skillBullet: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.success,
  },
  skillText: {
    fontSize: 16,
    color: colors.gray700,
  },
  reviewCard: {
    backgroundColor: colors.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  reviewUserName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.gray600,
  },
  reviewRating: {
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  reviewRatingText: {
    fontSize: 14,
    fontWeight: "600",
  },
  reviewComment: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.gray700,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 2,
  },
  priceText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary600,
  },
  bookButton: {
    flex: 1,
    marginLeft: 16,
  },
});
