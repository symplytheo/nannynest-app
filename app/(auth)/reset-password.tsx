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
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";
import { emailValidation } from "~/utils/form-validation";

type ResetPasswordFormData = {
  email: string;
};

export default function ResetPasswordScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { control, handleSubmit, getValues } = useForm<ResetPasswordFormData>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setLoading(true);
    try {
      // TODO: Implement password reset API call
      console.log("Reset password for:", data.email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setEmailSent(true);
    } catch (error) {
      console.error("Reset password error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.back();
  };

  const handleResendEmail = () => {
    const email = getValues("email");
    if (email) {
      onSubmit({ email });
    }
  };

  const handleVerify = () => {
    router.push("/(auth)/verify-reset" as any);
  };

  if (emailSent) {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success Header */}
          <View style={styles.successHeader}>
            <View style={styles.iconContainer}>
              <AppText style={styles.icon}>📧</AppText>
            </View>
            <AppText style={styles.title}>Check Your Email</AppText>
            <AppText style={styles.subtitle}>{`We've sent a password reset link to`}</AppText>
            <AppText style={styles.email}>{getValues("email")}</AppText>
          </View>

          {/* Instructions */}
          <View style={styles.instructionsContainer}>
            <AppText style={styles.instructionsText}>
              {`Click the link in the email to reset your password. If you don't see the email, check
              your spam folder.`}
            </AppText>
          </View>

          {/* Buttons */}
          <View style={styles.buttonGroup}>
            <AppButton
              label="Open Email App"
              variant="filled"
              color="brand"
              onPress={handleVerify}
              fullWidth
            />

            <AppButton
              label="Resend Email"
              variant="outlined"
              color="brand"
              onPress={handleResendEmail}
              fullWidth
              style={styles.resendButton}
            />
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
              <AppText style={styles.backText}>← Back to Log In</AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBackToLogin}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <AppText style={styles.backButtonText}>←</AppText>
          </TouchableOpacity>
          <AppText style={styles.title}>Reset Password</AppText>
          <AppText style={styles.subtitle}>
            {`Enter your email address and we'll send you a link to reset your password`}
          </AppText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <ControlledTextField
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            rules={emailValidation}
          />

          {/* Submit Button */}
          <AppButton
            label="Send Reset Link"
            variant="filled"
            color="brand"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.submitButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText style={styles.footerText}>
            Remember your password?{" "}
            <TouchableOpacity onPress={handleBackToLogin} activeOpacity={0.7}>
              <AppText style={styles.footerLink}>Log In</AppText>
            </TouchableOpacity>
          </AppText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    marginBottom: 16,
    marginLeft: -8,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.gray900,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray600,
    lineHeight: 24,
  },
  form: {
    gap: 24,
  },
  submitButton: {
    marginTop: 8,
  },
  successHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    fontSize: 40,
  },
  email: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
    marginTop: 4,
  },
  instructionsContainer: {
    backgroundColor: colors.gray50,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  instructionsText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray600,
    lineHeight: 20,
    textAlign: "center",
  },
  buttonGroup: {
    gap: 12,
  },
  resendButton: {
    marginTop: 0,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray600,
  },
  footerLink: {
    color: colors.primary400,
    fontWeight: "600",
  },
  backText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary400,
  },
});
