import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import type { Checklist } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChecklistAccordionProps = {
  checklist: Checklist;
  onTaskToggle: (taskId: string) => void;
  onMarkAllComplete: () => void;
};

export default function ChecklistAccordion({
  checklist,
  onTaskToggle,
  onMarkAllComplete,
}: ChecklistAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

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
          <TouchableOpacity
            style={styles.markAllButton}
            onPress={(e) => {
              e.stopPropagation();
              onMarkAllComplete();
            }}
            activeOpacity={0.7}
          >
            {allCompleted ? (
              <Ionicons name="checkmark" size={16} color={colors.success400} />
            ) : (
              <Ionicons name="add" size={16} color={colors.gray700} />
            )}
          </TouchableOpacity>
          <AppText style={styles.title}>{checklist.title}</AppText>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.countBadge}>
            <AppText style={styles.countText}>{checklist.tasks.length}</AppText>
          </View>
          <Ionicons
            name={isExpanded ? "chevron-up" : "chevron-down"}
            size={20}
            color={colors.gray700}
          />
        </View>
      </TouchableOpacity>

      {/* Tasks */}
      {isExpanded && (
        <View style={styles.tasksList}>
          {checklist.tasks.map((task) => (
            <TouchableOpacity
              key={task.id}
              style={styles.taskItem}
              onPress={() => onTaskToggle(task.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
                {task.completed && <Ionicons name="checkmark" size={14} color={colors.white} />}
              </View>
              <AppText style={[styles.taskText, task.completed && styles.taskTextCompleted]}>
                {task.title}
              </AppText>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: colors.gray50,
    padding: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  markAllButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    flex: 1,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  countBadge: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  countText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  tasksList: {
    paddingHorizontal: 8,
    gap: 6,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.gray300,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.gray500,
    borderColor: colors.gray500,
  },
  taskText: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    flex: 1,
  },
  taskTextCompleted: {
    color: colors.gray500,
    textDecorationLine: "line-through",
  },
});
