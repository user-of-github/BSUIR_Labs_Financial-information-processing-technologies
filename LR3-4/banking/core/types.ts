import { PostgrestError } from '@supabase/supabase-js';

export interface Route {
  title: string;
  link: string;
}

export interface Currency {
  short_code_title: string;
  title: string;
  id: string;
}

export interface CurrencyBuySell {
  currency: { code: string };
  bank_buys: number;
  bank_sells: number;
}

export interface CurrencyTariff {
  coefficient: number;
  from: {
    short_code_title: string;
  };
  to: {
    short_code_title: string;
  };
}

export interface DBResponse<ValueType> {
  data: ValueType;
  error?: PostgrestError | null;
}

export interface BaseUser {
  email: string;
  id: string;
}

export interface UserMetaData {
  first_name: string;
  middle_name: string;
  last_name: string;
  passport_id: string;
  client_from_date: string;
}

export interface MoneyAccount {
  owner: string;
  amount: number;
  date_opened: string;
  number: string;
  currency: { code: string };
}
