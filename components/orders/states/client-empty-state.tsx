import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function ClientEmptyState() {
  const router = useRouter();

  return (
    <View style={styles.emptyState}>
      <AppText style={styles.emptyTitle}>No history here</AppText>
      <AppText style={styles.emptyDescription}>
        Complete your first order. You&apos;ll find your ongoing and history here all right here.
      </AppText>
      <AppButton
        label="Explore"
        variant="filled"
        color="brand"
        onPress={() => router.push("/(main)/(tabs)/" as any)}
        style={styles.exploreButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.black,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  exploreButton: {
    paddingHorizontal: 32,
  },
});
