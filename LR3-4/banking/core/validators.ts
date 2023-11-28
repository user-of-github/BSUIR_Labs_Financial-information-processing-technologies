import isEmail from 'is-email';
import phone from 'phone';

type ValidationResult =
  | {
      status: true;
    }
  | {
      status: false;
      error: string;
    };

type ValidatorFunction<ValueType> = (value: ValueType) => ValidationResult;

type ValidationPair<ValueType> = [ValueType, ValidatorFunction<ValueType>, string];

export const inputFieldValidator: ValidatorFunction<string> = (value: string) => {
  const NAME_FIELD_MIN_LENGTH = 3;
  if (value.trim().trimStart().trimEnd().length < NAME_FIELD_MIN_LENGTH) {
    return {
      status: false,
      error: `Too short input`
    };
  } else {
    return {
      status: true
    };
  }
};

export const passportIdValidator: ValidatorFunction<string> = (value: string) => {
  const PASSPORT_ID_LENGTH = 9;
  if (value.trim().length !== PASSPORT_ID_LENGTH) {
    return { status: false, error: 'Passport ID must contain exactly 9 values, ex.: MP1234567' };
  } else {
    return { status: true };
  }
};

export const emailValidator: ValidatorFunction<string> = (value: string) => {
  if (isEmail(value)) {
    return { status: true };
  } else {
    return { status: false, error: 'Invalid email' };
  }
};

export const validate = (pairs: ValidationPair<any>[]): ValidationResult => {
  for (const pair of pairs) {
    const [value, validator] = pair;
    const validationResult = validator(value);

    if (!validationResult.status) {
      return { status: false, error: validationResult.error + ` (${pair[2]})` };
    }
  }

  return {
    status: true
  };
};

export const phoneValidator: ValidatorFunction<string> = (val) => {
  const processedPhone = phone(val);
  if (!processedPhone.isValid) {
    return { status: false, error: 'Provide valid phone in international format' };
  } else {
    return { status: true };
  }
};
