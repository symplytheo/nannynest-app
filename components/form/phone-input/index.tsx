import React, { useState } from "react";
import {
  FlatList,
  Modal,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, typography } from "~/theme";
import AppText from "../../common/app-text";

/**
 * Country code data interface
 * @interface CountryCode
 */
export interface CountryCode {
  code: string;
  dial_code: string;
  name: string;
}

/**
 * Popular country codes with dial codes
 */
const COUNTRY_CODES: CountryCode[] = [
  { code: "US", dial_code: "+1", name: "United States" },
  { code: "GB", dial_code: "+44", name: "United Kingdom" },
  { code: "CA", dial_code: "+1", name: "Canada" },
  { code: "AU", dial_code: "+61", name: "Australia" },
  { code: "NG", dial_code: "+234", name: "Nigeria" },
  { code: "GH", dial_code: "+233", name: "Ghana" },
  { code: "KE", dial_code: "+254", name: "Kenya" },
  { code: "ZA", dial_code: "+27", name: "South Africa" },
  { code: "IN", dial_code: "+91", name: "India" },
  { code: "CN", dial_code: "+86", name: "China" },
  { code: "JP", dial_code: "+81", name: "Japan" },
  { code: "DE", dial_code: "+49", name: "Germany" },
  { code: "FR", dial_code: "+33", name: "France" },
  { code: "IT", dial_code: "+39", name: "Italy" },
  { code: "ES", dial_code: "+34", name: "Spain" },
  { code: "BR", dial_code: "+55", name: "Brazil" },
  { code: "MX", dial_code: "+52", name: "Mexico" },
  { code: "AR", dial_code: "+54", name: "Argentina" },
];

/**
 * PhoneInput component props interface
 *
 * @interface PhoneInputProps
 * @extends {Omit<RNTextInputProps, "value" | "onChangeText">}
 *
 * @property {string} [label] - Label text displayed above the input
 * @property {string} [error] - Error message displayed below the input
 * @property {string} [value] - Full phone number value (including country code)
 * @property {function} [onChangeText] - Callback when phone number changes
 * @property {string} [defaultCountryCode="+1"] - Default country dial code
 * @property {boolean} [isDisabled=false] - Disables the input
 * @property {boolean} [fullWidth=true] - Whether input takes full width
 * @property {string} [helperText] - Helper text displayed below input
 *
 * @example
 * ```tsx
 * // Basic phone input
 * <PhoneInput
 *   label="Phone Number"
 *   value={phoneNumber}
 *   onChangeText={setPhoneNumber}
 *   placeholder="Enter phone number"
 * />
 *
 * // With custom default country
 * <PhoneInput
 *   label="Mobile"
 *   defaultCountryCode="+234"
 *   value={phone}
 *   onChangeText={setPhone}
 * />
 *
 * // With validation error
 * <PhoneInput
 *   label="Contact Number"
 *   value={phone}
 *   onChangeText={setPhone}
 *   error="Invalid phone number"
 * />
 * ```
 */
export interface PhoneInputProps extends Omit<RNTextInputProps, "value" | "onChangeText"> {
  label?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  defaultCountryCode?: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  label,
  error,
  value = "",
  onChangeText,
  defaultCountryCode = "+1",
  isDisabled = false,
  fullWidth = true,
  helperText,
  ...props
}) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>(
    COUNTRY_CODES.find((c) => c.dial_code === defaultCountryCode) || COUNTRY_CODES[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = COUNTRY_CODES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial_code.includes(searchQuery) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (country: CountryCode) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery("");
  };

  const handlePhoneChange = (text: string) => {
    // Remove non-numeric characters except plus
    const cleaned = text.replace(/[^\d+]/g, "");
    onChangeText?.(cleaned);
  };

  return (
    <View style={[styles.container, fullWidth && { width: "100%" }]}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <View
        style={[styles.inputWrapper, error && styles.errorBorder, isDisabled && styles.disabled]}
      >
        <TouchableOpacity
          style={styles.countrySelector}
          onPress={() => !isDisabled && setModalVisible(true)}
          disabled={isDisabled}
        >
          <AppText style={[styles.countryCode, isDisabled && styles.disabledText]}>
            {selectedCountry.dial_code}
          </AppText>
          <AppText style={[styles.dropdownIcon, isDisabled && styles.disabledText]}>▼</AppText>
        </TouchableOpacity>

        <View style={styles.separator} />

        <RNTextInput
          {...props}
          style={[styles.input, isDisabled && styles.disabledText]}
          value={value}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          editable={!isDisabled}
          placeholderTextColor={colors.gray400}
        />
      </View>

      {error && <AppText style={styles.errorText}>{error}</AppText>}
      {!error && helperText && <AppText style={styles.helperText}>{helperText}</AppText>}

      {/* Country Code Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>Select Country Code</AppText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AppText style={styles.closeButton}>✕</AppText>
              </TouchableOpacity>
            </View>

            <RNTextInput
              style={styles.searchInput}
              placeholder="Search country..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.gray400}
            />

            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.code}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    selectedCountry.code === item.code && styles.selectedCountryItem,
                  ]}
                  onPress={() => handleCountrySelect(item)}
                >
                  <AppText style={styles.countryName}>{item.name}</AppText>
                  <AppText style={styles.countryDialCode}>{item.dial_code}</AppText>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    ...typography.bodySmall,
    fontWeight: 500,
    color: colors.gray900,
    marginBottom: 4,
  },
  inputWrapper: {
    flexDirection: "row",
    paddingHorizontal: 12,
    borderRadius: 15,
    minHeight: 44,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.gray50,
  },
  countrySelector: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 4,
  },
  countryCode: {
    ...typography.caption,
    color: colors.gray900,
    marginRight: 4,
  },
  dropdownIcon: {
    ...typography.caption,
    color: colors.gray500,
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: colors.gray100,
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    ...typography.caption,
    lineHeight: undefined,
    paddingVertical: 0,
    color: colors.black,
  },
  disabled: {
    backgroundColor: colors.gray100,
  },
  disabledText: {
    color: colors.gray400,
  },
  errorBorder: {
    borderColor: colors.error,
  },
  errorText: {
    ...typography.bodySmall,
    color: colors.error,
    marginTop: 4,
  },
  helperText: {
    ...typography.caption,
    color: colors.gray500,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "80%",
    paddingTop: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  modalTitle: {
    ...typography.bodyLarge,
    fontWeight: 600,
    color: colors.gray900,
  },
  closeButton: {
    ...typography.headingSmall,
    color: colors.gray500,
  },
  searchInput: {
    ...typography.bodyMedium,
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  countryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  selectedCountryItem: {
    backgroundColor: colors.primary50,
  },
  countryName: {
    ...typography.bodyMedium,
    color: colors.gray800,
    flex: 1,
  },
  countryDialCode: {
    ...typography.bodyMedium,
    color: colors.gray600,
    fontWeight: 500,
  },
});

export default PhoneInput;
