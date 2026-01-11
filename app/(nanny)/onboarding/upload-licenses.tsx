import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Modal,
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

interface Certificate {
  id: string;
  name: string;
  file?: string;
}

interface LicenseFormData {
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
}

export default function UploadLicensesScreen() {
  const router = useRouter();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const { control, handleSubmit, reset } = useForm<LicenseFormData>({
    defaultValues: {
      certificationName: "",
      issuingOrganization: "",
      issueDate: "",
    },
  });

  const handleAddCertificate = () => {
    setShowAddForm(true);
  };

  const handleUploadCertificate = () => {
    // Implement file upload logic
    console.log("Upload certificate");
  };

  const handleRemoveCertificate = (id: string) => {
    setCertificates(certificates.filter((cert) => cert.id !== id));
  };

  const onSubmit = (data: LicenseFormData) => {
    const newCert: Certificate = {
      id: Date.now().toString(),
      name: data.certificationName,
    };
    setCertificates([...certificates, newCert]);
    reset();
    setShowAddForm(false);
  };

  const handleContinue = () => {
    if (certificates.length === 0) {
      // Skip to next step
      router.back();
    } else {
      // Navigate to next step
      router.back();
    }
  };

  return (
    <>
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
          <AuthHeader title="License & Certification" showBackButton />

          {/* Content */}
          <View style={authStyles.content}>
            {/* Certificate List */}
            {certificates.length > 0 && (
              <View style={styles.certificateList}>
                {certificates.map((cert) => (
                  <View key={cert.id} style={styles.certificateItem}>
                    <View style={styles.certificateIcon}>
                      <Ionicons name="document-text-outline" size={24} color={colors.primary400} />
                    </View>
                    <View style={styles.certificateInfo}>
                      <AppText style={styles.certificateName}>Certificate name</AppText>
                      <AppText style={styles.certificateFile}>Issue Date: MM/YY/YY</AppText>
                    </View>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => handleRemoveCertificate(cert.id)}
                    >
                      <Ionicons name="trash-outline" size={20} color={colors.error500} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {/* Add Certification Button */}
            <TouchableOpacity style={styles.addButton} onPress={handleAddCertificate}>
              <Ionicons name="add" size={24} color={colors.primary400} />
              <View style={styles.addButtonTextContainer}>
                <AppText style={styles.addButtonText}>Add certification</AppText>
                <AppText style={styles.addButtonSubtext}>Add your certification & license</AppText>
              </View>
            </TouchableOpacity>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
              <AppButton
                label="Continue"
                variant="filled"
                color="brand"
                onPress={handleContinue}
                fullWidth
                size="small"
              />
              {certificates.length === 0 && (
                <AppButton
                  label="Skip"
                  variant="text"
                  color="brand"
                  onPress={() => router.back()}
                  fullWidth
                  size="small"
                  style={styles.skipButton}
                />
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Add Certification Modal */}
      <Modal
        visible={showAddForm}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAddForm(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.modalHeader}>
            <AppText style={styles.modalTitle}>Add Certification</AppText>
            <TouchableOpacity onPress={() => setShowAddForm(false)} style={styles.closeButton}>
              <Ionicons name="close" size={28} color={colors.gray900} />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            contentContainerStyle={styles.modalScrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.form}>
              {/* Certification Name */}
              <ControlledTextField
                control={control}
                name="certificationName"
                label="Name of certification"
                placeholder="Ex: Certificate of nanny"
                rules={{
                  required: "Certification name is required",
                }}
              />

              {/* Issuing Organization */}
              <ControlledTextField
                control={control}
                name="issuingOrganization"
                label="Issuing organization"
                placeholder="Ex: NannyNest"
                rules={{
                  required: "Issuing organization is required",
                }}
              />

              {/* Issue Date */}
              <ControlledTextField
                control={control}
                name="issueDate"
                label="Issue Date"
                placeholder="DD/MM/YYYY"
                rules={{
                  required: "Issue date is required",
                }}
              />

              {/* Upload Certificate */}
              <View style={styles.uploadSection}>
                <AppText style={styles.uploadLabel}>Upload certificate</AppText>
                <AppText style={styles.uploadSubtext}>JPEG format • Max: 5MB</AppText>
                <TouchableOpacity style={styles.uploadButton} onPress={handleUploadCertificate}>
                  <Ionicons name="cloud-upload-outline" size={24} color={colors.gray600} />
                  <AppText style={styles.uploadButtonText}>Upload</AppText>
                </TouchableOpacity>
              </View>

              {/* Add Certificate Button */}
              <AppButton
                label="Add Certification"
                variant="filled"
                color="brand"
                onPress={handleSubmit(onSubmit)}
                fullWidth
                size="small"
                style={styles.addCertButton}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.gray300,
    backgroundColor: colors.white,
    marginBottom: 24,
  },
  addButtonTextContainer: {
    flex: 1,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.gray900,
    marginBottom: 4,
  },
  addButtonSubtext: {
    fontSize: 13,
    color: colors.gray500,
  },
  certificateList: {
    gap: 16,
    marginBottom: 24,
  },
  certificateItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.gray200,
  },
  certificateIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary50,
    justifyContent: "center",
    alignItems: "center",
  },
  certificateInfo: {
    flex: 1,
  },
  certificateName: {
    fontSize: 15,
    fontWeight: "500",
    color: colors.gray900,
    marginBottom: 4,
  },
  certificateFile: {
    fontSize: 13,
    color: colors.gray500,
  },
  removeButton: {
    padding: 8,
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
    paddingVertical: 16,
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
  addCertButton: {
    marginTop: 16,
  },
  bottomButtons: {
    gap: 16,
    marginTop: 32,
  },
  skipButton: {
    marginTop: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.gray900,
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    flex: 1,
  },
  modalScrollContent: {
    padding: 20,
  },
});
