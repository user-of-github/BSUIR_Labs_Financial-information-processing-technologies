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

export type ValidationPair<ValueType> = [ValueType, ValidatorFunction<ValueType>, string];

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

const PASSPORT_ID_LENGTH = 9;
const PASSPORT_SERIES = new Set(['AB', 'BM', 'HB', 'KH', 'MP', 'MC', 'KB', 'PP', 'SP', 'DP']);
const DIGITS = '0123456789';
export const passportIdValidator: ValidatorFunction<string> = (val: string) => {
  const value = val.trim();
  if (value.length !== PASSPORT_ID_LENGTH) {
    return { status: false, error: 'Passport ID must contain exactly 9 values, ex.: MP1234567' };
  }
  const series = value.slice(0, 2).toUpperCase();
  if (!PASSPORT_SERIES.has(series)) {
    return { status: false, error: 'Passport ID must start with series, ex.: MP, KH, MC, KB ...' };
  }

  const number = value.slice(2);
  if (![...number].every(num => DIGITS.includes(num) )) {
    return { status: false, error: 'Passport ID must have a number after series, ex.: MP1234567' };
  }

  return { status: true };
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
