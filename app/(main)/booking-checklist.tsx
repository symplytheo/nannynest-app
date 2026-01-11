import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChecklistItem = {
  id: string;
  text: string;
  checked: boolean;
};

const checklistData: ChecklistItem[] = [
  {
    id: "1",
    text: "Confirm that you have read the Terms & Conditions",
    checked: false,
  },
  {
    id: "2",
    text: "Confirm that you have read the Privacy Policies",
    checked: false,
  },
  {
    id: "3",
    text: "Confirm that you have called for the service of a NannyNest representative to work within your premises",
    checked: false,
  },
  {
    id: "4",
    text: "Confirm that you have lock away all private property within your apartment",
    checked: false,
  },
  {
    id: "5",
    text: "Confirm that you have lock all doors and entry points you want people to NOT accessed by nanny.",
    checked: false,
  },
  {
    id: "6",
    text: "Confirm that you have provided clear instructions",
    checked: false,
  },
  {
    id: "7",
    text: "Confirm that all pets are secured.",
    checked: false,
  },
  {
    id: "8",
    text: "Confirm that you have read all instructions.",
    checked: false,
  },
  {
    id: "9",
    text: "Confirm that you accepted all the term of services.",
    checked: false,
  },
];

export default function BookingChecklistScreen() {
  const router = useRouter();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(checklistData);

  const handleToggle = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const allChecked = checklist.every((item) => item.checked);

  const handleContinue = () => {
    router.push("/(main)/booking-connect-nanny" as any);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Checklist</AppText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Instruction Text */}
        <AppText style={styles.instructionText}>
          Please read our policies and terms & conditions before accessing.
        </AppText>

        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Terms and Conditions</AppText>
          <Ionicons name="chevron-forward" size={20} color={colors.gray700} />
        </View>

        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>Privacy Policy</AppText>
          <Ionicons name="chevron-forward" size={20} color={colors.gray700} />
        </View>

        {/* Checklist Items */}
        <View style={styles.checklistContainer}>
          {checklist.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.checklistItem}
              onPress={() => handleToggle(item.id)}
              activeOpacity={0.7}
            >
              <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
                {item.checked && <Ionicons name="checkmark" size={16} color={colors.white} />}
              </View>
              <AppText style={styles.checklistText}>{item.text}</AppText>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.footer}>
        <AppButton label="Continue" onPress={handleContinue} disabled={!allChecked} fullWidth />
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  instructionText: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray600,
    marginTop: 20,
    marginBottom: 24,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
  },
  checklistContainer: {
    gap: 16,
    paddingBottom: 24,
  },
  checklistItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: colors.primary400,
    borderColor: colors.primary400,
  },
  checklistText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
});
