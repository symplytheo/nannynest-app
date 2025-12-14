import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type AboutFormData = {
  bio: string;
};

export default function AboutScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, watch } = useForm<AboutFormData>({
    defaultValues: {
      bio: "",
    },
  });

  const bio = watch("bio");

  const onSubmit = async (data: AboutFormData) => {
    setLoading(true);
    try {
      console.log("Save bio:", data);
      // TODO: API call to save bio
      router.back();
    } catch (error) {
      console.error("Save bio error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="About" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <AppText style={styles.description}>Write a short bio about yourself</AppText>

            <View style={styles.form}>
              <ControlledTextField
                control={control}
                name="bio"
                label="Bio"
                placeholder="Write"
                multiline
                textAlignVertical="top"
                rules={{ required: "Bio is required" }}
              />
            </View>

            <AppButton
              label="Save"
              variant="filled"
              color="brand"
              size="small"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading || !bio.trim()}
              fullWidth
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardView: {
    flex: 1,
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
    paddingTop: 24,
  },
  description: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    marginBottom: 24,
    lineHeight: 20,
  },
  form: {
    marginBottom: 20,
  },
});
