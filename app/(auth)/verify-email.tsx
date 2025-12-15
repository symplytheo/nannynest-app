import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";

type VerifyEmailFormData = {
  code: string;
};

export default function VerifyEmailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [loading, setLoading] = useState(false);

  // Determine if this is for registration or password reset
  const isRegistration = params.type === "registration";

  const { control, handleSubmit } = useForm<VerifyEmailFormData>({
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: VerifyEmailFormData) => {
    setLoading(true);
    try {
      console.log("Verification code:", data.code);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate based on type
      if (isRegistration) {
        // After registration verification, go to login
        router.replace("/(auth)/login" as any);
      } else {
        // After password reset verification, go to set new password
        router.push("/(auth)/create-new-password" as any);
      }
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const title = isRegistration ? "Verify Email" : "Enter code";
  const description = isRegistration
    ? "Enter the 6-digit OTP sent to your email."
    : "Enter the 6-digit code sent to your email.";
  const buttonLabel = isRegistration ? "Verify Email" : "Verify";

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
        <AuthHeader title={title} />

        {/* Content */}
        <View style={authStyles.content}>
          <AppText style={authStyles.description}>{description}</AppText>

          {/* Form */}
          <View style={styles.form}>
            <ControlledTextField
              control={control}
              name="code"
              label="Enter code"
              placeholder="000-000"
              keyboardType="number-pad"
              maxLength={6}
              rules={{
                required: "Verification code is required",
                minLength: {
                  value: 6,
                  message: "Code must be 6 digits",
                },
              }}
            />

            {/* Verify Button */}
            <AppButton
              label={buttonLabel}
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              size="small"
              style={styles.verifyButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 56,
  },
  verifyButton: {
    marginTop: 8,
  },
});
