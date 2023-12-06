import React from 'react';
import clsx from 'clsx';

interface SelectProps {
  values: string[];
  selectedLabel: string;
  onChange: (newValue: string) => void;
  size?: number;
  className?: string;
}

export const Select = ({ values, selectedLabel, onChange, size, className }: SelectProps) => {
  const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    onChange(event.currentTarget.value);
  };
  return (
    <select
      size={size || 3}
      className={clsx(
        'block overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-blue-500 focus:ring-blue-500',
        className
      )}
      onChange={onSelectChange}
    >
      {values.map((value) => (
        <option key={value} selected={value === selectedLabel}>
          {value}
        </option>
      ))}
    </select>
  );
};
