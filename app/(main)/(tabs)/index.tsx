import { Ionicons } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AppText from "~/components/common/app-text";
import { BottomDrawer } from "~/components/main/home";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

const { width, height } = Dimensions.get("window");

export default function HomeScreen() {
  const handleServicePress = (serviceId: string) => {
    console.log("Service pressed:", serviceId);
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

      {/* Location Header */}
      <View style={styles.locationHeaderContainer}>
        <View style={styles.locationHeader}>
          <View style={styles.locationInfo}>
            <AppText style={styles.locationCity}>Abuja, Nigeria</AppText>
            <TouchableOpacity activeOpacity={0.7}>
              <AppText style={styles.editLocation}>Edit service location</AppText>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.cameraButton} activeOpacity={0.7}>
            <Feather name="camera" size={24} color={colors.gray900} />
            <View style={styles.cameraBadge}></View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Drawer */}
      <BottomDrawer onServicePress={handleServicePress} onBannerClose={handleBannerClose} />
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
  locationHeaderContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingTop: 40,
    paddingBottom: 8,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  locationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  locationInfo: {
    flex: 1,
  },
  locationCity: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
    marginBottom: 0,
  },
  editLocation: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
    marginTop: -7,
  },
  cameraButton: {
    width: 48,
    height: 48,
    borderRadius: 24,

    justifyContent: "center",
    alignItems: "center",
  },
  cameraBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.error,
    justifyContent: "center",
    alignItems: "center",
  },
});
