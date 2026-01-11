import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AppButton } from "~/components/common";
import AppText from "~/components/common/app-text";
import { colors, typography } from "~/theme";

type ChecklistStatus = "pending" | "completed";

type StatusType = "submitted" | "invitation-sent" | "ready";

export default function SubmissionStatusScreen() {
  const router = useRouter();
  const [status] = useState<StatusType>("ready"); // Change this to see different states

  const getStatusConfig = () => {
    switch (status) {
      case "submitted":
        return {
          icon: "checkmark" as const,
          iconBg: colors.success75,
          iconColor: colors.success700,
          title: "Application Submitted",
          description:
            "Your application have been received and under review. We'll notify you if you are qualified. Always check your email and notification",
          checklist: [
            { id: 1, label: "Application submission", status: "completed" as ChecklistStatus },
            { id: 2, label: "Invitation for Training", status: "pending" as ChecklistStatus },
            { id: 3, label: "Ready to work", status: "pending" as ChecklistStatus },
          ],
          buttonLabel: "Turn on notification",
          buttonVariant: "outlined" as const,
          showSecondButton: false,
        };
      case "invitation-sent":
        return {
          icon: "paper-plane" as const,
          iconBg: colors.success75,
          iconColor: colors.success700,
          title: "Training Invitation Sent",
          description:
            "Your training invitation details have been sent to your email address. Please check your inbox and attend the training to get started",
          checklist: [
            { id: 1, label: "Application submission", status: "completed" as ChecklistStatus },
            { id: 2, label: "Invitation for Training", status: "completed" as ChecklistStatus },
            { id: 3, label: "Ready to work", status: "pending" as ChecklistStatus },
          ],
          buttonLabel: "Turn on notification",
          buttonVariant: "outlined" as const,
          showSecondButton: false,
        };
      case "ready":
        return {
          icon: "home" as const,
          iconBg: colors.success75,
          iconColor: colors.success700,
          title: "You're In",
          description:
            "You passed your training and you are now ready to take your first job. Go online now!",
          checklist: [
            { id: 1, label: "Application submission", status: "completed" as ChecklistStatus },
            { id: 2, label: "Invitation for Training", status: "completed" as ChecklistStatus },
            { id: 3, label: "Ready to work", status: "completed" as ChecklistStatus },
          ],
          buttonLabel: "Go home",
          buttonVariant: "filled" as const,
          showSecondButton: true,
        };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
        <Ionicons name="close" size={24} color={colors.gray900} />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: config.iconBg }]}>
          <Ionicons name={config.icon} size={32} color={config.iconColor} />
        </View>

        {/* Title */}
        <AppText style={styles.title}>{config.title}</AppText>

        {/* Description */}
        <AppText style={styles.description}>{config.description}</AppText>

        {/* Checklist */}
        <View style={styles.checklist}>
          {config.checklist.map((item) => (
            <View key={item.id} style={styles.checklistItem}>
              <View
                style={[
                  styles.checklistIcon,
                  item.status === "completed"
                    ? styles.checklistIconCompleted
                    : styles.checklistIconPending,
                ]}
              >
                {item.status === "completed" ? (
                  <Ionicons name="checkmark" size={16} color={colors.white} />
                ) : (
                  <AppText style={styles.checklistNumber}>{item.id}</AppText>
                )}
              </View>
              <AppText style={styles.checklistLabel}>{item.label}</AppText>
            </View>
          ))}
        </View>

        {/* Button */}
        <AppButton
          label={config.buttonLabel}
          variant={config.buttonVariant}
          onPress={() => {
            if (status === "ready") {
              router.push("/(nanny)/(tabs)");
            } else {
              // Handle notification settings
            }
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  closeButton: {
    position: "absolute",
    top: 60,
    left: 24,
    zIndex: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 120,
    alignItems: "center",
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  title: {
    ...typography.headingSmall,
    color: colors.gray900,
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    ...typography.bodySmall,
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 40,
  },
  checklist: {
    width: "100%",
    marginBottom: 32,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checklistIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checklistIconCompleted: {
    backgroundColor: colors.success600,
  },
  checklistIconPending: {
    backgroundColor: colors.gray200,
  },
  checklistNumber: {
    ...typography.bodySmall,
    color: colors.gray600,
    fontWeight: "600",
  },
  checklistLabel: {
    ...typography.bodySmall,
    color: colors.gray900,
    flex: 1,
  },
  button: {
    width: "100%",
  },
});
