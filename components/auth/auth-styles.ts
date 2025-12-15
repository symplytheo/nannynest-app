import { StyleSheet } from "react-native";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

// Shared styles for all auth screens
export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  description: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray600,
    lineHeight: 20,
    marginBottom: 20,
  },
  form: {
    gap: 20,
  },
  primaryButton: {
    marginTop: 56,
  },
  secondaryLink: {
    alignSelf: "center",
    marginTop: 16,
  },
  secondaryLinkText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 32,
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray200,
  },
  dividerText: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
  },
});
