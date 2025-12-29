import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import NannyInfoCard from "~/components/orders/nanny-info-card";
import type { OngoingOrder } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ClientAwaitingStateProps = {
  order: OngoingOrder;
};

export default function ClientAwaitingState({ order }: ClientAwaitingStateProps) {
  const router = useRouter();

  return (
    <View>
      <NannyInfoCard
        name={order.nanny.name}
        avatar={order.nanny.avatar}
        date={order.date}
        startTime={order.startTime}
        endTime={order.endTime}
        status="awaiting"
      />

      <View style={styles.divider} />

      <View style={styles.waitingSection}>
        <AppText style={styles.waitingTitle}>While waiting...</AppText>
        <AppText style={styles.waitingDescription}>
          Create/add a service checklist for your nanny. Be reasonable not to overload your nanny
          with too much work.
        </AppText>
        <AppButton
          label="Add service task"
          variant="filled"
          color="brand"
          onPress={() => router.push("/(main)/add-order-checklist" as any)}
          style={styles.addTaskButton}
          size="small"
        />
      </View>
      <View style={[styles.divider, { marginVertical: 16 }]} />

      {/* Guides Section */}
      <View style={styles.guidesSection}>
        <AppText style={styles.guidesTitle}>Checkout our guides</AppText>
        <View style={styles.guideCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9" }}
            style={styles.guideImage}
            contentFit="cover"
          />
          <View style={styles.guideOverlay}>
            <View style={styles.tipsBadge}>
              <AppText style={styles.tipsText}>TIPS</AppText>
            </View>
            <AppText style={styles.guideText}>How to handle Nanny in your home</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  waitingSection: {
    marginBottom: 24,
  },
  waitingTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  waitingDescription: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.black,
    lineHeight: 20,
    marginBottom: 24,
  },
  addTaskButton: {
    alignSelf: "flex-start",
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 24,
  },
  guidesSection: {
    marginTop: 8,
  },
  guidesTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 12,
  },
  guideCard: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  guideImage: {
    width: "100%",
    height: "100%",
  },
  guideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
    justifyContent: "flex-end",
  },
  tipsBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 10,
    fontWeight: fontWeights.bold,
    color: colors.white,
    letterSpacing: 1,
  },
  guideText: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.white,
    lineHeight: 24,
  },
});
