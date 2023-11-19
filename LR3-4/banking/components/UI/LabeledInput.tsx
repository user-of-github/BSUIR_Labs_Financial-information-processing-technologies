import React from 'react';

import { Input, SupportedInputValueType } from '@/components/UI/Input';

type BaseInputProps<InputValueType extends SupportedInputValueType> = React.ComponentProps<typeof Input<InputValueType>>;

interface LabeledInputProps<InputValueType extends SupportedInputValueType> extends BaseInputProps<InputValueType> {
  label: string;
}
export const LabeledInput = <InputValueType extends SupportedInputValueType>({
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
