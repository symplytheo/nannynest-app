import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import type { InfoBannerData } from "~/constants/homedata";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type InfoBannerProps = {
  banner: InfoBannerData;
  onClose?: () => void;
};

export function InfoBanner({ banner, onClose }: InfoBannerProps) {
  return (
    <View style={[styles.infoBanner, { backgroundColor: banner.bgColor }]}>
      <View style={styles.infoBannerContent}>
        <View style={[styles.infoBannerIcon, { backgroundColor: banner.iconColor }]}>
          <Ionicons name={banner.icon as any} size={24} color={colors.white} />
        </View>
        <View>
          <AppText style={styles.infoBannerTitle}>{banner.title}</AppText>
          <AppText style={styles.infoBannerSubtitle}>{banner.subtitle}</AppText>
        </View>
      </View>
      {onClose && (
        <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.gray600} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  infoBanner: {
    flexDirection: "row",
    borderRadius: 12,
    padding: 12,
    marginRight: 16,
    justifyContent: "space-between",
    width: 330,
  },
  infoBannerContent: { flexDirection: "row", alignItems: "center" },
  infoBannerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoBannerTitle: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  infoBannerSubtitle: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    marginTop: -5,
  },
  closeButton: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
