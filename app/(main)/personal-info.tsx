import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function PersonalInfoScreen() {
  const router = useRouter();

  const personalInfo = {
    firstName: "Matthew",
    lastName: "Ola",
    fullName: "Matthew Ola",
    email: "thenatthewola@gmail.com",
    phone: "+234449492948",
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}

      <ScreenHeader title="Personal Info" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={28} color={colors.black} />
            </View>
            <View style={styles.cameraIconContainer}>
              <Ionicons name="camera" size={10} color={colors.white} />
            </View>
          </View>
          <AppText style={styles.avatarHint}>
            Add a profile photo so nannies can recognize you
          </AppText>
          <TouchableOpacity>
            <AppText style={styles.changePhotoLink}>When can the nanny see my photo?</AppText>
          </TouchableOpacity>
        </View>

        {/* Info Cards */}
        <View style={styles.infoContainer}>
          {/* Name */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={20} color={colors.gray500} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoValue}>{personalInfo.fullName}</AppText>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(main)/update-name" as any)}
                activeOpacity={0.7}
              >
                <AppText style={styles.editButton}>Edit</AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phone */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoValue}>{personalInfo.phone}</AppText>
              </View>
              <TouchableOpacity
                onPress={() => router.push("/(main)/update-phone" as any)}
                activeOpacity={0.7}
              >
                <AppText style={styles.editButton}>Edit</AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Email (non-editable) */}
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoValue}>{personalInfo.email}</AppText>
              </View>
            </View>
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
    paddingHorizontal: 20,
    marginTop: 20,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 24,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderStyle: "dashed",
    borderRadius: 16,
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: 8,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraIconContainer: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gray500,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarHint: {
    fontSize: 12,
    fontWeight: fontWeights.semiBold,
    color: colors.black,
    textAlign: "center",
  },
  changePhotoLink: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
  infoContainer: {
    gap: 12,
    paddingBottom: 32,
    marginTop: 24,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  infoContent: {
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  editButton: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
});
