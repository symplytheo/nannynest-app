import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ScaleDecorator } from "react-native-draggable-flatlist";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type TaskItem = {
  id: string;
  text: string;
  checked: boolean;
};

type DraggableTaskItemProps = {
  item: TaskItem;
  drag: () => void;
  isActive: boolean;
  onToggle: (id: string) => void;
  onTextChange: (id: string, text: string) => void;
};

export default function DraggableTaskItem({
  item,
  drag,
  isActive,
  onToggle,
  onTextChange,
}: DraggableTaskItemProps) {
  return (
    <ScaleDecorator>
      <View style={[styles.taskItem, isActive && styles.taskItemActive]}>
        <TouchableOpacity onPressIn={drag} style={styles.dragHandle}>
          <MaterialCommunityIcons name="dots-grid" size={20} color={colors.gray400} />
        </TouchableOpacity>
        <View style={styles.taskItemContent}>
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => onToggle(item.id)}
            activeOpacity={0.7}
          >
            {item.checked && <View style={styles.checkboxInner} />}
          </TouchableOpacity>
          <TextInput
            style={styles.taskItemText}
            value={item.text}
            onChangeText={(text) => onTextChange(item.id, text)}
            placeholder="Enter task item"
            placeholderTextColor={colors.gray400}
          />
        </View>
      </View>
    </ScaleDecorator>
  );
}

const styles = StyleSheet.create({
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: 12,
  },
  taskItemActive: {
    backgroundColor: colors.gray50,
  },
  dragHandle: {
    padding: 0,
  },
  taskItemContent: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.gray50,
    borderWidth: 1,
    borderColor: colors.gray100,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.gray500,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 2,
    backgroundColor: colors.primary400,
  },
  taskItemText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    padding: 0,
  },
});
