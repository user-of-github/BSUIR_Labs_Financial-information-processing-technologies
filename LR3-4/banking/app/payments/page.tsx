import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { PaymentForm } from '@/components/PaymentForm';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { CurrencyTariff, DBResponse, MoneyAccount } from '@/core/types';
import { ConversionRules, createCurrencyConversionMap } from '@/core/utils';

export default async function PaymentsPage() {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });
  const myAccounts = await supabase.from('BankAccounts').select('*, currency(code:short_code_title)');

  return (
    <>
      <ColoredHeading headingLevel={2} ordinaryText=" page" swap coloredText="Payments " />
      <PaymentForm availableAccounts={myAccounts.data as MoneyAccount[]} />
    </>
  );
}
