import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import colors from "~/theme/colors";

type MenuItem = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route?: string;
  isDanger?: boolean;
};

const MENU_ITEMS: MenuItem[] = [
  { id: "1", label: "Personal Info", icon: "person-outline", route: "/(main)/personal-info" },
  { id: "2", label: "Saved Nannies", icon: "heart-outline", route: "/(main)/saved-nannies" },
  { id: "3", label: "Change password", icon: "lock-closed-outline" },
  { id: "4", label: "Help & Support", icon: "help-circle-outline" },
  { id: "5", label: "Terms & Conditions", icon: "document-text-outline" },
  { id: "6", label: "Privacy policy", icon: "shield-checkmark-outline" },
  { id: "7", label: "Log out", icon: "log-out-outline", isDanger: false },
  { id: "8", label: "Delete account", icon: "trash-outline", isDanger: true },
];

export default function ProfileScreen() {
  const router = useRouter();

  const handleMenuItemPress = (item: MenuItem) => {
    if (item.label === "Log out") {
      console.log("Logging out...");
      router.replace("/(auth)/login" as any);
    } else if (item.label === "Delete account") {
      console.log("Delete account...");
      // TODO: Implement account deletion confirmation modal
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
          <AppText style={styles.userEmail}>matthew.ola@email.com</AppText>
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
                    size={22}
                    color={item.isDanger ? colors.error : colors.primary400}
                  />
                </View>
                <AppText style={[styles.menuLabel, item.isDanger && styles.menuLabelDanger]}>
                  {item.label}
                </AppText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.gray400} />
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
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.gray900,
  },
  profileCard: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginHorizontal: 24,
    marginBottom: 24,
    backgroundColor: colors.gray50,
    borderRadius: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.white,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.gray900,
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
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  menuIconText: {
    fontSize: 20,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray900,
  },
  menuLabelDanger: {
    color: colors.error,
  },
  menuArrow: {
    fontSize: 24,
    color: colors.gray400,
  },
});
