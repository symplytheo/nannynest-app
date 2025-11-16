import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import TextField, { TextFieldProps } from "../textfield";

/**
 * ControlledTextField component props interface
 *
 * @interface ControlledTextFieldProps
 * @extends {Omit<TextFieldProps, "value" | "onChangeText">}
 *
 * @property {Control<TFieldValues>} control - React Hook Form control object
 * @property {Path<TFieldValues>} name - Field name for form registration (must match form schema)
 * @property {string} [defaultValue=""] - Default value for the field
 * @property {object} [rules] - Validation rules (required, min, max, pattern, etc.)
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 *
 * const { control, handleSubmit } = useForm();
 *
 * // Basic controlled text field
 * <ControlledTextField
 *   control={control}
 *   name="email"
 *   label="Email Address"
 *   placeholder="Enter your email"
 *   rules={{ required: "Email is required" }}
 * />
 *
 * // Multiline text area
 * <ControlledTextField
 *   control={control}
 *   name="description"
 *   label="Description"
 *   multiline
 *   numberOfLines={4}
 * />
 *
 * // Password field
 * <ControlledTextField
 *   control={control}
 *   name="password"
 *   label="Password"
 *   isPassword
 *   rules={{
 *     required: "Password is required",
 *     minLength: { value: 8, message: "Must be at least 8 characters" }
 *   }}
 * />
 * ```
 */
export interface ControlledTextFieldProps<TFieldValues extends FieldValues>
  extends Omit<TextFieldProps, "value" | "onChangeText"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  defaultValue?: string;
  rules?: object;
}

function ControlledTextField<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue = "",
  rules,
  ...textFieldProps
}: ControlledTextFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <TextField
          {...textFieldProps}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}

export default ControlledTextField;
