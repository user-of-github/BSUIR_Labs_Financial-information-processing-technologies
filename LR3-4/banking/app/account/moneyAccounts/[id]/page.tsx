import { cookies } from 'next/headers';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Metadata } from 'next';

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
  const supabase = createServerComponentClient({ cookies });
  const account = await supabase.from('BankAccounts').select('*');

  return <>{JSON.stringify(account)}</>;
}
