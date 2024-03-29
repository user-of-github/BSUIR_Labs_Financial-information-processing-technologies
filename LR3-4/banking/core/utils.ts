import { CurrencyTariff } from './types';

export type ConversionRules = Map<string, Map<string, number>>;
export const createCurrencyConversionMap = (data: CurrencyTariff[]): ConversionRules => {
  const response = new Map<string, Map<string, number>>();

  const allCurrenciesSet = new Set<string>(data.map((item) => item.from.short_code_title));
  for (const currency of Array.from(allCurrenciesSet.keys())) {
    const rowMap = new Map<string, number>();
    const suitableConversions = data.filter((item) => item.from.short_code_title === currency);
    for (const toConversion of suitableConversions) {
      rowMap.set(toConversion.to.short_code_title, toConversion.coefficient);
    }
    response.set(currency, rowMap);
  }

  return response;
};

export const getMonthlyPayment = (creditSum: number, creditTermYears: number, creditPercent: number): number => {
  const monthsInYear = 12;
  const percent = creditPercent / monthsInYear / 100;
  // https://journal.tinkoff.ru/guide/credit-payment/
  const powDegree = creditTermYears * monthsInYear;
  const inPow = (1 + percent) ** powDegree;
  const annuityRatio = (percent * inPow) / (inPow - 1);
  return creditSum * annuityRatio;
};
