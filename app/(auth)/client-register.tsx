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
import { ControlledPhoneInput } from "~/components/form";
import ControlledTextField from "~/components/form/controlled-textfield";
import { emailValidation, passwordValidation } from "~/utils/form-validation";

type RegisterFormData = {
  email: string;
  phone: string;
  password: string;
};

export default function ClientRegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormData>({
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    try {
      console.log("Register data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate to verify email screen with type parameter
      router.push("/(auth)/verify-email?type=registration" as any);
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    console.log("Google signup");
  };

  const handleAppleSignup = async () => {
    console.log("Apple signup");
  };

  const handleFacebookSignup = async () => {
    console.log("Facebook signup");
  };

  const handleSignIn = () => {
    router.push("/(auth)/login" as any);
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
        <AuthHeader title="Create an Account" />

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

            <ControlledPhoneInput
              control={control}
              name="phone"
              label="Phone"
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
              placeholder="Create your password"
              isPassword
              rules={passwordValidation}
            />

            {/* Create Account Button */}
            <AppButton
              label="Create Account"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              fullWidth
              size="small"
              style={styles.createButton}
            />
          </View>

          {/* Divider */}
          <View style={authStyles.divider}>
            <View style={authStyles.dividerLine} />
            <AppText style={authStyles.dividerText}>or sign up with</AppText>
            <View style={authStyles.dividerLine} />
          </View>

          {/* Social Login Buttons */}
          <SocialLoginButtons
            onGooglePress={handleGoogleSignup}
            onApplePress={handleAppleSignup}
            onFacebookPress={handleFacebookSignup}
          />

          {/* Footer */}
          <View style={authStyles.footer}>
            <AppText style={authStyles.footerText}>Already have an account? </AppText>
            <TouchableOpacity onPress={handleSignIn} activeOpacity={0.7}>
              <AppText style={authStyles.footerLink}>Sign in</AppText>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <AppText style={styles.termsText}>
              By clicking on create account you agree to{" "}
              <AppText style={styles.termsLink}>Term of Service</AppText> and{" "}
              <AppText style={styles.termsLink}>Privacy Policy</AppText>
            </AppText>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 12,
  },
  termsContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "flex-end",
  },
  termsText: {
    fontSize: 12,
    fontWeight: "400" as any,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 18,
  },
  termsLink: {
    fontSize: 12,
    fontWeight: "600" as any,
    color: "#EC4899",
  },
});
