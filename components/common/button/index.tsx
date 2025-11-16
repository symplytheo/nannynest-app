import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import AppText from "../app-text";
import { styles } from "./styles";

/**
 * Button variant types following Material Design 3 guidelines
 * @typedef {"filled" | "outlined" | "tonal" | "text"} ButtonVariant
 */
export type ButtonVariant = "filled" | "outlined" | "tonal" | "text";

/**
 * Button color schemes
 * @typedef {"brand" | "error" | "success"} ButtonColor
 */
export type ButtonColor = "brand" | "error" | "success";

/**
 * Button size variants
 * @typedef {"small" | "medium" | "large"} ButtonSize
 */
export type ButtonSize = "small" | "medium" | "large";

/**
 * AppButton component props interface
 *
 * @interface AppButtonProps
 * @property {string} label - The text to display on the button
 * @property {ButtonVariant} [variant="filled"] - Button style variant (filled, outlined, tonal, text)
 * @property {ButtonColor} [color="brand"] - Button color scheme (brand, error, success)
 * @property {ButtonSize} [size="large"] - Button size (small: 40px, medium: 48px, large: 56px)
 * @property {boolean} [fullWidth=false] - Whether button should take full width of container
 * @property {boolean} [padless=false] - Removes horizontal and vertical padding
 * @property {function} [onPress] - Callback function when button is pressed
 * @property {boolean} [disabled=false] - Disables button interaction and applies disabled styling
 * @property {boolean} [loading=false] - Shows loading spinner and disables interaction
 * @property {React.ReactNode} [leftIcon] - Icon to display on the left side of label
 * @property {React.ReactNode} [rightIcon] - Icon to display on the right side of label
 * @property {React.ReactNode} [children] - Alternative to label prop for complex content
 * @property {ViewStyle} [style] - Custom styles to override default button styles
 *
 * @example
 * ```tsx
 * // Basic filled button
 * <AppButton label="Submit" onPress={handleSubmit} />
 *
 * // Outlined button with icon
 * <AppButton
 *   label="Add Item"
 *   variant="outlined"
 *   leftIcon={<PlusIcon />}
 *   onPress={handleAdd}
 * />
 *
 * // Loading state button
 * <AppButton
 *   label="Saving..."
 *   loading={isLoading}
 *   disabled={isLoading}
 * />
 * ```
 */
type AppButtonProps = {
  label: string;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  padless?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
};

const AppButton: React.FC<AppButtonProps> = ({
  label,
  variant = "filled",
  color = "brand",
  size = "large",
  fullWidth = false,
  onPress,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  children,
  padless = false,
  style,
}) => {
  const labelStyles = [
    styles.label,
    styles[`${size}_label`],
    styles[`${variant}_${color}_text`],
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        styles[`${variant}_${color}`],
        styles[size],
        fullWidth && styles.fullWidth,
        padless && styles.padless,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.8}
    >
      {loading && (
        <ActivityIndicator
          size="small"
          color={variant === "filled" ? "white" : undefined}
          style={styles.spinner}
        />
      )}
      {!loading && leftIcon && <View style={styles.icon}>{leftIcon}</View>}
      <AppText style={labelStyles}>{label || children}</AppText>
      {!loading && rightIcon && <View style={styles.icon}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

export default AppButton;
