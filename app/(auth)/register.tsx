import { Ionicons } from "@expo/vector-icons";
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
import ControlledPhoneInput from "~/components/form/controlled-phone-input";
import ControlledTextField from "~/components/form/controlled-textfield";
import { typography } from "~/theme";
import colors from "~/theme/colors";
import { emailValidation, passwordValidation } from "~/utils/form-validation";

type RegisterFormData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
};

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      // TODO: Implement registration API call
      console.log("Registration data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to main app (client home) after successful registration
      router.replace("/(main)/(tabs)");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      console.log("Google signup");
      // TODO: Implement Google signup
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/(main)/(tabs)");
    } catch (error) {
      console.error("Google signup error:", error);
    }
  };

  const handleFacebookSignup = async () => {
    try {
      console.log("Facebook signup");
      // TODO: Implement Facebook signup
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace("/(main)/(tabs)");
    } catch (error) {
      console.error("Facebook signup error:", error);
    }
  };

  const handleLogin = () => {
    router.push("/(auth)/login" as any);
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
          <AppText style={styles.title}>Create Account</AppText>
          <AppText style={styles.subtitle}>Sign up to get started with NannyNest</AppText>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <ControlledTextField
            control={control}
            name="fullName"
            label="Full Name"
            placeholder="Enter your full name"
            rules={{
              required: "Full name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            }}
          />

          <ControlledTextField
            control={control}
            name="email"
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            rules={emailValidation}
          />

          <ControlledPhoneInput
            control={control}
            name="phoneNumber"
            label="Phone Number"
            placeholder="Enter phone number"
            defaultCountryCode="+234"
            rules={{
              required: "Phone number is required",
              pattern: {
                value: /^\+?[1-9]\d{1,14}$/,
                message: "Invalid phone number format",
              },
            }}
          />

          <ControlledTextField
            control={control}
            name="password"
            label="Password"
            placeholder="Create a password"
            isPassword
            rules={passwordValidation}
          />

          {/* Terms and Conditions */}
          <View style={styles.termsContainer}>
            <AppText style={styles.termsText}>By signing up, you agree to our </AppText>
            <AppText style={styles.termsLink}>Terms & Conditions</AppText>
            <AppText style={styles.termsLink}> and </AppText>
            <AppText style={styles.termsLink}>Privacy Policy</AppText>
          </View>

          {/* Register Button */}
          <AppButton
            label="Create Account"
            variant="filled"
            color="brand"
            onPress={handleSubmit(onSubmit)}
            loading={loading}
            disabled={loading}
            fullWidth
            style={styles.registerButton}
          />

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <AppText style={styles.dividerText}>Or continue with</AppText>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleGoogleSignup}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-google" size={24} color={colors.error} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={handleFacebookSignup}
              activeOpacity={0.7}
            >
              <Ionicons name="logo-facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText style={styles.footerText}>Already have an account? </AppText>
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
            <AppText style={styles.footerLink}>Log In</AppText>
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
  form: {
    gap: 20,
  },
  termsContainer: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  termsText: {
    color: colors.gray600,
    lineHeight: 20,
    textAlign: "center",
    ...typography.caption,
  },
  termsLink: {
    color: colors.primary400,
    ...typography.caption,
    fontWeight: "500",
  },
  registerButton: {
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray500,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.gray200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
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
