import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import PhoneInput, { PhoneInputProps } from "../phone-input";

/**
 * ControlledPhoneInput component props interface
 *
 * @interface ControlledPhoneInputProps
 * @extends {Omit<PhoneInputProps, "value" | "onChangeText">}
 *
 * @property {Control<TFieldValues>} control - React Hook Form control object
 * @property {Path<TFieldValues>} name - Field name for form registration
 * @property {string} [defaultValue=""] - Default phone number value
 * @property {object} [rules] - Validation rules
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 *
 * const { control } = useForm();
 *
 * <ControlledPhoneInput
 *   control={control}
 *   name="phoneNumber"
 *   label="Phone Number"
 *   defaultCountryCode="+234"
 *   rules={{
 *     required: "Phone number is required",
 *     pattern: {
 *       value: /^\+?[1-9]\d{1,14}$/,
 *       message: "Invalid phone number format"
 *     }
 *   }}
 * />
 * ```
 */
export interface ControlledPhoneInputProps<TFieldValues extends FieldValues>
  extends Omit<PhoneInputProps, "value" | "onChangeText"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  defaultValue?: string;
  rules?: object;
}

function ControlledPhoneInput<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue = "",
  rules,
  ...phoneInputProps
}: ControlledPhoneInputProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      rules={rules}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <PhoneInput
          {...phoneInputProps}
          value={value}
          onChangeText={onChange}
          onBlur={onBlur}
          error={error?.message}
        />
      )}
    />
  );
}

export default ControlledPhoneInput;
