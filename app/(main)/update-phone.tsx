import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledPhoneInput from "~/components/form/controlled-phone-input";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type UpdatePhoneFormData = {
  phone: string;
};

export default function UpdatePhoneScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<UpdatePhoneFormData>({
    defaultValues: {
      phone: "+234449492948",
    },
  });

  const onSubmit = async (data: UpdatePhoneFormData) => {
    console.log("Update phone:", data);
    // TODO: API call to send OTP
    // TODO: Navigate to OTP verification screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Update Phone" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <AppText style={styles.description}>
              We&apos;ll send you a verification code to update your number.
            </AppText>

            <View style={styles.form}>
              <ControlledPhoneInput
                control={control}
                name="phone"
                label="Phone"
                rules={{ required: "Phone number is required" }}
              />
            </View>

            <AppButton
              label="Save"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              fullWidth
              size="small"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  description: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    marginBottom: 8,
  },
});
