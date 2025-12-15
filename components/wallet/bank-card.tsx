import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type BankCardProps = {
  accountName: string;
  accountNumber: string;
  bankName: string;
  onDelete: () => void;
};

export default function BankCard({
  accountName,
  accountNumber,
  bankName,
  onDelete,
}: BankCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const flipAnimation = useRef(new Animated.Value(0)).current;

  const flipCard = () => {
    const toValue = isFlipped ? 0 : 180;

    Animated.spring(flipAnimation, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setIsFlipped(!isFlipped);
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [1, 0, 0],
  });

  const backOpacity = flipAnimation.interpolate({
    inputRange: [0, 90, 180],
    outputRange: [0, 0, 1],
  });

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={flipCard} activeOpacity={0.9}>
      {/* Front of Card */}
      <Animated.View
        style={[
          styles.card,
          styles.cardFront,
          {
            transform: [{ rotateY: frontInterpolate }],
            opacity: frontOpacity,
          },
        ]}
      >
        <View>
          <AppText style={styles.accountName}>{accountName}</AppText>
          <AppText style={styles.accountNumber}>{accountNumber}</AppText>
        </View>
        <AppText style={styles.bankName}>{bankName}</AppText>
      </Animated.View>

      {/* Back of Card */}
      <Animated.View
        style={[
          styles.card,
          styles.cardBack,
          {
            transform: [{ rotateY: backInterpolate }],
            opacity: backOpacity,
          },
        ]}
      >
        <View style={styles.backContent}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={(e) => {
              e?.stopPropagation();
              onDelete();
            }}
            activeOpacity={0.7}
          >
            <AppText style={styles.buttonText}>Delete Card</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={(e) => {
              e?.stopPropagation();
              flipCard();
            }}
            activeOpacity={0.7}
          >
            <AppText style={styles.buttonText}>Back</AppText>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    height: 156,
    marginBottom: 24,
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 20,
    justifyContent: "space-between",
    backfaceVisibility: "hidden",
  },
  cardFront: {
    backgroundColor: colors.primary400,
  },
  cardBack: {
    backgroundColor: colors.primary800,
  },
  accountName: {
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: colors.white,
    marginBottom: 8,
    lineHeight: 20,
  },
  accountNumber: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.white,
    lineHeight: 16,
  },
  bankName: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.white,
  },
  backContent: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  deleteButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: "center",
  },
  backButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.white,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.white,
  },
});
