import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";

type BookingFormData = {
  date: string;
  startTime: string;
  endTime: string;
  numberOfChildren: string;
  specialInstructions: string;
};

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { nannyId } = useLocalSearchParams();

  const { control, handleSubmit } = useForm<BookingFormData>({
    defaultValues: {
      date: "Nov 25, 2025",
      startTime: "10:00 AM",
      endTime: "2:00 PM",
      numberOfChildren: "1",
      specialInstructions: "",
    },
  });

  // Mock nanny data
  const nanny = {
    name: "Sarah Johnson",
    hourlyRate: 25,
  };

  // Simple duration calculation (mock - in real app, parse time strings properly)
  const duration = 4; // hours
  const subtotal = duration * nanny.hourlyRate;
  const serviceFee = subtotal * 0.1;
  const total = subtotal + serviceFee;

  const onSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data);
    router.push(`/(main)/booking-confirmation?nannyId=${nannyId}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Booking Details</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Nanny Info */}
        <View style={styles.nannyCard}>
          <View style={styles.avatarPlaceholder}>
            <AppText style={styles.avatarText}>SJ</AppText>
          </View>
          <View style={styles.nannyInfo}>
            <AppText style={styles.nannyName}>{nanny.name}</AppText>
            <AppText style={styles.nannyRate}>${nanny.hourlyRate}/hour</AppText>
          </View>
        </View>

        {/* Booking Form */}
        <View style={styles.form}>
          {/* Date Selection */}
          <View>
            <AppText style={styles.inputLabel}>Date</AppText>
            <TouchableOpacity style={styles.dateTimeInput}>
              <View style={styles.dateTimeLeft}>
                <Ionicons name="calendar-outline" size={20} color={colors.primary400} />
                <AppText style={styles.dateTimeText}>Nov 25, 2025</AppText>
              </View>
              <Ionicons name="chevron-down" size={20} color={colors.gray400} />
            </TouchableOpacity>
          </View>

          {/* Time Selection */}
          <View style={styles.timeRow}>
            <View style={{ flex: 1 }}>
              <AppText style={styles.inputLabel}>Start Time</AppText>
              <TouchableOpacity style={styles.dateTimeInput}>
                <View style={styles.dateTimeLeft}>
                  <Ionicons name="time-outline" size={20} color={colors.primary400} />
                  <AppText style={styles.dateTimeText}>10:00 AM</AppText>
                </View>
                <Ionicons name="chevron-down" size={20} color={colors.gray400} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
              <AppText style={styles.inputLabel}>End Time</AppText>
              <TouchableOpacity style={styles.dateTimeInput}>
                <View style={styles.dateTimeLeft}>
                  <Ionicons name="time-outline" size={20} color={colors.primary400} />
                  <AppText style={styles.dateTimeText}>2:00 PM</AppText>
                </View>
                <Ionicons name="chevron-down" size={20} color={colors.gray400} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Number of Children */}
          <ControlledTextField
            control={control}
            name="numberOfChildren"
            label="Number of Children"
            placeholder="Enter number"
            keyboardType="number-pad"
            rules={{ required: "Number of children is required" }}
          />

          {/* Special Instructions */}
          <ControlledTextField
            control={control}
            name="specialInstructions"
            label="Special Instructions (Optional)"
            placeholder="Any special requirements or notes..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>

        {/* Price Breakdown */}
        <View style={styles.priceCard}>
          <AppText style={styles.priceCardTitle}>Price Details</AppText>

          <View style={styles.priceRow}>
            <AppText style={styles.priceLabel}>
              ${nanny.hourlyRate} × {duration.toFixed(1)} hours
            </AppText>
            <AppText style={styles.priceValue}>${subtotal.toFixed(2)}</AppText>
          </View>

          <View style={styles.priceRow}>
            <AppText style={styles.priceLabel}>Service fee (10%)</AppText>
            <AppText style={styles.priceValue}>${serviceFee.toFixed(2)}</AppText>
          </View>

          <View style={styles.priceDivider} />

          <View style={styles.priceRow}>
            <AppText style={styles.totalLabel}>Total</AppText>
            <AppText style={styles.totalValue}>${total.toFixed(2)}</AppText>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <View style={styles.totalContainer}>
          <AppText style={styles.totalBottomLabel}>Total</AppText>
          <AppText style={styles.totalBottomValue}>${total.toFixed(2)}</AppText>
        </View>
        <AppButton
          label="Continue"
          variant="filled"
          color="brand"
          onPress={handleSubmit(onSubmit)}
          style={styles.continueButton}
        />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  scrollView: {
    flex: 1,
  },
  nannyCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: colors.gray50,
    borderRadius: 16,
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary600,
  },
  nannyInfo: {
    flex: 1,
  },
  nannyName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  nannyRate: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary600,
  },
  form: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    marginBottom: 8,
  },
  dateTimeInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  dateTimeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dateTimeText: {
    fontSize: 16,
    color: colors.gray900,
    fontWeight: "500",
  },
  dateTimeIcon: {
    fontSize: 20,
  },
  timeRow: {
    flexDirection: "row",
    gap: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  priceCard: {
    marginHorizontal: 24,
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.gray50,
    borderRadius: 16,
  },
  priceCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: colors.gray700,
  },
  priceValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
  },
  priceDivider: {
    height: 1,
    backgroundColor: colors.gray300,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary600,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  totalContainer: {
    flex: 1,
  },
  totalBottomLabel: {
    fontSize: 14,
    color: colors.gray600,
    marginBottom: 2,
  },
  totalBottomValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary600,
  },
  continueButton: {
    flex: 1,
    marginLeft: 16,
  },
});
