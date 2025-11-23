import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

export default function NannyPersonalInfoScreen() {
  const router = useRouter();

  const personalInfo = {
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+234 801 234 5678",
    address: "456 Oak Avenue, Lagos, Nigeria",
    dateOfBirth: "March 22, 1995",
    experience: "5 years",
    hourlyRate: "$25/hour",
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={28} color={colors.gray900} />
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Personal Info</AppText>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Picture */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <AppText style={styles.avatarText}>SJ</AppText>
          </View>
          <TouchableOpacity style={styles.changePhotoButton}>
            <Ionicons name="camera-outline" size={20} color={colors.primary400} />
            <AppText style={styles.changePhotoText}>Change Photo</AppText>
          </TouchableOpacity>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={16} color="#FFB800" />
            <AppText style={styles.ratingText}>4.8 Rating</AppText>
          </View>
        </View>

        {/* Info Cards */}
        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Full Name</AppText>
                <AppText style={styles.infoValue}>{personalInfo.fullName}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Email</AppText>
                <AppText style={styles.infoValue}>{personalInfo.email}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="call-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Phone Number</AppText>
                <AppText style={styles.infoValue}>{personalInfo.phone}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Address</AppText>
                <AppText style={styles.infoValue}>{personalInfo.address}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Date of Birth</AppText>
                <AppText style={styles.infoValue}>{personalInfo.dateOfBirth}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.sectionDivider} />

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="briefcase-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Experience</AppText>
                <AppText style={styles.infoValue}>{personalInfo.experience}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Ionicons name="cash-outline" size={20} color={colors.gray600} />
              <View style={styles.infoContent}>
                <AppText style={styles.infoLabel}>Hourly Rate</AppText>
                <AppText style={styles.infoValue}>{personalInfo.hourlyRate}</AppText>
              </View>
              <TouchableOpacity>
                <Ionicons name="create-outline" size={20} color={colors.primary400} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <AppButton
            label="Save Changes"
            variant="filled"
            color="brand"
            onPress={() => {
              console.log("Save changes");
              router.back();
            }}
            fullWidth
          />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.white,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary400,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primary100,
    borderRadius: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.gray900,
  },
  infoContainer: {
    paddingHorizontal: 24,
    gap: 12,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: colors.gray600,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.gray900,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.gray200,
    marginVertical: 8,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
});
