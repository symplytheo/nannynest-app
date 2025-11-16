/**
 * QUICK REFERENCE: Component Props & Types
 *
 * This file provides a quick lookup for all component props.
 * Import this file in your IDE for intellisense support.
 */

// ==================== COMMON COMPONENTS ====================

/**
 * AppButton Props
 */
export interface AppButtonProps {
  label: string;
  variant?: "filled" | "outlined" | "tonal" | "text";
  color?: "brand" | "error" | "success";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  padless?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  style?: ViewStyle;
}

/**
 * IconButton Props
 */
export interface IconButtonProps {
  icon: React.ReactNode;
  onPress?: () => void;
  variant?: "filled" | "outlined" | "tonal" | "standard";
  color?: "primary" | "error" | "success" | "neutral";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  accessibilityLabel?: string;
}

// ==================== FORM COMPONENTS ====================

/**
 * TextField Props
 */
export interface TextFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "outlined" | "filled";
  isPassword?: boolean;
  isDisabled?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  helperText?: string;
}

/**
 * PhoneInput Props
 */
export interface PhoneInputProps extends Omit<TextInputProps, "value" | "onChangeText"> {
  label?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  defaultCountryCode?: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  helperText?: string;
}

/**
 * SelectField Props
 */
export interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string | number;
    disabled?: boolean;
  }[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  error?: string;
  isDisabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  helperText?: string;
  style?: ViewStyle;
}

// ==================== CONTROLLED COMPONENTS ====================

/**
 * ControlledTextField Props
 */
export interface ControlledTextFieldProps<T>
  extends Omit<TextFieldProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: string;
  rules?: {
    required?: string | boolean;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    validate?: (value: any) => boolean | string;
  };
}

/**
 * ControlledPhoneInput Props
 */
export interface ControlledPhoneInputProps<T>
  extends Omit<PhoneInputProps, "value" | "onChangeText"> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: string;
  rules?: {
    required?: string | boolean;
    pattern?: { value: RegExp; message: string };
    validate?: (value: any) => boolean | string;
  };
}

/**
 * ControlledSelectField Props
 */
export interface ControlledSelectFieldProps<T>
  extends Omit<SelectFieldProps, "value" | "onValueChange"> {
  control: Control<T>;
  name: Path<T>;
  defaultValue?: string | number;
  rules?: {
    required?: string | boolean;
    validate?: (value: any) => boolean | string;
  };
}

// ==================== COMMON PATTERNS ====================

/**
 * Validation Rules Examples
 */
const validationExamples = {
  required: { required: "This field is required" },
  email: {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: { value: 8, message: "Must be at least 8 characters" },
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      message: "Must contain uppercase, lowercase and number",
    },
  },
  phone: {
    required: "Phone number is required",
    pattern: {
      value: /^\+?[1-9]\d{1,14}$/,
      message: "Invalid phone number format",
    },
  },
  username: {
    required: "Username is required",
    minLength: { value: 3, message: "Must be at least 3 characters" },
    maxLength: { value: 20, message: "Must not exceed 20 characters" },
    pattern: {
      value: /^[a-zA-Z0-9_]+$/,
      message: "Only letters, numbers and underscores allowed",
    },
  },
};

// ==================== SIZE REFERENCES ====================

/**
 * Component Sizes (in pixels)
 */
const componentSizes = {
  AppButton: {
    small: 40,
    medium: 48,
    large: 56,
  },
  IconButton: {
    small: 36,
    medium: 48,
    large: 56,
  },
  TextField: {
    minHeight: 52,
    multilineMinHeight: 80,
  },
  PhoneInput: {
    minHeight: 52,
  },
  SelectField: {
    minHeight: 52,
  },
};

// ==================== COLOR REFERENCES ====================

/**
 * Available Colors in Theme
 */
const themeColors = {
  primary: [
    "primary50",
    "primary75",
    "primary100",
    "primary200",
    "primary300",
    "primary400",
    "primary500",
    "primary600",
    "primary700",
    "primary800",
    "primary900",
  ],
  gray: [
    "gray50",
    "gray75",
    "gray100",
    "gray200",
    "gray300",
    "gray400",
    "gray500",
    "gray600",
    "gray700",
    "gray800",
    "gray900",
  ],
  semantic: ["error", "success", "background", "black", "white"],
};

// ==================== TYPOGRAPHY REFERENCES ====================

/**
 * Available Typography Styles
 */
const typographyStyles = {
  headings: ["headingLarger", "headingLarge", "headingMedium", "headingSmall"],
  body: ["bodyLarge", "bodyMedium", "bodySmall", "caption"],
};

// ==================== USAGE EXAMPLE ====================

/**
 * Complete Form Example
 */
const formExample = `
import { useForm } from 'react-hook-form';
import {
  ControlledTextField,
  ControlledPhoneInput,
  ControlledSelectField,
} from '~/components/form';
import { AppButton } from '~/components/common';

interface FormData {
  email: string;
  password: string;
  phone: string;
  country: string;
}

export default function MyForm() {
  const { control, handleSubmit } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const countryOptions = [
    { label: "United States", value: "US" },
    { label: "United Kingdom", value: "UK" },
    { label: "Canada", value: "CA" },
  ];

  return (
    <View>
      <ControlledTextField
        control={control}
        name="email"
        label="Email"
        rules={{ required: "Email is required" }}
      />
      
      <ControlledTextField
        control={control}
        name="password"
        label="Password"
        isPassword
        rules={{ required: "Password is required" }}
      />
      
      <ControlledPhoneInput
        control={control}
        name="phone"
        label="Phone"
      />
      
      <ControlledSelectField
        control={control}
        name="country"
        label="Country"
        options={countryOptions}
      />
      
      <AppButton
        label="Submit"
        fullWidth
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
}
`;

export { componentSizes, formExample, themeColors, typographyStyles, validationExamples };
