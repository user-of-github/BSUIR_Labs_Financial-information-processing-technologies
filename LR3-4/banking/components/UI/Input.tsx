interface InputProps<InputValueType extends number | string> {
  type: 'number' | 'text' | 'email' | 'password';
  value: InputValueType;
  onChange?: (newValue: InputValueType) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Input = <InputValueType extends number | string>({
  type,
  value,
  onChange,
  placeholder,
  className,
  disabled
}: InputProps<InputValueType>): JSX.Element => {
  return (
    <input
      type="text"
      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:outline-blue-500 focus:ring-blue-500 disabled:pointer-events-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(event) =>
        onChange?.((type === 'number' ? Number(event.currentTarget.value) : event.currentTarget.value) as InputValueType)
      }
    />
  );
};

interface LabeledInputProps<InputValueType extends number | string> extends InputProps<InputValueType> {
  label: string;
}
export const LabeledInput = <InputValueType extends string | number>({
  label,
  ...baseProps
}: LabeledInputProps<InputValueType>): JSX.Element => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">{label}</label>
      <Input {...baseProps} />
    </div>
  );
};
