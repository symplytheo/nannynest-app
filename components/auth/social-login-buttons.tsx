import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import colors from "~/theme/colors";

type SocialLoginButtonsProps = {
  onGooglePress?: () => void;
  onApplePress?: () => void;
  onFacebookPress?: () => void;
};

export function SocialLoginButtons({
  onGooglePress,
  onApplePress,
  onFacebookPress,
}: SocialLoginButtonsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onGooglePress} activeOpacity={0.7}>
        <Ionicons name="logo-google" size={20} color="#DB4437" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onApplePress} activeOpacity={0.7}>
        <Ionicons name="logo-apple" size={20} color={colors.gray900} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onFacebookPress} activeOpacity={0.7}>
        <Ionicons name="logo-facebook" size={20} color="#1877F2" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.gray300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
