import { StyleSheet } from "react-native";
import { colors, typography } from "~/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: 500,
    color: colors.gray700,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 8,
    minHeight: 52,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
  },
  filled: {
    backgroundColor: colors.background,
  },
  input: {
    flex: 1,
    ...typography.bodyMedium,
    lineHeight: undefined,
    paddingVertical: 0,
    color: colors.black,
  },
  multiline: {
    paddingVertical: 8,
    textAlignVertical: "top",
    minHeight: 80,
  },
  icon: {
    marginHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  disabled: {
    backgroundColor: colors.gray100,
  },
  disabledText: {
    color: colors.gray400,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: 4,
  },
  helperText: {
    ...typography.caption,
    color: colors.gray500,
    marginTop: 4,
  },
});
