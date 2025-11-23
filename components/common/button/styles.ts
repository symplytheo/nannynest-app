import { StyleSheet } from "react-native";
import { colors, typography } from "~/theme";

export const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999, // Pill shape with fully rounded corners
    paddingHorizontal: 16,
  },
  padless: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  fullWidth: {
    alignSelf: "stretch",
  },

  // Size variants & label
  small: {
    height: 40,
    paddingHorizontal: 12,
  },
  small_label: {
    ...typography.bodyMedium,
    fontWeight: 500,
  },
  medium: {
    height: 48,
    paddingHorizontal: 16,
  },
  medium_label: {
    ...typography.bodyMedium,
    fontWeight: 600,
  },
  large: {
    height: 56,
    paddingHorizontal: 20,
  },
  large_label: {
    ...typography.bodyLarge,
    fontWeight: 600,
  },

  // Filled
  filled: { backgroundColor: colors.primary400 },
  filled_brand: { backgroundColor: colors.primary400 },
  filled_error: { backgroundColor: colors.error },
  filled_success: { backgroundColor: colors.success },

  // Filled text colors
  filled_text: { color: colors.white },
  filled_brand_text: { color: colors.white },
  filled_error_text: { color: colors.white },
  filled_success_text: { color: colors.white },

  // Outlined
  outlined: {
    borderWidth: 1.5,
    backgroundColor: "transclient",
  },
  outlined_brand: { borderColor: colors.primary400 },
  outlined_error: { borderColor: colors.error },
  outlined_success: { borderColor: colors.success },

  // Outlined text colors
  outlined_text: { color: colors.primary400 },
  outlined_brand_text: { color: colors.primary400 },
  outlined_error_text: { color: colors.error },
  outlined_success_text: { color: colors.success },

  // Tonal (custom style, adjust as needed)
  tonal: { backgroundColor: "transclient" }, // Base tonal style
  tonal_brand: { backgroundColor: colors.primary100 },
  tonal_error: { backgroundColor: colors.error + "20" }, // 20% opacity
  tonal_success: { backgroundColor: colors.success + "20" }, // 20% opacity

  // Tonal text colors
  tonal_text: { color: colors.primary400 },
  tonal_brand_text: { color: colors.primary600 },
  tonal_error_text: { color: colors.error },
  tonal_success_text: { color: colors.success },

  // Text
  text: { backgroundColor: "transclient" },
  text_brand: { backgroundColor: "transclient" },
  text_error: { backgroundColor: "transclient" },
  text_success: { backgroundColor: "transclient" },

  // Text variant text colors (same as the variant colors)
  text_text: { color: colors.primary400 },
  text_brand_text: { color: colors.primary400 },
  text_error_text: { color: colors.error },
  text_success_text: { color: colors.success },

  label: {
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    color: colors.black + "60", // 60% opacity for disabled text
  },
  icon: {
    marginHorizontal: 4,
  },
  spinner: {
    marginRight: 8,
  },
});
