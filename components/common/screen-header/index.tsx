import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  style?: ViewStyle;
};

export default function ScreenHeader({ title, onBack, style }: ScreenHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.header, style]}>
      <TouchableOpacity style={styles.backButton} onPress={handleBack}>
        <Ionicons name="chevron-back" size={25} color={colors.gray900} />
      </TouchableOpacity>
      <AppText style={styles.headerTitle}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray100,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },
});
