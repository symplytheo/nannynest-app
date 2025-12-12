import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import { InfoBanner } from "~/components/main/home/info-banner";
import { INFO_BANNERS } from "~/constants/homedata";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type NannyBottomDrawerProps = {
  isOnline: boolean;
  onToggleOnline: () => void;
  onBannerClose?: (bannerId: string) => void;
};

export function NannyBottomDrawer({
  isOnline,
  onToggleOnline,
  onBannerClose,
}: NannyBottomDrawerProps) {
  return (
    <View style={styles.drawer}>
      {/* Drag Handle (Dummy) */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      <View style={styles.drawerContent}>
        {/* Title and Button */}
        <View style={styles.titleSection}>
          <AppText style={styles.drawerTitle}>
            {isOnline ? "Need a break?" : "Ready to work?"}
          </AppText>
          {/* <AppButton
            label={isOnline ? "Go Offline" : "Go online"}
            variant="filled"
            color={isOnline ? "error" : "success"}
            onPress={onToggleOnline}
            style={styles.statusButton}
          /> */}

          <TouchableOpacity
            onPress={onToggleOnline}
            style={[
              styles.statusButton,
              { backgroundColor: isOnline ? colors.error500 : colors.success600 },
            ]}
          >
            <AppText style={styles.statusButtonText}>
              {isOnline ? "Go Offline" : "Go online"}
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Job Request Notification */}
        {isOnline && (
          <View style={styles.jobNotification}>
            <View style={styles.jobNotificationIcon}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary400} />
            </View>
            <AppText style={styles.jobNotificationText}>
              Your job request will come up here...
            </AppText>
          </View>
        )}

        {/* Info Banners */}
        {INFO_BANNERS.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannersContainer}
            style={styles.bannersScroll}
          >
            {INFO_BANNERS.map((banner) => (
              <InfoBanner
                key={banner.id}
                banner={banner}
                onClose={() => onBannerClose?.(banner.id)}
              />
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
    paddingBottom: 30,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 100,
    backgroundColor: colors.gray300,
  },
  drawerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleSection: {
    alignItems: "center",
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: fontWeights.bold,
    color: colors.gray700,
    marginBottom: 20,
    textAlign: "center",
  },
  statusButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.white,
  },
  jobNotification: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.gray75,
    borderRadius: 16,
    padding: 12,
    marginTop: 24,
  },
  jobNotificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  jobNotificationText: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.black,
  },
  bannersScroll: {
    marginBottom: 0,
  },
  bannersContainer: {
    paddingRight: 10,
    marginTop: 20,
  },
});
