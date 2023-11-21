import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { PaymentForm } from '@/components/PaymentForm';
import { MoneyAccount } from '@/core/types';
import { ColoredHeading } from '@/components/UI/ColoredHeading';

export default async function PaymentsPage() {
  const supabase = createServerComponentClient({ cookies });
  const myAccounts = await supabase.from('BankAccounts').select('*, currency(code:short_code_title)');

  return (
    <>
      <ColoredHeading headingLevel={2} ordinaryText=" page" swap coloredText="Payments "/>
      <PaymentForm availableAccounts={myAccounts.data as MoneyAccount[]}/>
    </>
  );
}
