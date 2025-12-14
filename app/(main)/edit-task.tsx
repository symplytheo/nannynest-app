import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, { RenderItemParams } from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import DraggableTaskItem from "~/components/task/draggable-task-item";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type TaskItem = {
  id: string;
  text: string;
  checked: boolean;
};

type EditTaskFormData = {
  title: string;
};

export default function EditTaskScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const { control, handleSubmit } = useForm<EditTaskFormData>({
    defaultValues: {
      title: "Special Days",
    },
  });

  const [items, setItems] = useState<TaskItem[]>([
    { id: "1", text: "First bath", checked: false },
    { id: "2", text: "Breakfast", checked: false },
    { id: "3", text: "Pick from school", checked: false },
    { id: "4", text: "Second bath", checked: false },
    { id: "5", text: "Lunch", checked: false },
    { id: "6", text: "Playground", checked: false },
  ]);

  const handleAddItem = () => {
    const newItem: TaskItem = {
      id: Date.now().toString(),
      text: "",
      checked: false,
    };
    setItems([...items, newItem]);
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)));
  };

  const handleTextChange = (id: string, text: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, text } : item)));
  };

  const onSubmit = async (data: EditTaskFormData) => {
    const taskData = {
      id: params.id || Date.now().toString(),
      title: data.title,
      items: items.filter((item) => item.text.trim() !== ""), // Only save items with text
    };

    console.log("Save task:", taskData);

    router.back();
  };

  const renderItem = ({ item, drag, isActive }: RenderItemParams<TaskItem>) => {
    return (
      <DraggableTaskItem
        item={item}
        drag={drag}
        isActive={isActive}
        onToggle={handleToggleItem}
        onTextChange={handleTextChange}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ScreenHeader title="Edit Task" />

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.content}>
              {/* Title */}
              <View>
                <AppText style={styles.sectionLabel}>Title</AppText>
                <ControlledTextField
                  control={control}
                  name="title"
                  placeholder="Enter task title"
                  rules={{ required: "Title is required" }}
                />
              </View>

              {/* divider */}
              <View style={styles.divider} />

              {/* List Items */}
              <View>
                <AppText style={styles.sectionLabel}>List Items</AppText>

                <DraggableFlatList
                  data={items}
                  onDragEnd={({ data }) => setItems(data)}
                  keyExtractor={(item) => item.id}
                  renderItem={renderItem}
                  scrollEnabled={false}
                  containerStyle={styles.draggableList}
                />

                {/* Add New Item */}
                <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
                  <Ionicons name="add" size={20} color={colors.primary400} />
                  <AppText style={styles.addButtonText}>New</AppText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          {/* Save Button */}
          <View style={styles.buttonContainer}>
            <AppButton
              label="Save"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              fullWidth
              size="small"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: fontWeights.bold,
    color: colors.gray700,
    marginBottom: 20,
  },
  draggableList: {
    gap: 12,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 12,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
});
