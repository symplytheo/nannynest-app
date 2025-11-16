import React, { useState } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import EyeIcon from "~/assets/icons/eye";
import EyeOffIcon from "~/assets/icons/eye-off";
import { colors } from "~/theme";
import AppText from "../../common/app-text";
import { styles } from "./styles";

/**
 * Input field variant types
 * @typedef {"outlined" | "filled"} InputVariant
 */
export type InputVariant = "outlined" | "filled";

/**
 * TextField component props interface
 *
 * @interface TextFieldProps
 * @extends {RNTextInputProps}
 *
 * @property {string} [label] - Label text displayed above the input field
 * @property {string} [error] - Error message displayed below the input (typically from validation)
 * @property {React.ReactNode} [leftIcon] - Icon displayed on the left side of the input
 * @property {React.ReactNode} [rightIcon] - Icon displayed on the right side of the input
 * @property {InputVariant} [variant="outlined"] - Visual style variant (outlined or filled)
 * @property {boolean} [isPassword=false] - Enables secure text entry with show/hide toggle
 * @property {boolean} [isDisabled=false] - Disables the input field
 * @property {boolean} [fullWidth=true] - Whether input should take full width of container
 * @property {boolean} [multiline=false] - Enables multiline text input (TextArea mode)
 * @property {string} [helperText] - Helper text displayed below the input (when no error)
 *
 * @example
 * ```tsx
 * // Basic text input
 * <TextField
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 * />
 *
 * // Password input with toggle
 * <TextField
 *   label="Password"
 *   isPassword
 *   placeholder="Enter password"
 * />
 *
 * // Multiline text area
 * <TextField
 *   label="Description"
 *   multiline
 *   numberOfLines={4}
 *   placeholder="Enter description..."
 * />
 *
 * // With icon and error
 * <TextField
 *   label="Username"
 *   leftIcon={<PersonIcon />}
 *   error="Username is required"
 * />
 * ```
 */
export type TextFieldProps = {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: InputVariant;
  isPassword?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  helperText?: string;
} & RNTextInputProps;

const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  leftIcon,
  rightIcon,
  variant = "outlined",
  isPassword = false,
  isDisabled = false,
  fullWidth = true,
  multiline = false,
  helperText,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={[styles.container, fullWidth && { width: "100%" }]}>
      {label && <AppText style={styles.label}>{label}</AppText>}
      <View
        style={[
          styles.inputWrapper,
          { alignItems: multiline ? "flex-start" : "center" },
          styles[variant],
          error && styles.errorBorder,
          isDisabled && styles.disabled,
        ]}
      >
        {leftIcon && (
          <View style={[styles.icon, { marginTop: multiline ? 8 : 4 }]}>{leftIcon}</View>
        )}

        <RNTextInput
          {...props}
          style={[styles.input, multiline && styles.multiline, isDisabled && styles.disabledText]}
          secureTextEntry={isPassword && !showPassword}
          editable={!isDisabled}
          multiline={multiline}
          placeholderTextColor={colors.gray400}
        />

        {isPassword && (
          <TouchableOpacity
            style={[styles.icon, { marginTop: multiline ? 8 : 4 }]}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </TouchableOpacity>
        )}

        {!isPassword && rightIcon && (
          <View style={[styles.icon, { marginTop: multiline ? 8 : 4 }]}>{rightIcon}</View>
        )}
      </View>

      {error && <AppText style={styles.errorText}>{error}</AppText>}
      {!error && helperText && <AppText style={styles.helperText}>{helperText}</AppText>}
    </View>
  );
};

export default TextField;
