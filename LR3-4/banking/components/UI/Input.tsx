import clsx from 'clsx';

export type SupportedInputValueType = number | string;

interface InputProps<InputValueType extends SupportedInputValueType> {
  type: 'number' | 'text' | 'email' | 'password';
  value: InputValueType;
  onChange?: (newValue: InputValueType) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
}

export const Input = <InputValueType extends SupportedInputValueType>({
  type,
  value,
  onChange,
  placeholder,
  className,
  disabled,
  maxLength,
  required,
  pattern
}: InputProps<InputValueType>): JSX.Element => {
  return (
    <input
      type="text"
      className={clsx(
        'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500 disabled:pointer-events-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500',
        className
      )}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(event) =>
        onChange?.((type === 'number' ? Number(event.currentTarget.value) : event.currentTarget.value) as InputValueType)
      }
      maxLength={maxLength}
      required={required}
      pattern={pattern}
      autoComplete="on"
    />
  );
};