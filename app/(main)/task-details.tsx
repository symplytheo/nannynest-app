import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type TaskItem = {
  id: string;
  text: string;
  checked: boolean;
};

export default function TaskDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Mock data - in real app, fetch based on params.id
  const [task] = useState({
    id: params.id || "1",
    title: "Special Days",
    items: [
      { id: "1", text: "First bath", checked: false },
      { id: "2", text: "Breakfast", checked: true },
      { id: "3", text: "Pick from school", checked: false },
      { id: "4", text: "Second bath", checked: true },
      { id: "5", text: "Lunch", checked: false },
      { id: "6", text: "Playground", checked: false },
    ] as TaskItem[],
  });

  const handleEditTask = () => {
    router.push(`/(main)/edit-task?id=${task.id}` as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <ScreenHeader title={task.title} />
        <TouchableOpacity style={styles.editButton} onPress={handleEditTask}>
          <AppText style={styles.editButtonText}>Edit Task</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Task Items */}
          <View>
            {task.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                  {item.checked && <Ionicons name="checkmark" size={14} color={colors.white} />}
                </View>
                <AppText style={[styles.itemText, item.checked && styles.itemTextChecked]}>
                  {item.text}
                </AppText>
              </View>
            ))}
          </View>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },

  editButton: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.primary600,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary600,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    gap: 12,
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
    backgroundColor: colors.primary400,
    borderColor: colors.primary400,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  itemTextChecked: {
    textDecorationLine: "line-through",
    color: colors.gray500,
  },
});
