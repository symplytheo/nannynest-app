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
import { validateConfirmPassword } from "~/utils/form-validation";

type NewPasswordFormData = {
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePasswordNewScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<NewPasswordFormData>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmit = async (data: NewPasswordFormData) => {
    setLoading(true);
    try {
      console.log("Change password:", data);
      // TODO: API call to change password

      // Redirect to login
      router.replace("/(auth)/login" as any);
    } catch (error) {
      console.error("Password change error:", error);
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
            <AppText style={styles.description}>You will be redirected to log in again.</AppText>

            <View style={styles.form}>
              <ControlledTextField
                control={control}
                name="newPassword"
                label="New Password"
                placeholder="Enter new password"
                isPassword
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                }}
              />

              <ControlledTextField
                control={control}
                name="confirmPassword"
                label="Re-enter Password"
                placeholder="Enter new password again"
                isPassword
                rules={{
                  required: "Please confirm your password",
                  validate: validateConfirmPassword(newPassword),
                }}
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
    gap: 5,
    marginBottom: 20,
  },
});
