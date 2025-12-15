import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type Review = {
  id: string;
  userName: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
};

export default function ReviewRatingsScreen() {
  const [reviews] = useState<Review[]>([
    {
      id: "1",
      userName: "Ola Matthew",
      location: "Lagos, Nigeria",
      rating: 4.3,
      comment: "Amazing experience he did a perfect job wit",
      date: "Jul 2025",
      avatar: "O",
    },
    {
      id: "2",
      userName: "Ola Matthew",
      location: "Lagos, Nigeria",
      rating: 4.3,
      comment: "Amazing experience he did a perfect job wit",
      date: "Jul 2025",
      avatar: "O",
    },
    {
      id: "3",
      userName: "Ola Matthew",
      location: "Lagos, Nigeria",
      rating: 4.3,
      comment: "Amazing experience he did a perfect job wit",
      date: "Jul 2025",
      avatar: "O",
    },
    {
      id: "4",
      userName: "Ola Matthew",
      location: "Lagos, Nigeria",
      rating: 4.3,
      comment: "Amazing experience he did a perfect job wit",
      date: "Jul 2025",
      avatar: "O",
    },
  ]);

  const averageRating = 4.3;
  const totalReviews = 23;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Review and Ratings" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Average Rating */}
          <View style={styles.ratingHeader}>
            <View style={styles.ratingContainer}>
              <AppText style={styles.ratingValue}>{averageRating}</AppText>
              <Ionicons name="star" size={25} color={"#DCB620"} />
            </View>
          </View>

          {/* Reviews Count */}
          <AppText style={styles.reviewsCount}>Reviews ({totalReviews})</AppText>

          {/* Reviews List */}
          <View style={styles.reviewsList}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <View style={styles.reviewLeft}>
                    <View style={styles.avatarCircle}>
                      <AppText style={styles.avatarText}>{review.avatar}</AppText>
                    </View>
                    <View style={styles.reviewInfo}>
                      <AppText style={styles.reviewerName}>{review.userName}</AppText>
                      <AppText style={styles.reviewerLocation}>{review.location}</AppText>
                    </View>
                  </View>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={14} color={"#DCB620"} />
                    <AppText style={styles.ratingText}>{review.rating}</AppText>
                  </View>
                </View>

                <AppText style={styles.reviewComment}>{review.comment}</AppText>
                <AppText style={styles.reviewDate}>{review.date}</AppText>
              </View>
            ))}
          </View>
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  ratingHeader: {
    alignItems: "center",
    paddingBottom: 24,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingValue: {
    fontSize: 36,
    fontWeight: fontWeights.bold,
    color: colors.black,
    lineHeight: 42,
  },
  reviewsCount: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray600,
    marginBottom: 16,
  },
  reviewsList: {
    gap: 12,
  },
  reviewCard: {
    padding: 12,
    borderRadius: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewLeft: {
    flexDirection: "row",
    gap: 8,
    flex: 1,
  },
  avatarCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 10,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    padding: 0,
    margin: 0,
    lineHeight: 12,
  },
  reviewInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,

    lineHeight: 14,
    marginBottom: 4,
  },
  reviewerLocation: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,

    lineHeight: 14,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  reviewComment: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
    lineHeight: 20,
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
});
