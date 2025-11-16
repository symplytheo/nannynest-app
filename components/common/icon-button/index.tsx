import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { colors } from "~/theme";

/**
 * Icon button variant types
 * @typedef {"filled" | "outlined" | "tonal" | "standard"} IconButtonVariant
 */
export type IconButtonVariant = "filled" | "outlined" | "tonal" | "standard";

/**
 * Icon button color schemes
 * @typedef {"primary" | "error" | "success" | "neutral"} IconButtonColor
 */
export type IconButtonColor = "primary" | "error" | "success" | "neutral";

/**
 * Icon button size variants
 * @typedef {"small" | "medium" | "large"} IconButtonSize
 */
export type IconButtonSize = "small" | "medium" | "large";

/**
 * IconButton component props interface
 *
 * @interface IconButtonProps
 *
 * @property {React.ReactNode} icon - Icon element to display (e.g., SVG or icon component)
 * @property {function} [onPress] - Callback function when button is pressed
 * @property {IconButtonVariant} [variant="standard"] - Visual style variant
 * @property {IconButtonColor} [color="primary"] - Color scheme
 * @property {IconButtonSize} [size="medium"] - Button size (small: 36px, medium: 48px, large: 56px)
 * @property {boolean} [disabled=false] - Disables button interaction
 * @property {boolean} [loading=false] - Shows loading spinner instead of icon
 * @property {ViewStyle} [style] - Custom styles to override defaults
 * @property {string} [accessibilityLabel] - Accessibility label for screen readers
 *
 * @example
 * ```tsx
 * // Basic icon button
 * <IconButton
 *   icon={<CloseIcon />}
 *   onPress={handleClose}
 *   accessibilityLabel="Close"
 * />
 *
 * // Filled variant
 * <IconButton
 *   icon={<AddIcon />}
 *   variant="filled"
 *   color="primary"
 *   onPress={handleAdd}
 * />
 *
 * // Outlined with custom size
 * <IconButton
 *   icon={<EditIcon />}
 *   variant="outlined"
 *   size="large"
 *   onPress={handleEdit}
 * />
 *
 * // Loading state
 * <IconButton
 *   icon={<SaveIcon />}
 *   loading={isSaving}
 *   disabled={isSaving}
 * />
 * ```
 */
export interface IconButtonProps {
  icon: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: IconButtonVariant;
  color?: IconButtonColor;
  size?: IconButtonSize;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  onPress,
  variant = "standard",
  color = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  accessibilityLabel,
}) => {
  const sizeStyles = styles[`size_${size}`];
  const variantStyles = styles[`${variant}_${color}`];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        sizeStyles,
        variant !== "standard" && variantStyles,
        disabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "filled"
              ? colors.white
              : color === "primary"
              ? colors.primary400
              : color === "error"
              ? colors.error
              : color === "success"
              ? colors.success
              : colors.gray700
          }
        />
      ) : (
        icon
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50, // Circular
  },

  // Size variants
  size_small: {
    width: 36,
    height: 36,
  },
  size_medium: {
    width: 48,
    height: 48,
  },
  size_large: {
    width: 56,
    height: 56,
  },

  // Filled variant
  filled_primary: {
    backgroundColor: colors.primary400,
  },
  filled_error: {
    backgroundColor: colors.error,
  },
  filled_success: {
    backgroundColor: colors.success,
  },
  filled_neutral: {
    backgroundColor: colors.gray700,
  },

  // Outlined variant
  outlined_primary: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary400,
  },
  outlined_error: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  outlined_success: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.success,
  },
  outlined_neutral: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.gray400,
  },

  // Tonal variant
  tonal_primary: {
    backgroundColor: colors.primary100,
  },
  tonal_error: {
    backgroundColor: colors.error + "20", // 20% opacity
  },
  tonal_success: {
    backgroundColor: colors.success + "20", // 20% opacity
  },
  tonal_neutral: {
    backgroundColor: colors.gray200,
  },

  // Standard variant (no background, just ripple effect)
  standard_primary: {
    backgroundColor: "transparent",
  },
  standard_error: {
    backgroundColor: "transparent",
  },
  standard_success: {
    backgroundColor: "transparent",
  },
  standard_neutral: {
    backgroundColor: "transparent",
  },

  // Disabled state
  disabled: {
    opacity: 0.5,
  },
});

export default IconButton;
