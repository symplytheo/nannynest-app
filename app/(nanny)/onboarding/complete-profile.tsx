import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AuthHeader } from "~/components/auth";
import { authStyles } from "~/components/auth/auth-styles";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import { ControlledTextField } from "~/components/form";
import { colors } from "~/theme";

interface ProfileFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
}

export default function CompleteProfileScreen() {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
    },
  });

  const handleUploadPhoto = () => {
    // Implement photo upload logic
    console.log("Upload photo");
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Profile data:", data);
    // Navigate to next step or update profile
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={authStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={authStyles.scrollView}
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <AuthHeader title="Update your Profile" showBackButton />

        {/* Content */}
        <View style={authStyles.content}>
          {/* Profile Photo Section */}
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              {profileImage ? (
                <Image source={{ uri: profileImage }} style={styles.profilePhoto} />
              ) : (
                <View style={styles.photoPlaceholder}>
                  <Ionicons name="person-outline" size={48} color={colors.gray400} />
                </View>
              )}
            </View>
            <AppText style={styles.uploadText}>Upload a clear picture of your face.</AppText>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* First Name */}
            <ControlledTextField
              control={control}
              name="firstName"
              label="First Name"
              placeholder="Enter first name"
              rules={{
                required: "First name is required",
              }}
            />

            {/* Last Name */}
            <ControlledTextField
              control={control}
              name="lastName"
              label="Last Name"
              placeholder="Enter last name"
              rules={{
                required: "Last name is required",
              }}
            />

            {/* Date of Birth */}
            <ControlledTextField
              control={control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="DD/MM/YYYY"
              rules={{
                required: "Date of birth is required",
              }}
            />

            {/* Upload ID Section */}
            <View style={styles.uploadSection}>
              <AppText style={styles.uploadLabel}>Upload a valid ID</AppText>
              <AppText style={styles.uploadSubtext}>JPEG format • Max: 5MB</AppText>
              <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPhoto}>
                <Ionicons name="cloud-upload-outline" size={24} color={colors.gray600} />
                <AppText style={styles.uploadButtonText}>Upload</AppText>
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <AppButton
              label="Submit"
              variant="filled"
              color="brand"
              onPress={handleSubmit(onSubmit)}
              fullWidth
              size="small"
              style={styles.submitButton}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  photoSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 12,
  },
  photoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
  },
  uploadText: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
  },
  form: {
    gap: 20,
  },
  uploadSection: {
    marginTop: 8,
  },
  uploadLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray900,
    marginBottom: 4,
  },
  uploadSubtext: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 12,
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    borderStyle: "dashed",
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.gray700,
  },
  submitButton: {
    marginTop: 16,
  },
});
