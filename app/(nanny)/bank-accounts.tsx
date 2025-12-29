import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenHeader } from "~/components/common";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import BankCard from "~/components/wallet/bank-card";
import { MOCK_BANK_ACCOUNTS, type BankAccount } from "~/constants/wallet";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function BankAccountsScreen() {
  const [accounts, setAccounts] = useState<BankAccount[]>(MOCK_BANK_ACCOUNTS);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);

  const handleDeletePress = (accountId: string) => {
    setSelectedAccountId(accountId);
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    if (selectedAccountId) {
      setAccounts(accounts.filter((account) => account.id !== selectedAccountId));
      setDeleteModalVisible(false);
      setSelectedAccountId(null);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setSelectedAccountId(null);
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScreenHeader title="Banks" />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {accounts.map((account) => (
            <BankCard
              key={account.id}
              accountName={account.accountName}
              accountNumber={account.accountNumber}
              bankName={account.bankName}
              onDelete={() => handleDeletePress(account.id)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal
        visible={deleteModalVisible}
        transparent
        animationType="slide"
        onRequestClose={handleCancelDelete}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={handleCancelDelete}
        >
          {/* conntent */}
          <TouchableOpacity
            style={styles.modalContent}
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Drag Handle (Dummy) */}
            <View style={styles.handleContainer}>
              <View style={styles.handle} />
            </View>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Delete Account</AppText>
            </View>

            <AppText style={styles.modalMessage}>Are you sure want to delete this account?</AppText>

            <View style={styles.modalButtons}>
              <AppButton
                label="Delete account"
                variant="filled"
                color="error"
                onPress={handleConfirmDelete}
                fullWidth
                style={styles.deleteButton}
                size="small"
              />
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelDelete}>
                <AppText style={styles.cancelText}>Cancel</AppText>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000040",
    justifyContent: "flex-end",
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 40,
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  handleContainer: {
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  handle: {
    width: 36,
    height: 5,
    borderRadius: 100,
    backgroundColor: colors.gray300,
  },
  modalHeader: {
    marginBottom: 32,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: fontWeights.bold,
    color: colors.gray900,
  },
  modalMessage: {
    fontSize: 16,
    fontWeight: fontWeights.regular,
    color: colors.gray700,
    marginBottom: 32,
    lineHeight: 20,
  },
  modalButtons: {
    gap: 16,
  },
  deleteButton: {
    borderRadius: 100,
    backgroundColor: colors.error500,
  },
  cancelButton: {
    paddingVertical: 12,
    height: 44,
    borderRadius: 100,
    backgroundColor: colors.white,
    borderColor: colors.gray300,
    borderWidth: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  cancelText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.gray700,
    lineHeight: 16,
    textAlign: "center",
  },
});
