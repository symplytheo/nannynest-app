import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";
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
      // TODO: Implement create new password API call
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
          <View style={styles.iconContainer}>
            <AppText style={styles.icon}>🔐</AppText>
          </View>
          <AppText style={styles.title}>Create New Password</AppText>
          <AppText style={styles.subtitle}>
            Your new password must be different from previously used passwords
          </AppText>
        </View>

        {/* Form */}
        <View style={styles.form}>
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

          {/* Password Requirements */}
          <View style={styles.requirementsContainer}>
            <AppText style={styles.requirementsTitle}>Password must contain:</AppText>
            <View style={styles.requirementsList}>
              <RequirementItem text="At least 8 characters" met={password.length >= 8} />
              <RequirementItem text="One uppercase letter" met={/[A-Z]/.test(password)} />
              <RequirementItem text="One lowercase letter" met={/[a-z]/.test(password)} />
              <RequirementItem text="One number" met={/\d/.test(password)} />
            </View>
          </View>

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
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const RequirementItem = ({ text, met }: { text: string; met: boolean }) => (
  <View style={styles.requirementItem}>
    <View style={[styles.checkmark, met && styles.checkmarkMet]}>
      <AppText style={[styles.checkmarkText, met && styles.checkmarkTextMet]}>
        {met ? "✓" : ""}
      </AppText>
    </View>
    <AppText style={[styles.requirementText, met && styles.requirementTextMet]}>{text}</AppText>
  </View>
);

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
    alignItems: "center",
    marginBottom: 40,
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.gray600,
    lineHeight: 24,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  form: {
    gap: 20,
  },
  requirementsContainer: {
    backgroundColor: colors.gray50,
    padding: 16,
    borderRadius: 12,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray700,
    marginBottom: 12,
  },
  requirementsList: {
    gap: 8,
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.gray300,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkMet: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  checkmarkText: {
    fontSize: 12,
    color: colors.white,
  },
  checkmarkTextMet: {
    color: colors.white,
  },
  requirementText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray600,
  },
  requirementTextMet: {
    color: colors.gray700,
  },
  submitButton: {
    marginTop: 12,
  },
});
