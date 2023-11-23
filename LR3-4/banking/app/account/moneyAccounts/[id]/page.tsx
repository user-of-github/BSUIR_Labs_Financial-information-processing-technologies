import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';
import { DBResponse, MoneyAccount } from '@/core/types';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { MoneyAccountData } from '@/components/MoneyAccountData';

interface MoneyAccountProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: 'Money account',
  description: 'Selected money account for authorized user'
};

export default async function MoneyAccount(props: MoneyAccountProps) {
  cookies().getAll();
const supabase = createServerComponentClient({ cookies });
  const account = (await supabase.from('BankAccounts').select('*, currency(code:short_code_title)').eq('number', props.params.id)) as DBResponse<MoneyAccount[]>;

  if (account.data?.length === 0) {
    return <ColoredHeading headingLevel={2} ordinaryText="Not found" />
  }
  return <>
    <MoneyAccountData account={account.data[0]}/>
  </>;
}
