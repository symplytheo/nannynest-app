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
import { AuthHeader, SocialLoginButtons } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
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
      console.log("Login data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate based on email (temporary logic)
      if (data.email.toLowerCase().includes("client")) {
        router.replace("/(main)/(tabs)");
      } else {
        router.replace("/(nanny)/(tabs)");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google login");
  };

  const handleAppleLogin = async () => {
    console.log("Apple login");
  };

  const handleFacebookLogin = async () => {
    console.log("Facebook login");
  };

  const handleSignUp = () => {
    router.push("/(auth)/onboarding" as any);
  };

  const handleResetPassword = () => {
    router.push("/(auth)/reset-password" as any);
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
        <AuthHeader title="Log in your account" />

        {/* Form */}
        <View style={authStyles.content}>
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

            <View>
              <ControlledTextField
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                isPassword
                rules={{ required: "Password is required" }}
              />

              {/* Reset Password Link */}
              <TouchableOpacity
                onPress={handleResetPassword}
                style={styles.resetPasswordContainer}
                activeOpacity={0.7}
              >
                <AppText style={authStyles.secondaryLinkText}>Reset password</AppText>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <AppButton
              label="Log in"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              style={styles.loginButton}
              size="small"
            />
          </View>

          {/* Divider */}
          <View style={authStyles.divider}>
            <View style={authStyles.dividerLine} />
            <AppText style={authStyles.dividerText}>or sign in with</AppText>
            <View style={authStyles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <SocialLoginButtons
            onGooglePress={handleGoogleLogin}
            onApplePress={handleAppleLogin}
            onFacebookPress={handleFacebookLogin}
          />

          {/* Footer */}
          <View style={authStyles.footer}>
            <AppText style={authStyles.footerText}>Don&apos;t have an account? </AppText>
            <TouchableOpacity onPress={handleSignUp} activeOpacity={0.7}>
              <AppText style={authStyles.footerLink}>Sign up</AppText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  resetPasswordContainer: {
    alignSelf: "flex-end",
    marginTop: -10,
  },
  loginButton: {
    marginTop: 32,
  },
});
