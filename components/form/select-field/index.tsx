import React, { useState } from "react";
import { FlatList, Modal, StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { colors, typography } from "~/theme";
import AppText from "../../common/app-text";

/**
 * Option item interface for SelectField
 * @interface SelectOption
 */
export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

/**
 * SelectField component props interface
 *
 * @interface SelectFieldProps
 *
 * @property {string} [label] - Label text displayed above the select field
 * @property {string} [placeholder="Select an option"] - Placeholder text when no option is selected
 * @property {SelectOption[]} options - Array of selectable options
 * @property {string | number} [value] - Currently selected value
 * @property {function} [onValueChange] - Callback when selection changes
 * @property {string} [error] - Error message displayed below the field
 * @property {boolean} [isDisabled=false] - Disables the select field
 * @property {boolean} [fullWidth=true] - Whether select takes full width
 * @property {React.ReactNode} [leftIcon] - Icon displayed on the left side
 * @property {string} [helperText] - Helper text displayed below field
 * @property {ViewStyle} [style] - Custom styles for the container
 *
 * @example
 * ```tsx
 * // Basic select field
 * const options = [
 *   { label: "Option 1", value: "1" },
 *   { label: "Option 2", value: "2" },
 *   { label: "Option 3", value: "3" },
 * ];
 *
 * <SelectField
 *   label="Choose an option"
 *   options={options}
 *   value={selectedValue}
 *   onValueChange={setSelectedValue}
 *   placeholder="Select..."
 * />
 *
 * // With icon and error
 * <SelectField
 *   label="Category"
 *   options={categories}
 *   value={category}
 *   onValueChange={setCategory}
 *   leftIcon={<CategoryIcon />}
 *   error="Category is required"
 * />
 *
 * // With disabled option
 * const options = [
 *   { label: "Available", value: "1" },
 *   { label: "Out of Stock", value: "2", disabled: true },
 * ];
 * ```
 */
export interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  error?: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  helperText?: string;
  style?: ViewStyle;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onValueChange,
  error,
  isDisabled = false,
  fullWidth = true,
  leftIcon,
  helperText,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedOption = options.find((opt) => opt.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option: SelectOption) => {
    if (!option.disabled) {
      onValueChange?.(option.value);
      setModalVisible(false);
      setSearchQuery("");
    }
  };

  return (
    <View style={[styles.container, fullWidth && { width: "100%" }, style]}>
      {label && <AppText style={styles.label}>{label}</AppText>}

      <TouchableOpacity
        style={[styles.selectWrapper, error && styles.errorBorder, isDisabled && styles.disabled]}
        onPress={() => !isDisabled && setModalVisible(true)}
        disabled={isDisabled}
        activeOpacity={0.7}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}

        <AppText
          style={[
            styles.selectText,
            !selectedOption && styles.placeholderText,
            isDisabled && styles.disabledText,
          ]}
          numberOfLines={1}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </AppText>

        <AppText style={[styles.dropdownIcon, isDisabled && styles.disabledText]}>▼</AppText>
      </TouchableOpacity>

      {error && <AppText style={styles.errorText}>{error}</AppText>}
      {!error && helperText && <AppText style={styles.helperText}>{helperText}</AppText>}

      {/* Options Selection Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <AppText style={styles.modalTitle}>{label || "Select Option"}</AppText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <AppText style={styles.closeButton}>✕</AppText>
              </TouchableOpacity>
            </View>

            {/* Search functionality commented out for now - can be enabled with TextInput
            {options.length > 5 && (
              <View style={styles.searchContainer}>
                <AppText style={styles.searchIcon}>🔍</AppText>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            )} */}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    value === item.value && styles.selectedOptionItem,
                    item.disabled && styles.disabledOption,
                  ]}
                  onPress={() => handleSelect(item)}
                  disabled={item.disabled}
                >
                  <AppText
                    style={[
                      styles.optionText,
                      value === item.value && styles.selectedOptionText,
                      item.disabled && styles.disabledText,
                    ]}
                  >
                    {item.label}
                  </AppText>
                  {value === item.value && <AppText style={styles.checkmark}>✓</AppText>}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <AppText style={styles.emptyText}>No options found</AppText>
                </View>
              }
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
    color: colors.gray700,
    marginBottom: 4,
  },
  selectWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    backgroundColor: colors.white,
    minHeight: 52,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  selectText: {
    flex: 1,
    ...typography.bodyMedium,
    color: colors.black,
  },
  placeholderText: {
    color: colors.gray400,
  },
  dropdownIcon: {
    ...typography.caption,
    color: colors.gray500,
    marginLeft: 8,
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
    maxHeight: "70%",
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 8,
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    ...typography.bodyMedium,
    paddingVertical: 12,
    color: colors.black,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray100,
  },
  selectedOptionItem: {
    backgroundColor: colors.primary50,
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    ...typography.bodyMedium,
    color: colors.gray800,
    flex: 1,
  },
  selectedOptionText: {
    color: colors.primary600,
    fontWeight: 600,
  },
  checkmark: {
    ...typography.bodyLarge,
    color: colors.primary600,
    fontWeight: 700,
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    ...typography.bodyMedium,
    color: colors.gray400,
  },
});

export default SelectField;
