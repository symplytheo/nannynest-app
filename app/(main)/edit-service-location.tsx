import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

const { width, height } = Dimensions.get("window");

export default function EditServiceLocationScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLocation] = useState({
    latitude: 9.0579,
    longitude: 7.4951,
    name: "Abuja, Nigeria",
  });

  // Mock suggestions - replace with actual API call
  const suggestions = [
    { id: "1", name: "Abuja, Nigeria", description: "Federal Capital Territory" },
    { id: "2", name: "Lagos, Nigeria", description: "Lagos State" },
    { id: "3", name: "Port Harcourt, Nigeria", description: "Rivers State" },
  ];

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleSuggestionPress = (suggestion: any) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    // Update map location based on suggestion
    // You would typically geocode the address here
  };

  const handleUseCurrentLocation = () => {
    // Implement geolocation logic here
    console.log("Using current location");
  };

  const handleConfirm = () => {
    // Save the selected location
    router.back();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        >
          <View style={styles.markerContainer}>
            <Ionicons name="location" size={40} color={colors.error} />
          </View>
        </Marker>
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
          <Ionicons name="close" size={24} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Enter your location</AppText>
      </View>

      {/* Search Modal */}
      <Modal visible={showSuggestions} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Enter your location</AppText>
              <TouchableOpacity onPress={() => setShowSuggestions(false)}>
                <Ionicons name="close" size={24} color={colors.gray900} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.gray500} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Enter your location"
                placeholderTextColor={colors.gray500}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoFocus
              />
            </View>

            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={handleUseCurrentLocation}
            >
              <Ionicons name="locate" size={20} color={colors.primary400} />
              <AppText style={styles.currentLocationText}>Use my current location</AppText>
            </TouchableOpacity>

            <ScrollView style={styles.suggestionsContainer}>
              {suggestions.map((suggestion) => (
                <TouchableOpacity
                  key={suggestion.id}
                  style={styles.suggestionItem}
                  onPress={() => handleSuggestionPress(suggestion)}
                >
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={colors.gray700}
                    style={styles.suggestionIcon}
                  />
                  <View style={styles.suggestionContent}>
                    <AppText style={styles.suggestionName}>{suggestion.name}</AppText>
                    <AppText style={styles.suggestionDescription}>{suggestion.description}</AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <View style={styles.locationInputContainer}>
          <TouchableOpacity style={styles.locationInput} onPress={handleSearchFocus}>
            <Ionicons
              name="search"
              size={20}
              color={colors.gray500}
              style={styles.inputSearchIcon}
            />
            <AppText style={styles.locationInputText}>
              {searchQuery || "Enter your location"}
            </AppText>
          </TouchableOpacity>
        </View>

        <AppButton label="Use my current location" onPress={handleConfirm} />
      </View>
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
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 10,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    textAlign: "center",
  },
  bottomSection: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  locationInputContainer: {
    marginBottom: 16,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  inputSearchIcon: {
    marginRight: 12,
  },
  locationInputText: {
    fontSize: 14,
    color: colors.gray500,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray50,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.primary400,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.gray900,
    padding: 0,
  },
  currentLocationButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: 8,
  },
  currentLocationText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
    marginLeft: 12,
  },
  suggestionsContainer: {
    maxHeight: height * 0.5,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  suggestionIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionName: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  suggestionDescription: {
    fontSize: 12,
    color: colors.gray500,
  },
});
