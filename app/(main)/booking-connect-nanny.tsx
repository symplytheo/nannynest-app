import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

const { width, height } = Dimensions.get("window");

type BookingStage = "finding" | "connecting" | "on-the-way" | "active-order";

export default function BookingConnectNannyScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<BookingStage>("finding");
  const [timeRemaining, setTimeRemaining] = useState({
    hours: 4,
    minutes: 56,
    seconds: 34,
  });

  useEffect(() => {
    // Simulate finding nanny
    const timer1 = setTimeout(() => {
      setStage("connecting");
    }, 3000);

    // Simulate nanny accepting
    const timer2 = setTimeout(() => {
      setStage("on-the-way");
    }, 6000);

    // Simulate active order
    const timer3 = setTimeout(() => {
      setStage("active-order");
    }, 9000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Countdown timer for active order
  useEffect(() => {
    if (stage !== "active-order") return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage]);

  const handleCancelRequest = () => {
    // Show confirmation modal or navigate back
    router.back();
  };

  const handleAddTask = () => {
    // Navigate to add task screen
    console.log("Add task");
  };

  const handleGoToOrder = () => {
    // Navigate to order details
    router.push("/(main)/order-details");
  };

  const formatTime = (value: number) => {
    return value.toString().padStart(2, "0");
  };

  const renderContent = () => {
    switch (stage) {
      case "finding":
        return (
          <View style={styles.contentContainer}>
            <AppText style={styles.title}>Finding nearby nanny</AppText>
            <AppText style={styles.subtitle}>
              We will let you know as soon as we find a near by nanny
            </AppText>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar} />
            </View>

            <View style={styles.addressContainer}>
              <View style={styles.addressIconContainer}>
                <Ionicons name="location" size={16} color={colors.error400} />
              </View>
              <AppText style={styles.addressText}>15b, New life street, Lekki Lagos</AppText>
            </View>
          </View>
        );

      case "connecting":
        return (
          <View style={styles.contentContainer}>
            <AppText style={styles.title}>Connecting with your nanny</AppText>
            <AppText style={styles.subtitle}>
              The nanny will be on their way as soon as they confirm.
            </AppText>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: "55%" }]} />
            </View>

            <View style={styles.nannyCard}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=5" }}
                style={styles.nannyImage}
              />
              <AppText style={styles.nannyName}>Mary Jane</AppText>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.addressIconContainer}>
                <Ionicons name="location" size={16} color={colors.error400} />
              </View>
              <AppText style={styles.addressText}>15b, New life street, Lekki Lagos</AppText>
            </View>
            <TouchableAddTask onPress={handleAddTask} />
          </View>
        );

      case "on-the-way":
        return (
          <View style={styles.contentContainer}>
            <AppText style={styles.title}>Nanny on their way</AppText>
            <AppText style={styles.subtitle}>
              Your nanny is on their way to you. Please complete the checklists below before they
              arrive at your location
            </AppText>

            {/* Progress Indicator */}
            <View style={styles.progressContainer}>
              <View style={[styles.progressBar, { width: "75%" }]} />
            </View>

            <View style={styles.nannyCard}>
              <Image
                source={{ uri: "https://i.pravatar.cc/100?img=5" }}
                style={styles.nannyImage}
              />
              <AppText style={styles.nannyName}>Mary Jane</AppText>
            </View>
            <View style={styles.addressContainer}>
              <View style={styles.addressIconContainer}>
                <Ionicons name="location" size={16} color={colors.error400} />
              </View>
              <AppText style={styles.addressText}>15b, Olajide George street</AppText>
            </View>
            <TouchableAddTask onPress={handleAddTask} />
          </View>
        );

      case "active-order":
        return (
          <View style={styles.activeOrderContainer}>
            <AppText style={styles.activeOrderTitle}>You have an active order</AppText>

            <View style={styles.timeContainer}>
              <View style={{ flex: 1 }}>
                <AppText style={styles.timeLabel}>Time remaining</AppText>
                <AppText style={styles.timeValue}>
                  {formatTime(timeRemaining.hours)}:{formatTime(timeRemaining.minutes)}:
                  {formatTime(timeRemaining.seconds)}
                </AppText>
                <AppText style={styles.timeRange}>08:30AM - 06:00PM</AppText>
              </View>
              <View style={styles.liveFeedContainer}>
                <View style={styles.liveDot} />
                <AppText style={styles.liveFeedText}>Live feed is active</AppText>
              </View>
            </View>

            <AppButton
              size="small"
              label="Go to order"
              variant="filled"
              onPress={handleGoToOrder}
              fullWidth
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
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

      {/* Back Button */}
      {stage === "active-order" && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={colors.gray900} />
        </TouchableOpacity>
      )}

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        {renderContent()}

        {/* Cancel Button (only for non-active order stages) */}
        {stage !== "active-order" && (
          <AppButton
            label="Cancel request"
            variant="outlined"
            color="error"
            onPress={handleCancelRequest}
            fullWidth
          />
        )}
      </View>
    </SafeAreaView>
  );
}

function TouchableAddTask({ onPress }: { onPress: () => void }) {
  return (
    <View style={styles.addTaskContainer}>
      <View style={styles.addTaskIconContainer}>
        <Ionicons name="add-circle" size={20} color={colors.primary400} />
      </View>
      <View style={styles.addTaskTextContainer}>
        <AppText style={styles.addTaskTitle}>Add task</AppText>
        <AppText style={styles.addTaskSubtitle}>
          Create a list of task you want your nanny to do
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray100,
  },
  map: {
    width: width,
    height: height,
  },
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  nannyMarker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.primary400,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  nannyMarkerImage: {
    width: "100%",
    height: "100%",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  contentContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray600,
    lineHeight: 20,
    marginBottom: 20,
  },
  nannyCard: {
    alignItems: "center",
    marginBottom: 20,
  },
  nannyImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 8,
  },
  nannyName: {
    fontSize: 16,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  addressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.gray50,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addressIconContainer: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
  },
  addTaskContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.primary50,
    padding: 12,
    borderRadius: 8,
  },
  addTaskIconContainer: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  addTaskTextContainer: {
    flex: 1,
  },
  addTaskTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
    marginBottom: 2,
  },
  addTaskSubtitle: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.primary400,
  },
  progressContainer: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: colors.primary400,
    width: "40%",
  },
  // Active Order Styles
  activeOrderContainer: {
    marginBottom: 24,
  },
  warningBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  warningIconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.error500,
  },
  warningCloseButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  activeOrderTitle: {
    fontSize: 24,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 24,
    textAlign: "center",
  },
  timeContainer: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 12,
    padding: 16,
    backgroundColor: colors.gray50,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  timeLabel: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray600,
    marginBottom: 8,
  },
  timeValue: {
    fontSize: 32,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
    letterSpacing: 1,
    marginBottom: 4,
  },
  timeRange: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray600,
  },
  liveFeedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.success400 + "20",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success400,
  },
  liveFeedText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.success400,
  },
});
