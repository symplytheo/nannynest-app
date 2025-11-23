import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppText from "~/components/common/app-text";
import AppButton from "~/components/common/button";
import colors from "~/theme/colors";

type DocumentType = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  uploaded: boolean;
};

export default function KYCDocumentsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [documents, setDocuments] = useState<DocumentType[]>([
    {
      id: "1",
      title: "Government-issued ID",
      description: "Driver's license, passport, or national ID",
      required: true,
      uploaded: false,
    },
    {
      id: "2",
      title: "Childcare Certification",
      description: "CPR, First Aid, or relevant childcare certificates",
      required: true,
      uploaded: false,
    },
    {
      id: "3",
      title: "Background Check",
      description: "Criminal background check (less than 6 months old)",
      required: true,
      uploaded: false,
    },
    {
      id: "4",
      title: "Professional References",
      description: "Contact information for at least 2 references",
      required: false,
      uploaded: false,
    },
  ]);

  const handleUploadDocument = (docId: string) => {
    // TODO: Implement document upload with image picker
    console.log("Upload document:", docId);

    // Simulate upload
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === docId ? { ...doc, uploaded: true } : doc))
    );
  };

  const handleSubmit = async () => {
    const allRequiredUploaded = documents
      .filter((doc) => doc.required)
      .every((doc) => doc.uploaded);

    if (!allRequiredUploaded) {
      alert("Please upload all required documents");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("/(nanny)/kyc-status" as any);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <AppText style={styles.backButtonText}>‹</AppText>
        </TouchableOpacity>
        <AppText style={styles.headerTitle}>Document Upload</AppText>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: "66%" }]} />
        </View>
        <AppText style={styles.progressText}>Step 2 of 3</AppText>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={styles.instructions}>
          Please upload clear photos or scans of the following documents:
        </AppText>

        <View style={styles.documentsContainer}>
          {documents.map((doc) => (
            <View key={doc.id} style={styles.documentCard}>
              <View style={styles.documentHeader}>
                <View style={styles.documentInfo}>
                  <AppText style={styles.documentTitle}>
                    {doc.title}
                    {doc.required && <AppText style={styles.requiredBadge}> *</AppText>}
                  </AppText>
                  <AppText style={styles.documentDescription}>{doc.description}</AppText>
                </View>
                {doc.uploaded && (
                  <View style={styles.uploadedBadge}>
                    <AppText style={styles.uploadedCheck}>✓</AppText>
                  </View>
                )}
              </View>

              <TouchableOpacity
                style={[styles.uploadButton, doc.uploaded && styles.uploadButtonUploaded]}
                onPress={() => handleUploadDocument(doc.id)}
                activeOpacity={0.7}
              >
                <AppText
                  style={[styles.uploadButtonText, doc.uploaded && styles.uploadButtonTextUploaded]}
                >
                  {doc.uploaded ? "✓ Uploaded" : "📁 Upload Document"}
                </AppText>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Info Card */}
        <View style={styles.infoCard}>
          <AppText style={styles.infoTitle}>Document Guidelines</AppText>
          <AppText style={styles.infoText}>
            • Documents must be clear and readable{"\n"}• Files should be in PDF, JPG, or PNG format
            {"\n"}• Maximum file size: 10MB per document{"\n"}• All personal information must be
            visible
          </AppText>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <AppButton
          label="Submit for Review"
          variant="filled"
          color="brand"
          onPress={handleSubmit}
          loading={loading}
          disabled={loading}
          fullWidth
        />
      </View>
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
    alignItems: "center",
  },
  backButtonText: {
    fontSize: 32,
    color: colors.gray900,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.gray900,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray200,
    borderRadius: 4,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.primary400,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  instructions: {
    fontSize: 16,
    color: colors.gray700,
    marginBottom: 24,
    lineHeight: 24,
  },
  documentsContainer: {
    gap: 16,
    marginBottom: 24,
  },
  documentCard: {
    padding: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  documentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.gray900,
    marginBottom: 4,
  },
  requiredBadge: {
    color: colors.error,
  },
  documentDescription: {
    fontSize: 14,
    color: colors.gray600,
    lineHeight: 20,
  },
  uploadedBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.success,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedCheck: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },
  uploadButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.primary400,
    borderRadius: 999,
    alignItems: "center",
  },
  uploadButtonUploaded: {
    backgroundColor: colors.success,
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  uploadButtonTextUploaded: {
    color: colors.white,
  },
  infoCard: {
    padding: 20,
    backgroundColor: colors.primary100,
    borderRadius: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primary600,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: colors.gray700,
    lineHeight: 22,
  },
  bottomBar: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});
