import { StyleSheet } from "react-native";
import { colors, typography } from "~/theme";

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: 500,
    color: colors.gray900,
    // marginBottom: 2,
  },
  inputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 15,
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.gray50,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.gray100,
    // backgroundColor: colors.white,
  },
  filled: {
    backgroundColor: colors.gray50,
  },
  input: {
    flex: 1,
    ...typography.caption,
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
