import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import { INFO_BANNERS, SERVICES } from "~/constants/homedata";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";
import { InfoBanner } from "./info-banner";
import { ServiceCard } from "./service-card";

type BottomDrawerProps = {
  onServicePress?: (serviceId: string) => void;
  onBannerClose?: (bannerId: string) => void;
};

export function BottomDrawer({ onServicePress, onBannerClose }: BottomDrawerProps) {
  return (
    <View style={styles.drawer}>
      {/* Drag Handle (Dummy) */}
      <View style={styles.handleContainer}>
        <View style={styles.handle} />
      </View>

      <View style={styles.drawerContent}>
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

        {/* Select Service Section */}
        <View style={styles.section}>
          <AppText style={styles.sectionTitle}>Select service</AppText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.servicesContainer}
          >
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                image={service.image}
                onPress={() => onServicePress?.(service.id)}
              />
            ))}
          </ScrollView>
        </View>
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
    paddingBottom: 10, // Space for tab bar
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
  bannersScroll: {
    marginBottom: 24,
  },
  bannersContainer: {
    paddingRight: 10,
  },
  section: {
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  servicesContainer: {
    paddingRight: 10,
  },
});
