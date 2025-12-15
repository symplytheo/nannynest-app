import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type RoleSelectionCardProps = {
  title: string;
  role: "client" | "nanny";
  onPress: () => void;
};

export function RoleSelectionCard({ title, role, onPress }: RoleSelectionCardProps) {
  const isClient = role === "client";

  return (
    <TouchableOpacity
      style={[styles.card, isClient ? styles.clientCard : styles.nannyCard]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <AppText style={styles.cardText}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clientCard: {
    backgroundColor: colors.primary400,
    marginBottom: 32,
  },
  nannyCard: {
    backgroundColor: colors.gray700,
  },
  cardText: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.white,
    letterSpacing: -1,
  },
});
