import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import SelectField, { SelectFieldProps } from "../select-field";

/**
 * ControlledSelectField component props interface
 *
 * @interface ControlledSelectFieldProps
 * @extends {Omit<SelectFieldProps, "value" | "onValueChange">}
 *
 * @property {Control<TFieldValues>} control - React Hook Form control object
 * @property {Path<TFieldValues>} name - Field name for form registration
 * @property {string | number} [defaultValue] - Default selected value
 * @property {object} [rules] - Validation rules
 *
 * @example
 * ```tsx
 * import { useForm } from 'react-hook-form';
 *
 * const { control } = useForm();
 *
 * const genderOptions = [
 *   { label: "Male", value: "male" },
 *   { label: "Female", value: "female" },
 *   { label: "Other", value: "other" },
 * ];
 *
 * <ControlledSelectField
 *   control={control}
 *   name="gender"
 *   label="Gender"
 *   options={genderOptions}
 *   rules={{ required: "Gender is required" }}
 * />
 * ```
 */
export interface ControlledSelectFieldProps<TFieldValues extends FieldValues>
  extends Omit<SelectFieldProps, "value" | "onValueChange"> {
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
  defaultValue?: string | number;
  rules?: object;
}

function ControlledSelectField<TFieldValues extends FieldValues>({
  control,
  name,
  defaultValue,
  rules,
  ...selectFieldProps
}: ControlledSelectFieldProps<TFieldValues>) {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue as any}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <SelectField
          {...selectFieldProps}
          value={value}
          onValueChange={onChange}
          error={error?.message}
        />
      )}
    />
  );
}

export default ControlledSelectField;
