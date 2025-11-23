import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledPhoneInput from "~/components/form/controlled-phone-input";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";

type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  experience: string;
};

export default function KYCPersonalInfoScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<PersonalInfoFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      experience: "",
    },
  });

  const onSubmit = async (data: PersonalInfoFormData) => {
    setLoading(true);
    try {
      console.log("Personal info:", data);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      router.push("/(nanny)/kyc-documents" as any);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AppText style={styles.backButtonText}>‹</AppText>
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Personal Information</AppText>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "33%" }]} />
        </View>
        <AppText style={styles.progressText}>Step 1 of 3</AppText>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.form}>
            <View style={styles.nameRow}>
              <View style={{ flex: 1 }}>
                <ControlledTextField
                  control={control}
                  name="firstName"
                  label="First Name"
                  placeholder="Enter first name"
                  rules={{ required: "First name is required" }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ControlledTextField
                  control={control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Enter last name"
                  rules={{ required: "Last name is required" }}
                />
              </View>
            </View>

            <ControlledTextField
              control={control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="MM/DD/YYYY"
              rules={{ required: "Date of birth is required" }}
            />

            <ControlledPhoneInput
              control={control}
              name="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              defaultCountryCode="+234"
              rules={{ required: "Phone number is required" }}
            />

            <ControlledTextField
              control={control}
              name="address"
              label="Street Address"
              placeholder="Enter street address"
              rules={{ required: "Address is required" }}
            />

            <View style={styles.row}>
              <View style={{ flex: 2 }}>
                <ControlledTextField
                  control={control}
                  name="city"
                  label="City"
                  placeholder="Enter city"
                  rules={{ required: "City is required" }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <ControlledTextField
                  control={control}
                  name="state"
                  label="State"
                  placeholder="State"
                  rules={{ required: "State is required" }}
                />
              </View>
            </View>

            <ControlledTextField
              control={control}
              name="zipCode"
              label="ZIP Code"
              placeholder="Enter ZIP code"
              keyboardType="number-pad"
              rules={{ required: "ZIP code is required" }}
            />

            <ControlledTextField
              control={control}
              name="experience"
              label="Years of Experience"
              placeholder="e.g. 5"
              keyboardType="number-pad"
              rules={{ required: "Experience is required" }}
            />
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <AppButton
          label="Continue"
          variant="filled"
          color="brand"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
          disabled={loading}
          fullWidth
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
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 32,
    color: colors.gray900,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary400,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  form: {
    gap: 20,
  },
  nameRow: {
    flexDirection: "row",
    gap: 12,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  bottomBar: {
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
});
