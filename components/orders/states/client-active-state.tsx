import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ChecklistAccordion from "~/components/orders/checklist-accordion";
import NannyInfoCard from "~/components/orders/nanny-info-card";
import ProgressBar from "~/components/orders/progress-bar";
import type { OngoingOrder } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ClientActiveStateProps = {
  initialOrder: OngoingOrder;
  onChatOpen: () => void;
};

export default function ClientActiveState({ initialOrder, onChatOpen }: ClientActiveStateProps) {
  const router = useRouter();
  const [order, setOrder] = useState<OngoingOrder>(initialOrder);

  // Handle task toggle
  const handleTaskToggle = (checklistId: string, taskId: string) => {
    const updatedChecklists = order.checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        return {
          ...checklist,
          tasks: checklist.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
          ),
        };
      }
      return checklist;
    });

    const completedTasks = updatedChecklists.reduce(
      (acc, checklist) => acc + checklist.tasks.filter((t) => t.completed).length,
      0
    );

    setOrder({
      ...order,
      checklists: updatedChecklists,
      completedTasks,
    });
  };

  // Handle mark all complete
  const handleMarkAllComplete = (checklistId: string) => {
    const updatedChecklists = order.checklists.map((checklist) => {
      if (checklist.id === checklistId) {
        const allCompleted = checklist.tasks.every((t) => t.completed);
        return {
          ...checklist,
          tasks: checklist.tasks.map((task) => ({ ...task, completed: !allCompleted })),
        };
      }
      return checklist;
    });

    const completedTasks = updatedChecklists.reduce(
      (acc, checklist) => acc + checklist.tasks.filter((t) => t.completed).length,
      0
    );

    setOrder({
      ...order,
      checklists: updatedChecklists,
      completedTasks,
    });
  };

  return (
    <View>
      <NannyInfoCard
        name={order.nanny.name}
        avatar={order.nanny.avatar}
        date={order.date}
        startTime={order.startTime}
        endTime={order.endTime}
        status="ongoing"
      />

      <View style={styles.divider} />

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <AppText style={styles.progressLabel}>Tasks</AppText>
          <View style={styles.progressCountContainer}>
            <ProgressBar progress={order.completedTasks / order.totalTasks} height={8} />
            <AppText style={styles.progressCount}>
              {order.completedTasks}/{order.totalTasks} done
            </AppText>
          </View>
        </View>
      </View>

      {/* Checklists */}
      <View style={styles.checklistsSection}>
        {order.checklists.map((checklist) => (
          <ChecklistAccordion
            key={checklist.id}
            checklist={checklist}
            onTaskToggle={(taskId) => handleTaskToggle(checklist.id, taskId)}
            onMarkAllComplete={() => handleMarkAllComplete(checklist.id)}
          />
        ))}
      </View>

      {/* Add Checklist Button */}
      <TouchableOpacity
        style={styles.addChecklistButton}
        onPress={() => router.push("/(main)/add-order-checklist" as any)}
        activeOpacity={0.7}
      >
        <AppText style={styles.addChecklistText}>Add service checklist</AppText>
      </TouchableOpacity>

      <View style={[styles.divider, { marginVertical: 16 }]} />

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <AppButton
          label="See live cam"
          variant="filled"
          color="brand"
          onPress={() => {}}
          fullWidth
          style={styles.liveCamButton}
          size="small"
        />
        <TouchableOpacity style={styles.chatButton} onPress={onChatOpen} activeOpacity={0.7}>
          <MaterialCommunityIcons name="message-text-outline" size={20} color={colors.gray700} />
          <AppText style={styles.chatButtonText}>Chat</AppText>
        </TouchableOpacity>
      </View>

      {/* Guides Section */}
      <View style={styles.guidesSection}>
        <AppText style={styles.guidesTitle}>Checkout our guides</AppText>
        <View style={styles.guideCard}>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9" }}
            style={styles.guideImage}
            contentFit="cover"
          />
          <View style={styles.guideOverlay}>
            <View style={styles.tipsBadge}>
              <AppText style={styles.tipsText}>TIPS</AppText>
            </View>
            <AppText style={styles.guideText}>How to handle Nanny in your home</AppText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 24,
  },
  progressSection: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  progressCount: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.success400,
  },
  checklistsSection: {
    marginBottom: 16,
  },
  addChecklistButton: {
    marginTop: 24,
  },
  addChecklistText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  liveCamButton: {
    flex: 1,
  },
  chatButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    width: 97,
    gap: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
  },
  chatButtonText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray700,
  },
  guidesSection: {
    marginTop: 8,
  },
  guidesTitle: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 12,
  },
  guideCard: {
    height: 180,
    borderRadius: 16,
    overflow: "hidden",
  },
  guideImage: {
    width: "100%",
    height: "100%",
  },
  guideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 20,
    justifyContent: "flex-end",
  },
  tipsBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 10,
    fontWeight: fontWeights.bold,
    color: colors.white,
    letterSpacing: 1,
  },
  guideText: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: colors.white,
    lineHeight: 24,
  },
});
