import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  isDanger?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { id: "1", label: "Personal Info", icon: "person-outline", route: "/(main)/personal-info" },
  { id: "2", label: "Saved Tasks", icon: "checkbox-outline", route: "/(main)/saved-tasks" },
  {
    id: "3",
    label: "Change password",
    icon: "lock-closed-outline",
    route: "/(main)/change-password",
  },
  { id: "4", label: "Help & Support", icon: "help-circle-outline" },
  { id: "5", label: "Terms & Conditions", icon: "document-text-outline" },
  { id: "6", label: "Privacy policy", icon: "shield-checkmark-outline" },
  { id: "7", label: "Log out", icon: "log-out-outline", isDanger: false },
  {
    id: "8",
    label: "Delete account",
    icon: "trash-outline",
    isDanger: true,
    route: "/(main)/delete-account",
  },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.label === "Log out") {
      console.log("Logging out...");
      router.replace("/(auth)/login" as any);
    } else if (item.route) {
      console.log("Navigate to:", item.route);
      router.push(item.route as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <AppText style={styles.title}>Profile</AppText>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <AppText style={styles.avatarText}>MO</AppText>
            </View>
          </View>
          <AppText style={styles.userName}>Matthew Ola</AppText>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuItemPress(item)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemLeft}>
                <View style={styles.menuIcon}>
                  <Ionicons
                    name={item.icon}
                    size={24}
                    color={item.isDanger ? colors.error : colors.gray500}
                  />
                </View>
                <AppText style={[styles.menuLabel, item.isDanger && styles.menuLabelDanger]}>
                  {item.label}
                </AppText>
              </View>
            </TouchableOpacity>
          ))}
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray900,
  },
  profileCard: {
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 32,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 4,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.black,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.gray600,
  },
  menuContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 12,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: colors.gray200,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  menuIcon: {},
  menuIconText: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray700,
  },
  menuLabelDanger: {
    color: colors.error,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.gray400,
  },
});
