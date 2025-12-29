import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import { MOCK_TRANSACTION_DETAILS } from "~/constants/wallet";
import colors from "~/theme/colors";
import { fontWeights } from "~/theme/typography";

export default function TransactionDetailsScreen() {
  const router = useRouter();

  const formatCurrency = (amount: number) => {
    return `₦ ${amount.toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Close Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => router.back()}>
          <Ionicons name="close" size={20} color={colors.gray900} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Amount */}
          <View style={styles.section}>
            <AppText style={styles.label}>Amount</AppText>
            <AppText style={styles.amount}>
              {formatCurrency(MOCK_TRANSACTION_DETAILS.amount)}
            </AppText>
          </View>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Bank</AppText>
              <AppText style={styles.detailValue}>{MOCK_TRANSACTION_DETAILS.bank}</AppText>
            </View>

            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Recipient</AppText>
              <View style={styles.detailValueContainer}>
                <AppText style={styles.detailValue}>
                  {MOCK_TRANSACTION_DETAILS.recipientName}
                </AppText>
                <AppText style={styles.detailValue}>
                  {MOCK_TRANSACTION_DETAILS.recipientAccount}
                </AppText>
              </View>
            </View>
            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Created on</AppText>
              <AppText style={styles.detailValue}>{MOCK_TRANSACTION_DETAILS.createdOn}</AppText>
            </View>
            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Processed on</AppText>
              <AppText style={styles.detailValue}>{MOCK_TRANSACTION_DETAILS.processedOn}</AppText>
            </View>
            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Status</AppText>
              <View style={styles.statusBadge}>
                <AppText style={styles.statusText}>{MOCK_TRANSACTION_DETAILS.status}</AppText>
              </View>
            </View>
            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Reference</AppText>
              <AppText style={styles.detailValue}>{MOCK_TRANSACTION_DETAILS.reference}</AppText>
            </View>
            {/* divider */}
            <View style={styles.divider} />

            <View style={styles.detailRow}>
              <AppText style={styles.detailLabel}>Fee</AppText>
              <AppText style={styles.detailValue}>
                {formatCurrency(MOCK_TRANSACTION_DETAILS.fee)}
              </AppText>
            </View>
          </View>

          {/* Download Receipt */}
          <TouchableOpacity>
            <AppText style={styles.downloadText}>Download Receipt</AppText>
          </TouchableOpacity>
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
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray100,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  label: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    marginBottom: 8,
  },
  amount: {
    fontSize: 24,
    fontWeight: fontWeights.semiBold,
    color: colors.gray900,
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  detailsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray200,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: fontWeights.regular,
    color: colors.gray500,
    flex: 1,
  },
  detailValueContainer: {
    alignItems: "flex-end",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: fontWeights.medium,
    color: colors.gray900,
    textAlign: "right",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: colors.success400,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: fontWeights.medium,
    lineHeight: 12,
    color: colors.white,
  },

  downloadText: {
    fontSize: 14,
    fontWeight: fontWeights.semiBold,
    color: colors.primary400,
  },
});
