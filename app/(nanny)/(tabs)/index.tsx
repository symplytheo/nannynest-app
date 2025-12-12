import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { NannyBottomDrawer } from "~/components/nanny/home";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

const { width, height } = Dimensions.get("window");

export default function NannyDashboardScreen() {
  const [isOnline, setIsOnline] = useState(false);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  const handleBannerClose = (bannerId: string) => {
    console.log("Banner closed:", bannerId);
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 9.0579,
          longitude: 7.4951,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 9.0579,
            longitude: 7.4951,
          }}
        >
          <View style={styles.markerContainer}>
            <Ionicons name="location" size={40} color={colors.error} />
          </View>
        </Marker>
      </MapView>

      {/* Bottom Drawer */}
      <NannyBottomDrawer
        isOnline={isOnline}
        onToggleOnline={toggleOnlineStatus}
        onBannerClose={handleBannerClose}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  map: {
    width: width,
    height: height,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusBanner: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: "#D1F4E0",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 4,
    borderLeftColor: colors.success,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
  },
  statusContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  statusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  onlineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success,
  },
  statusTextContainer: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
    marginBottom: 2,
  },
  statusSubtitle: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
  },
});
