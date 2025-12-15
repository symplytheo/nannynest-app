import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type SavedTask = {
  id: string;
  title: string;
  itemCount: number;
};

export default function SavedTasksScreen() {
  const router = useRouter();

  const [tasks] = useState<SavedTask[]>([
    { id: "1", title: "Special Day", itemCount: 12 },
    { id: "2", title: "Office Checklist", itemCount: 12 },
    { id: "3", title: "Away from Home", itemCount: 12 },
  ]);

  const handleTaskPress = (taskId: string) => {
    router.push(`/(main)/task-details?id=${taskId}` as any);
  };

  const handleCreateTask = () => {
    router.push("/(main)/create-task" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <ScreenHeader title="Saved Tasks" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Task List */}
          <View style={styles.taskList}>
            {tasks.map((task) => (
              <TouchableOpacity
                key={task.id}
                style={styles.taskCard}
                onPress={() => handleTaskPress(task.id)}
                activeOpacity={0.7}
              >
                <AppText style={styles.taskTitle}>{task.title}</AppText>
                <View style={styles.taskCountContainer}>
                  <AppText style={styles.taskCount}>{task.itemCount}</AppText>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* divider */}
          <View style={styles.divider} />

          {/* Create New Task Button */}
          <AppButton
            label="Create new task"
            variant="filled"
            color="brand"
            onPress={handleCreateTask}
            fullWidth
            style={styles.createButton}
            size="small"
          />
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

  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  taskList: {
    gap: 12,
  },
  taskCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray50,
    borderRadius: 12,
    padding: 12,
  },
  taskTitle: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.black,
  },
  taskCountContainer: {
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 8,
  },
  taskCount: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 24,
  },
  createButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
});
