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
import { typography } from "~/theme";
import colors from "~/theme/colors";
import { emailValidation } from "~/utils/form-validation";

type RoleSelectionLoginFormData = {
  email: string;
  password: string;
  role: "client" | "nanny";
};

export default function RoleSelectionLoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"client" | "nanny">("client");

  const { control, handleSubmit } = useForm<RoleSelectionLoginFormData>({
    defaultValues: {
      email: "",
      password: "",
      role: "client",
    },
  });

  const onSubmit = async (data: RoleSelectionLoginFormData) => {
    setLoading(true);
    try {
      const loginData = { ...data, role: selectedRole };
      console.log("Login data:", loginData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate based on role
      if (selectedRole === "nanny") {
        router.replace("/(nanny)/(tabs)" as any);
      } else {
        router.replace("/(main)/(tabs)" as any);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    // Both roles use the same register screen for now
    // In production, you can differentiate by passing role as param
    router.push("/(auth)/register" as any);
  };

  const handleForgotPassword = () => {
    router.push("/(auth)/reset-password" as any);
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
          <AppText style={styles.title}>Welcome Back</AppText>
          <AppText style={styles.subtitle}>Select your role to continue</AppText>
        </View>

        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[styles.roleCard, selectedRole === "client" && styles.roleCardActive]}
            onPress={() => setSelectedRole("client")}
            activeOpacity={0.7}
          >
            <View style={styles.roleIcon}>
              <AppText style={styles.roleEmoji}>👨‍👩‍👧</AppText>
            </View>
            <AppText style={styles.roleTitle}>I&apos;m a client</AppText>
            <AppText style={styles.roleDescription}>Find and book trusted nannies</AppText>
            {selectedRole === "client" && (
              <View style={styles.selectedBadge}>
                <AppText style={styles.selectedCheck}>✓</AppText>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, selectedRole === "nanny" && styles.roleCardActive]}
            onPress={() => setSelectedRole("nanny")}
            activeOpacity={0.7}
          >
            <View style={styles.roleIcon}>
              <AppText style={styles.roleEmoji}>👩‍🍼</AppText>
            </View>
            <AppText style={styles.roleTitle}>I&apos;m a Nanny</AppText>
            <AppText style={styles.roleDescription}>Offer childcare services</AppText>
            {selectedRole === "nanny" && (
              <View style={styles.selectedBadge}>
                <AppText style={styles.selectedCheck}>✓</AppText>
              </View>
            )}
          </TouchableOpacity>
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

          <View>
            <ControlledTextField
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              isPassword
              rules={{ required: "Password is required" }}
            />

            {/* Forgot Password Link */}
            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotPasswordContainer}
              activeOpacity={0.7}
            >
              <AppText style={styles.forgotPasswordText}>Forgot Password?</AppText>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <AppButton
            label="Log In"
            variant="filled"
            color="brand"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.loginButton}
          />
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText style={styles.footerText}>{`Don't have an account? `}</AppText>
          <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
            <AppText style={styles.footerLink}>Sign Up</AppText>
          </TouchableOpacity>
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
    marginBottom: 32,
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
  roleContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  roleCard: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.gray50,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray200,
    alignItems: "center",
    position: "relative",
  },
  roleCardActive: {
    backgroundColor: colors.primary100,
    borderColor: colors.primary400,
  },
  roleIcon: {
    marginBottom: 12,
  },
  roleEmoji: {
    fontSize: 40,
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
    textAlign: "center",
  },
  roleDescription: {
    fontSize: 12,
    color: colors.gray600,
    textAlign: "center",
  },
  selectedBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCheck: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },
  form: {
    gap: 20,
  },
  forgotPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: 8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primary400,
  },
  loginButton: {
    marginTop: 8,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  footerText: {
    ...typography.caption,
    color: colors.gray600,
  },
  footerLink: {
    color: colors.primary400,
    fontWeight: "600",
    ...typography.caption,
  },
});
