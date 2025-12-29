import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import type { Checklist } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChecklistAccordionReadOnlyProps = {
  checklist: Checklist;
};

export default function ChecklistAccordionReadOnly({ checklist }: ChecklistAccordionReadOnlyProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const completedCount = checklist.tasks.filter((t) => t.completed).length;
  const allCompleted = completedCount === checklist.tasks.length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          {allCompleted ? (
            <Ionicons name="checkmark-circle" size={20} color={colors.success400} />
          ) : (
            <Ionicons name="add-circle-outline" size={20} color={colors.gray400} />
          )}
          <AppText style={styles.title}>{checklist.title}</AppText>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <AppText style={styles.countText}>{completedCount}</AppText>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.gray700}
          />
        </View>
      </TouchableOpacity>

      {/* Tasks (Read-only) */}
      {isExpanded && (
        <View style={styles.tasksContainer}>
          {checklist.tasks.map((task) => (
            <View key={task.id} style={styles.taskItem}>
              <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                {task.completed && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>
              <AppText style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                {task.title}
              </AppText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderRadius: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countBadge: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    minWidth: 24,
    alignItems: "center",
  },
  countText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  tasksContainer: {
    paddingTop: 12,
    paddingHorizontal: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.success400,
    borderColor: colors.success400,
  },
  taskText: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: "line-through",
    color: colors.gray500,
  },
});
