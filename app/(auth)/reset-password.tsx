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
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import { emailValidation } from "~/utils/form-validation";

type ResetPasswordFormData = {
  email: string;
};

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      console.log("Reset password for:", data.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to verify email screen (without type parameter for password reset)
      router.push("/(auth)/verify-email" as any);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTryPhoneNumber = () => {
    console.log("Try phone number");
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
        <AuthHeader title="Reset password" />

        {/* Content */}
        <View style={authStyles.content}>
          <AppText style={authStyles.description}>
            Enter your email address to receive a verification code to reset your password.
          </AppText>

          {/* Form */}
          <View style={authStyles.form}>
            <ControlledTextField
              control={control}
              name="email"
              label="Email"
              placeholder="Enter email address"
              keyboardType="email-address"
              autoCapitalize="none"
              rules={emailValidation}
            />

            {/* Send Code Button */}
            <AppButton
              label="Send code"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              style={styles.sendButton}
              size="small"
            />
          </View>

          {/* Try Phone Number Link */}
          <TouchableOpacity
            onPress={handleTryPhoneNumber}
            style={authStyles.secondaryLink}
            activeOpacity={0.7}
          >
            <AppText style={authStyles.secondaryLinkText}>Try phone number</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sendButton: {
    marginTop: 56,
  },
});
