import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import { colors, typography } from "~/theme";

export default function VerifyEmailScreen() {
  const router = useRouter();

  // Track completed steps
  const [completedSteps] = useState<number[]>([1]);

  const handleProceed = () => {
    // Navigate to the next step or handle proceed action
  };

  const handleStepAction = (stepId: number, path: string) => {
    // Navigate to the step's path
    // router.push(path as any);
    router.push(path as any);
  };

  const CHECKLISTS = [
    {
      id: 1,
      title: "Complete Profile",
      subtitle: "",
      path: "/(nanny)/onboarding/complete-profile",
    },
    {
      id: 2,
      title: "License & Certifications",
      subtitle: "",
      path: "/(nanny)/onboarding/upload-licenses",
    },
    {
      id: 3,
      title: "Face Verification",
      subtitle: "",
      path: "/(nanny)/onboarding/face-verification",
    },
  ];

  const allCompleted = completedSteps.length === CHECKLISTS.length;

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
        <AuthHeader title="Nanny Onboarding Checklist" />

        {/* Content */}
        <View style={authStyles.content}>
          <AppText style={authStyles.description}>
            Please complete the following steps to finish your nanny profile and start accepting
            jobs:
          </AppText>

          {/* Form */}
          <View style={styles.form}>
            {/* Checklist Items */}
            <View style={styles.checklistContainer}>
              {CHECKLISTS.map((item) => {
                const isCompleted = completedSteps.includes(item.id);
                return (
                  <View key={item.id} style={styles.checklistItem}>
                    {/* Step indicator */}
                    <View
                      style={[styles.stepIndicator, isCompleted && styles.stepIndicatorCompleted]}
                    >
                      {isCompleted ? (
                        <Ionicons name="checkmark" size={24} color={colors.white} />
                      ) : (
                        <AppText style={styles.stepNumber}>{item.id}</AppText>
                      )}
                    </View>

                    {/* Title */}
                    <View style={styles.titleContainer}>
                      <AppText style={styles.checklistTitle}>{item.title}</AppText>
                    </View>

                    {/* Action Button */}
                    <AppButton
                      size="small"
                      variant="outlined"
                      label={isCompleted ? "View" : "Go to"}
                      onPress={() => handleStepAction(item.id, item.path)}
                    />
                  </View>
                );
              })}
            </View>

            {/* Verify Button */}
            <AppButton
              label={"Proceed"}
              variant="filled"
              color="brand"
              onPress={handleProceed}
              disabled={!allCompleted}
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
    marginTop: 28,
  },
  verifyButton: {
    marginTop: 8,
  },
  checklistContainer: {
    gap: 32,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  stepIndicator: {
    width: 36,
    height: 36,
    borderRadius: 24,
    backgroundColor: colors.gray200,
    justifyContent: "center",
    alignItems: "center",
  },
  stepIndicatorCompleted: {
    backgroundColor: colors.success,
  },
  stepNumber: {
    fontSize: 14,
    ...typography.bodySmall,
  },
  checkmark: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  titleContainer: {
    flex: 1,
  },
  checklistTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray900,
  },
  actionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: colors.gray100,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.gray700,
  },
});
