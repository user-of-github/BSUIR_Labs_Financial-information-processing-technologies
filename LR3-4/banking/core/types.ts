export interface Route {
  title: string;
  link: string;
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
}
