import { HTMLInputTypeAttribute } from 'react';
import clsx from 'clsx';

interface InputProps {
  type: HTMLInputTypeAttribute;
  value: string;
  onChange?: (newValue: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
}

export const Input = ({
  type,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  maxLength,
  required,
  pattern,
  min,
  max
}: InputProps) => {
  return (
    <input
      type={type}
      className={clsx(
        'block w-full disabled:select-none disabled:opacity-40 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500 disabled:pointer-events-none',
        className
      )}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(event) => onChange?.(event.currentTarget.value)}
      maxLength={maxLength}
      required={required}
      pattern={pattern}
      autoComplete="on"
      min={min}
      max={max}
    />
  );
};
