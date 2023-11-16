import supabase from '@/core/database/database';
import { CurrencyConverterForm } from '@/components/CurrencyConverterForm';
import { CurrencyTariff, DBResponse } from '@/core/types';

const createCurrencyConversionMap = (data: CurrencyTariff[]): Map<string, Map<string, number>> => {
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

export default async function CurrencyConverter(): Promise<JSX.Element> {
  const { data } = (await supabase
    .from('CurrencyTariffs')
    .select('coefficient, to(short_code_title), from(short_code_title)')) as DBResponse<CurrencyTariff[]>;

  const conversionRules = createCurrencyConversionMap(data);

  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Currency Converter by National Bank
        </span>
      </h1>
      <CurrencyConverterForm conversionRatios={conversionRules} className="mr-auto max-md:m-auto" />
    </>
  );
}
