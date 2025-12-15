import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import ControlledTextField from "~/components/form/controlled-textfield";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type UpdateNameFormData = {
  firstName: string;
  lastName: string;
};

export default function UpdateNameScreen() {
  const router = useRouter();

  const { control, handleSubmit } = useForm<UpdateNameFormData>({
    defaultValues: {
      firstName: "Matthew",
      lastName: "Ola",
    },
  });

  const onSubmit = async (data: UpdateNameFormData) => {
    console.log("Update name:", data);
    // TODO: API call to update name
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <ScreenHeader title="Update Name" />

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
            <AppText style={styles.description}>
              Enter your name, same as your ID or passport.
            </AppText>

            <View style={styles.form}>
              <ControlledTextField
                control={control}
                name="firstName"
                label="First name"
                placeholder="Matthew"
                rules={{ required: "First name is required" }}
              />

              <ControlledTextField
                control={control}
                name="lastName"
                label="Last name"
                placeholder="Ola"
                rules={{ required: "Last name is required" }}
              />
            </View>

            <AppButton
              label="Save"
              variant="filled"
              color="brand"
              size="small"
              onPress={handleSubmit(onSubmit)}
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
    gap: 5,
    marginBottom: 20,
  },
});
