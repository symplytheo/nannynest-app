import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function DeleteAccountScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    setLoading(true);
    try {
      console.log("Delete account confirmed");
      // TODO: API call to delete account
      // After successful deletion, redirect to login
      router.replace("/(auth)/login" as any);
    } catch (error) {
      console.error("Delete account error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeepAccount = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Delete Account" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.warningContainer}>
            <View style={styles.warningItem}>
              <View style={styles.bullet} />
              <AppText style={styles.warningText}>
                If you choose to continue, we will delete your data from our database and you will
                cease to be a NannyNest user.
              </AppText>
            </View>

            <View style={styles.warningItem}>
              <View style={styles.bullet} />
              <AppText style={styles.warningText}>
                You&apos;ll have to create a new account to undo this action.
              </AppText>
            </View>

            <View style={styles.warningItem}>
              <View style={styles.bullet} />
              <AppText style={styles.warningText}>
                Before you go, make sure you use any balance in your wallet or reach out to our
                Customer Support to request your wallet balance withdrawal to your bank account.
              </AppText>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <AppButton
              label="Continue"
              variant="filled"
              color="error"
              onPress={handleContinue}
              loading={loading}
              disabled={loading}
              fullWidth
              size="small"
            />

            <AppButton
              label="Keep my account"
              variant="outlined"
              color="brand"
              onPress={handleKeepAccount}
              disabled={loading}
              fullWidth
              size="small"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  warningContainer: {
    marginBottom: 20,
  },
  warningItem: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.gray900,
    marginTop: 7,
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.black,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: 16,
  },
});
