import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChangePasswordFormData = {
  currentPassword: string;
};

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<ChangePasswordFormData>({
    defaultValues: {
      currentPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    setLoading(true);
    try {
      console.log("Verify current password:", data);
      // TODO: API call to verify current password

      // Navigate to new password screen
      router.push("/(main)/change-password-new" as any);
    } catch (error) {
      console.error("Password verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Change Password" />

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
            <AppText style={styles.description}>Enter your current password</AppText>

            <View style={styles.form}>
              <ControlledTextField
                control={control}
                name="currentPassword"
                label="Current Password"
                placeholder="Enter password"
                isPassword
                rules={{ required: "Current password is required" }}
              />
            </View>

            <AppButton
              label="Continue"
              variant="filled"
              color="brand"
              size="small"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
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
    marginBottom: 20,
  },
});
