import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

const CODE_LENGTH = 4;

export default function VerifyResetScreen() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleCodeChange = (text: string, index: number) => {
    // Only allow numbers
    if (text && !/^\d+$/.test(text)) return;

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < CODE_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const verificationCode = code.join("");

    if (verificationCode.length !== CODE_LENGTH) {
      return;
    }

    setLoading(true);
    try {
      // TODO: Implement verification API call
      console.log("Verification code:", verificationCode);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Navigate to create new password screen
      router.push("/(auth)/create-new-password" as any);
    } catch (error) {
      console.error("Verification error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = () => {
    setCode(Array(CODE_LENGTH).fill(""));
    inputRefs.current[0]?.focus();
    // TODO: Implement resend code API call
  };

  const isCodeComplete = code.every((digit) => digit !== "");

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
            <AppText style={styles.icon}>🔒</AppText>
          </View>
          <AppText style={styles.title}>Verify Your Email</AppText>
          <AppText style={styles.subtitle}>
            Enter the 4-digit code we sent to your email address
          </AppText>
        </View>

        {/* Code Input */}
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputRefs.current[index] = ref;
              }}
              style={[styles.codeInput, digit && styles.codeInputFilled]}
              value={digit}
              onChangeText={(text) => handleCodeChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
            />
          ))}
        </View>

        {/* Verify Button */}
        <AppButton
          label="Verify Code"
          variant="filled"
          color="brand"
          onPress={handleVerify}
          loading={loading}
          disabled={loading || !isCodeComplete}
          fullWidth
          style={styles.verifyButton}
        />

        {/* Resend Code */}
        <View style={styles.resendContainer}>
          <AppText style={styles.resendText}>{`Didn't receive the code?`} </AppText>
          <TouchableOpacity onPress={handleResendCode} activeOpacity={0.7}>
            <AppText style={styles.resendLink}>Resend</AppText>
          </TouchableOpacity>
        </View>

        {/* Timer (Optional) */}
        <View style={styles.timerContainer}>
          <AppText style={styles.timerText}>Code expires in 10:00</AppText>
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
  codeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    marginBottom: 32,
  },
  codeInput: {
    width: 64,
    height: 64,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.gray200,
    backgroundColor: colors.white,
    fontSize: 24,
    fontWeight: "600",
    color: colors.gray900,
    textAlign: "center",
  },
  codeInputFilled: {
    borderColor: colors.primary400,
    backgroundColor: colors.primary50,
  },
  verifyButton: {
    marginBottom: 24,
  },
  resendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  resendText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray600,
  },
  resendLink: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary400,
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.gray500,
  },
});
