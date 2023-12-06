import React from 'react';
import { Input } from '@/components/UI/Input';

type BaseInputProps = React.ComponentProps<typeof Input>;

interface LabeledInputProps extends BaseInputProps {
  label: string;
}
export const LabeledInput = ({ label, ...baseProps }: LabeledInputProps): JSX.Element => {
  return (
    <div className="flex flex-col">
      <label className="mb-1 block text-sm font-medium text-gray-900">{label}</label>
      <Input {...baseProps} />
    </div>
  );
};
