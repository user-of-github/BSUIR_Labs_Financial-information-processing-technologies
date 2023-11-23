import { CurrencyTariff } from './types';

export const createCurrencyConversionMap = (data: CurrencyTariff[]): Map<string, Map<string, number>> => {
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
