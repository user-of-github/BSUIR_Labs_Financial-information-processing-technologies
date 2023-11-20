import React from 'react';


interface SelectProps<ValueType> {
  values: ValueType[];
  labelKey: keyof ValueType;
  selectedLabel: string;
  onChange: (newValue: ValueType) => void;
  size?: number;
}
export const Select = <ValueType extends {}>({values, selectedLabel, labelKey, onChange, size}: SelectProps<ValueType>) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const newValue = values.find(value => value[labelKey] === event.currentTarget.value);
    onChange(newValue!);
  };
  return (
    <select
      size={size || 3}
      className="block w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
      onChange={onSelectChange}
    >
      {values.map((value: ValueType): JSX.Element => (
        <option key={value[labelKey] as string} selected={value[labelKey] === selectedLabel}>
          {value[labelKey] as string}
        </option>
      ))}
    </select>
  );
};
