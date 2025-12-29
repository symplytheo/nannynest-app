import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type SafetyContactProps = {
  onReportIssue: () => void;
  onSOSAlert: () => void;
};

export default function SafetyContact({ onReportIssue, onSOSAlert }: SafetyContactProps) {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Safety Contact</AppText>
      <AppText style={styles.description}>Reach out to safety contacts fast.</AppText>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={onReportIssue} activeOpacity={0.7}>
          <Ionicons name="warning-outline" size={20} color={colors.error400} />
          <AppText style={styles.buttonText}>Report an issue</AppText>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={onSOSAlert} activeOpacity={0.7}>
          <Ionicons name="alert-circle-outline" size={20} color={colors.error400} />
          <AppText style={styles.buttonText}>SOS alert</AppText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: colors.error400,
    backgroundColor: colors.white,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.error400,
  },
});
