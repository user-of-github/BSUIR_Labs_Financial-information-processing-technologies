import { cookies } from 'next/headers';

import { PaymentForm } from '@/components/PaymentForm';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { CurrencyTariff, DBResponse, MoneyAccount } from '@/core/types';
import { ConversionRules, createCurrencyConversionMap } from '@/core/utils';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function PaymentsPage() {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });
  const myAccounts = await supabase.from('BankAccounts').select('*, currency(code:short_code_title)');
  const { data } = (await supabase
    .from('CurrencyTariffs')
    .select('coefficient, to(short_code_title), from(short_code_title)')) as DBResponse<CurrencyTariff[]>;

  const conversionRules: ConversionRules = createCurrencyConversionMap(data);

  return (
    <>
      <ColoredHeading headingLevel={2} ordinaryText=" page" swap coloredText="Payments " />
      <PaymentForm availableAccounts={myAccounts.data as MoneyAccount[]} tariffs={conversionRules} />
    </>
  );
}
