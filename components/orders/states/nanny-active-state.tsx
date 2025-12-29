import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import ChecklistAccordionReadOnly from "~/components/orders/checklist-accordion-readonly";
import ProgressBar from "~/components/orders/progress-bar";
import SafetyContact from "~/components/orders/safety-contact";
import type { NannyOngoingOrder } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type NannyActiveStateProps = {
  order: NannyOngoingOrder;
  onChatOpen: () => void;
};

export default function NannyActiveState({ order, onChatOpen }: NannyActiveStateProps) {
  return (
    <View>
      {/* Time Display */}
      <View style={styles.timeSection}>
        <View style={styles.timeRow}>
          <AppText style={styles.timeLabel}>Time remaining</AppText>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <AppText style={styles.liveText}>Live feed is active</AppText>
          </View>
        </View>
        <AppText style={styles.timeValue}>{order.timeRemaining}</AppText>
        <AppText style={styles.timeRange}>
          {order.startTime} - {order.endTime}
        </AppText>
      </View>

      {/* Chat Button */}
      <TouchableOpacity style={styles.chatClientButton} onPress={onChatOpen} activeOpacity={0.7}>
        <AppText>💬</AppText>
        <AppText style={styles.chatClientText}>Chat Client</AppText>
      </TouchableOpacity>

      {/* Progress */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <AppText style={styles.progressLabel}>Tasks</AppText>
          <AppText style={styles.progressCount}>
            {Math.round((order.completedTasks / order.totalTasks) * 100)}% done
          </AppText>
        </View>
        <ProgressBar progress={order.completedTasks / order.totalTasks} height={6} />
      </View>

      {/* Checklists (Read-only) */}
      <View style={styles.checklistsSection}>
        {order.checklists.map((checklist) => (
          <ChecklistAccordionReadOnly key={checklist.id} checklist={checklist} />
        ))}
      </View>

      {/* Safety Contact */}
      <SafetyContact
        onReportIssue={() => console.log("Report issue")}
        onSOSAlert={() => console.log("SOS alert")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  timeSection: {
    marginBottom: 24,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  liveBadge: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 2,
    backgroundColor: colors.success50,
    borderRadius: 12,
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success700,
  },
  liveText: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.success700,
  },
  timeValue: {
    fontSize: 24,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  timeRange: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
  },
  chatClientButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.primary600,
    backgroundColor: colors.white,
    marginBottom: 24,
  },
  chatClientText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary600,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  progressCount: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.success400,
  },
  checklistsSection: {
    marginBottom: 24,
  },
});
