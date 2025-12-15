import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import { passwordValidation } from "~/utils/form-validation";

type CreatePasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function CreateNewPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<CreatePasswordFormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: CreatePasswordFormData) => {
    setLoading(true);
    try {
      console.log("New password created");

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to login screen with success message
      router.replace("/(auth)/login" as any);
    } catch (error) {
      console.error("Create password error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={authStyles.scrollView}
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <AuthHeader title="Create new password" />

        {/* Content */}
        <View style={authStyles.content}>
          <AppText style={authStyles.description}>
            Your new password must be different from previously used passwords
          </AppText>

          {/* Form */}
          <View style={authStyles.form}>
            <ControlledTextField
              control={control}
              name="password"
              label="New Password"
              placeholder="Enter new password"
              isPassword
              rules={passwordValidation}
            />

            <ControlledTextField
              control={control}
              name="confirmPassword"
              label="Confirm Password"
              placeholder="Re-enter new password"
              isPassword
              rules={{
                required: "Please confirm your password",
                validate: (value: string) => value === password || "Passwords do not match",
              }}
            />

            {/* Submit Button */}
            <AppButton
              label="Reset Password"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              style={styles.submitButton}
              size="small"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    marginTop: 46,
  },
});
