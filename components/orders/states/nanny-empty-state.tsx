import React from "react";
import { StyleSheet, View } from "react-native";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import SafetyContact from "~/components/orders/safety-contact";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type NannyEmptyStateProps = {
  onChatOpen: () => void;
};

export default function NannyEmptyState({ onChatOpen }: NannyEmptyStateProps) {
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
        <AppText style={styles.timeValue}>04:56:34</AppText>
        <AppText style={styles.timeRange}>08:30AM - 06:00PM</AppText>
      </View>

      {/* No Task Added */}
      <View style={styles.noTaskSection}>
        <AppText style={styles.noTaskTitle}>No Task Added</AppText>
        <AppText style={styles.noTaskDescription}>
          You did not add any task list. Request that they do so.
        </AppText>
      </View>

      {/* Chat Button */}
      <AppButton
        label="Chat with Client"
        variant="outlined"
        color="brand"
        onPress={onChatOpen}
        fullWidth
        style={styles.chatButton}
        leftIcon={<AppText>💬</AppText>}
      />

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
  noTaskSection: {
    marginBottom: 24,
  },
  noTaskTitle: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  noTaskDescription: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    lineHeight: 20,
  },
  chatButton: {
    marginBottom: 24,
  },
});
