import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChildCategory = {
  id: string;
  label: string;
  icon: any;
  ageRange: string;
};

type ElderlyOption = {
  id: string;
  label: string;
  icon: any;
};

const CHILD_CATEGORIES: ChildCategory[] = [
  {
    id: "baby",
    label: "Baby (below 3yrs)",
    icon: "🍼",
    ageRange: "below 3yrs",
  },
  {
    id: "kid",
    label: "Kid (3-12yrs)",
    icon: "👶",
    ageRange: "3-12yrs",
  },
  {
    id: "teen",
    label: "Teens (13-18 years)",
    icon: "👦",
    ageRange: "13-18 years",
  },
];

const ELDERLY_OPTION: ElderlyOption = {
  id: "elderly",
  label: "Elderly",
  icon: "👴",
};

export default function ServiceBookingScreen() {
  const router = useRouter();
  const { serviceId, serviceTitle } = useLocalSearchParams();

  const [childCounts, setChildCounts] = useState<{ [key: string]: number }>({
    baby: 0,
    kid: 0,
    teen: 0,
  });

  const [elderlyCount, setElderlyCount] = useState(0);
  const [startTime, setStartTime] = useState("9:00 AM");
  const [endTime, setEndTime] = useState("4:00 PM");

  const isElderlyCare = serviceTitle === "Elderly Care" || serviceId === "2";

  const incrementCount = (categoryId: string) => {
    if (categoryId === "elderly") {
      setElderlyCount((prev) => prev + 1);
    } else {
      setChildCounts((prev) => ({
        ...prev,
        [categoryId]: prev[categoryId] + 1,
      }));
    }
  };

  const decrementCount = (categoryId: string) => {
    if (categoryId === "elderly") {
      setElderlyCount((prev) => Math.max(0, prev - 1));
    } else {
      setChildCounts((prev) => ({
        ...prev,
        [categoryId]: Math.max(0, prev[categoryId] - 1),
      }));
    }
  };

  const getTotalCount = () => {
    if (isElderlyCare) {
      return elderlyCount;
    }
    return Object.values(childCounts).reduce((sum, count) => sum + count, 0);
  };

  const handleNext = () => {
    if (getTotalCount() === 0) {
      // Show error or alert
      return;
    }

    // Navigate to booking details or order summary/review

    router.push("/(main)/booking-details" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
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
      </View>

      {/* Bottom Content */}
      <View style={styles.bottomSheet}>
        <View style={styles.handleContainer}>
          <View style={styles.handle} />
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Question Section */}
          <View style={styles.section}>
            <AppText style={styles.question}>
              {isElderlyCare ? "How many elderly do you have?" : "How many kids do you have?"}
            </AppText>

            {isElderlyCare ? (
              // Elderly Option
              <View style={styles.categoryCard}>
                <View style={styles.categoryLeft}>
                  <AppText style={styles.categoryIcon}>{ELDERLY_OPTION.icon}</AppText>
                  <AppText style={styles.categoryLabel}>{ELDERLY_OPTION.label}</AppText>
                </View>
                <View style={styles.counter}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => decrementCount("elderly")}
                  >
                    <Ionicons name="remove" size={20} color={colors.gray900} />
                  </TouchableOpacity>
                  <AppText style={styles.counterValue}>{elderlyCount}</AppText>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() => incrementCount("elderly")}
                  >
                    <Ionicons name="add" size={20} color={colors.gray900} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Child Categories
              <>
                {CHILD_CATEGORIES.map((category) => (
                  <View key={category.id} style={styles.categoryCard}>
                    <View style={styles.categoryLeft}>
                      <AppText style={styles.categoryIcon}>{category.icon}</AppText>
                      <View>
                        <AppText style={styles.categoryLabel}>{category.label}</AppText>
                      </View>
                    </View>
                    <View style={styles.counter}>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => decrementCount(category.id)}
                      >
                        <Ionicons name="remove" size={20} color={colors.gray900} />
                      </TouchableOpacity>
                      <AppText style={styles.counterValue}>{childCounts[category.id]}</AppText>
                      <TouchableOpacity
                        style={styles.counterButton}
                        onPress={() => incrementCount(category.id)}
                      >
                        <Ionicons name="add" size={20} color={colors.gray900} />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Time Selection Section */}
          <View style={styles.section}>
            <AppText style={styles.question}>How long do you the nanny?</AppText>

            <View style={styles.timeSelector}>
              <View style={styles.timeInputContainer}>
                <AppText style={styles.timeValue}>{startTime}</AppText>
              </View>

              <View style={styles.timeSeparator}>
                <View style={styles.separatorLine} />
                <View style={styles.separatorLine} />
              </View>

              <View style={styles.timeInputContainer}>
                <AppText style={styles.timeValue}>{endTime}</AppText>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Next Button */}
        <View style={styles.footer}>
          <AppButton
            label="Next"
            onPress={handleNext}
            disabled={getTotalCount() === 0}
            style={getTotalCount() === 0 ? styles.buttonDisabled : undefined}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  mapContainer: {
    flex: 0.4,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomSheet: {
    flex: 0.6,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  section: {
    marginBottom: 32,
  },
  question: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 16,
  },
  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    marginBottom: 12,
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  categoryAge: {
    fontSize: 12,
    color: colors.gray600,
    marginTop: 2,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  counterButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  counterValue: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    minWidth: 20,
    textAlign: "center",
  },
  timeSelector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  timeInputContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    alignItems: "center",
  },
  timeValue: {
    fontSize: 16,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  timeSeparator: {
    alignItems: "center",
    gap: 4,
  },
  separatorLine: {
    width: 12,
    height: 2,
    backgroundColor: colors.gray400,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});
