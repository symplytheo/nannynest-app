import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Keyboard,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppText from "~/components/common/app-text";
import type { ChatMessage } from "~/constants/orders";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

type ChatModalProps = {
  visible: boolean;
  messages: ChatMessage[];
  onClose: () => void;
  onSendMessage: (text: string) => void;
};

export default function ChatModal({ visible, messages, onClose, onSendMessage }: ChatModalProps) {
  const [inputText, setInputText] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText.trim());
      setInputText("");
    }
  };

  // Group messages by timestamp
  const groupedMessages: { timestamp: string; messages: ChatMessage[] }[] = [];
  let currentGroup: { timestamp: string; messages: ChatMessage[] } | null = null;

  messages.forEach((message) => {
    if (!currentGroup || currentGroup.timestamp !== message.timestamp) {
      currentGroup = { timestamp: message.timestamp, messages: [message] };
      groupedMessages.push(currentGroup);
    } else {
      currentGroup.messages.push(message);
    }
  });

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <TouchableOpacity style={styles.closeButton} onPress={onClose} activeOpacity={0.7}>
                  <Ionicons name="close" size={24} color={colors.gray900} />
                </TouchableOpacity>
                <AppText style={styles.headerTitle}>Chat</AppText>
                <TouchableOpacity style={styles.closeButton} activeOpacity={0.7}>
                  <Ionicons name="information-circle-outline" size={24} color={colors.gray900} />
                </TouchableOpacity>
              </View>

              <View style={styles.modalContent}>
                <View style={styles.handleContainer}>
                  <View style={styles.handle} />
                </View>

                {/* modal header */}
                <View style={styles.modalHeader}>
                  <AppText style={styles.headerTitle}>Chat</AppText>
                </View>
                {/* Messages */}
                <ScrollView
                  ref={scrollViewRef}
                  style={styles.messagesContainer}
                  contentContainerStyle={styles.messagesContent}
                  showsVerticalScrollIndicator={false}
                  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
                >
                  {groupedMessages.map((group, groupIndex) => (
                    <View key={groupIndex}>
                      {/* Timestamp */}
                      <View style={styles.timestampContainer}>
                        <AppText style={styles.timestamp}>{group.timestamp}</AppText>
                      </View>

                      {/* Messages in this group */}
                      {group.messages.map((message) => (
                        <View
                          key={message.id}
                          style={[
                            styles.messageBubble,
                            message.sender === "user" ? styles.userBubble : styles.nannyBubble,
                          ]}
                        >
                          <AppText
                            style={[
                              styles.messageText,
                              message.sender === "user" ? styles.userText : styles.nannyText,
                            ]}
                          >
                            {message.text}
                          </AppText>
                        </View>
                      ))}
                    </View>
                  ))}
                </ScrollView>

                {/* Input */}
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Type..."
                    placeholderTextColor={colors.gray400}
                    value={inputText}
                    onChangeText={setInputText}
                    multiline
                    maxLength={500}
                  />
                  <TouchableOpacity
                    style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!inputText.trim()}
                    activeOpacity={0.7}
                  >
                    <Ionicons
                      name="send"
                      size={20}
                      color={inputText.trim() ? colors.white : colors.gray400}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: "90%",
    overflow: "scroll",
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: "center",
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 100,
    backgroundColor: colors.gray300,
  },
  modalHeader: {
    height: 42,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
  },

  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    overflow: "scroll",
    paddingTop: 56,
  },
  timestampContainer: {
    alignItems: "center",
    marginVertical: 12,
  },
  timestamp: {
    fontSize: 12,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: colors.secondary400,
    borderBottomRightRadius: 4,
  },
  nannyBubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.gray100,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    lineHeight: 20,
  },
  userText: {
    color: colors.white,
  },
  nannyText: {
    color: colors.gray900,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray50,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray900,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary400,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray200,
  },
});
