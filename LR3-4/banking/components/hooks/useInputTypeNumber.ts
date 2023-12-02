import React from 'react';
import { numberValidator } from '@/core/validators';

type UseInputTypeNumberReturnValue = [string, (val: string) => void];
export const useInputTypeNumber = (defaultValue: number = 0, mustBePositive: boolean = true): UseInputTypeNumberReturnValue => {
  const [value, setValue] = React.useState<string>(String(defaultValue));

  const setter = (newValue: string) => {
    const validationResult = numberValidator(newValue).status;
    if (!validationResult) {
      return;
    }

    if (!mustBePositive) {
      setValue(newValue);
    } else {
      if (Number(newValue) >= 0) {
        setValue(newValue);
      }
    }
  };

  return [value, setter];
};
