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

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // TODO: Implement login API call
      console.log("Login data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to main app
      router.replace("/");
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
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
          <AppText style={styles.subtitle}>Log in to continue to NannyNest</AppText>
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
              rules={{
                required: "Password is required",
              }}
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

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <AppText style={styles.dividerText}>Or continue with</AppText>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <AppText style={styles.socialText}>G</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AppText style={styles.socialText}>f</AppText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <AppText style={styles.socialText}>🍎</AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <AppText style={styles.footerText}>
            {`Don't have an account? `}
            <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
              <AppText style={styles.footerLink}>Sign Up</AppText>
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
    paddingTop: 80,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 40,
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
  },
  socialText: {
    fontSize: 24,
    fontWeight: "600",
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
});
