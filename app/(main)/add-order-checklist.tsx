import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChecklistItem = {
  id: string;
  title: string;
  taskCount: number;
  allCompleted: boolean;
};

export default function AddOrderChecklistScreen() {
  const router = useRouter();

  const [checklists, setChecklists] = useState<ChecklistItem[]>([
    { id: "1", title: "Checklist Title", taskCount: 12, allCompleted: false },
    { id: "2", title: "Checklist Title", taskCount: 12, allCompleted: false },
    { id: "3", title: "Checklist Title", taskCount: 12, allCompleted: false },
  ]);

  const handleToggleComplete = (id: string) => {
    setChecklists(
      checklists.map((item) =>
        item.id === id ? { ...item, allCompleted: !item.allCompleted } : item
      )
    );
  };

  const handleChecklistPress = (id: string) => {
    // Navigate to edit task page with order context
    router.push(`/(main)/edit-task?id=${id}&context=order` as any);
  };

  const handleCreateNew = () => {
    // Navigate to create task page with order context
    router.push("/(main)/create-task?context=order" as any);
  };

  const handleDone = () => {
    // Save checklists and navigate back
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <ScreenHeader title="Add Task" />
        <TouchableOpacity style={styles.doneButton} onPress={handleDone} activeOpacity={0.7}>
          <AppText style={styles.doneText}>Done</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Checklist Items */}
          {checklists.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => handleChecklistPress(item.id)}
              activeOpacity={0.7}
            >
              <AppText style={styles.checklistTitle}>{item.title}</AppText>
              <View style={styles.checklistRight}>
                <View style={styles.countBadge}>
                  <AppText style={styles.countText}>{item.taskCount}</AppText>
                </View>
                <TouchableOpacity
                  style={[styles.toggleButton, item.allCompleted && styles.toggleButtonCompleted]}
                  onPress={(e) => {
                    e.stopPropagation();
                    handleToggleComplete(item.id);
                  }}
                  activeOpacity={0.7}
                >
                  {item.allCompleted ? (
                    <Ionicons name="checkmark" size={16} color={colors.white} />
                  ) : (
                    <Ionicons name="add" size={16} color={colors.gray700} />
                  )}
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}

          {/* divider */}
          <View style={styles.divider} />

          {/* Create New Task Button */}
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateNew}
            activeOpacity={0.7}
          >
            <AppText style={styles.createText}>Create new task</AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
  },

  doneButton: {
    width: 68,
    height: 36,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  doneText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  checklistItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: colors.gray50,
    padding: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  checklistTitle: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.black,
    flex: 1,
  },
  checklistRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
  toggleButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonCompleted: {
    backgroundColor: colors.success400,
  },

  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 20,
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderColor: colors.gray300,
    borderWidth: 1,
    alignItems: "center",
    width: 162,
  },
  createText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray700,
  },
});
