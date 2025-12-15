import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type AuthHeaderProps = {
  title: string;
  onBackPress?: () => void;
  showBackButton?: boolean;
};

export function AuthHeader({ title, onBackPress, showBackButton = true }: AuthHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={20} color="black" />
        </TouchableOpacity>
      )}
      <AppText style={styles.title}>{title}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 58,
    paddingBottom: 16,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    left: 20,
    top: 54,
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.gray100,
  },
  title: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    textAlign: "center",
    flex: 1,
    letterSpacing: -0.4,
  },
});
