import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import OrderTabs from "~/components/common/order-tabs";
import ChatModal from "~/components/orders/chat-modal";
import ClientOngoingTab from "~/components/orders/client-ongoing-tab";
import PastOrdersTab from "~/components/orders/past-orders-tab";
import { MOCK_CHAT_MESSAGES, type ChatMessage } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type Tab = "ongoing" | "past";

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("ongoing");

  // Chat modal state
  const [chatVisible, setChatVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT_MESSAGES);

  // Handle send message
  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `m${chatMessages.length + 1}`,
      text,
      sender: "user",
      timestamp: "Just now",
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  const tabs = [
    { key: "ongoing", label: "Ongoing" },
    { key: "past", label: "Past" },
  ];

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <AppText style={styles.headerTitle}>Orders</AppText>
        <TouchableOpacity activeOpacity={0.7}>
          <Ionicons name="options-outline" size={24} color={colors.gray900} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <OrderTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as Tab)}
      />

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {activeTab === "ongoing" ? (
            <ClientOngoingTab onChatOpen={() => setChatVisible(true)} />
          ) : (
            <PastOrdersTab context="client" />
          )}
        </View>
      </ScrollView>

      {/* Chat Modal */}
      <ChatModal
        visible={chatVisible}
        messages={chatMessages}
        onClose={() => setChatVisible(false)}
        onSendMessage={handleSendMessage}
      />
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
});
