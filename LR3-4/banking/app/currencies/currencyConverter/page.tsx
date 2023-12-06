import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { CurrencyConverterForm } from '@/components/CurrencyConverterForm';
import { CurrencyTariff, DBResponse } from '@/core/types';
import { createCurrencyConversionMap } from '@/core/utils';

export default async function CurrencyConverter(): Promise<JSX.Element> {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });
  const { data } = (await supabase
    .from('CurrencyTariffs')
    .select('coefficient, to(short_code_title), from(short_code_title)')) as DBResponse<CurrencyTariff[]>;

  const conversionRules = createCurrencyConversionMap(data);

  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
        <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
          Currency Converter by National Bank
        </span>
      </h1>
      <CurrencyConverterForm conversionRatios={conversionRules} className="mr-auto max-md:m-auto" />
    </>
  );
}
