import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { MoneyAccountRowCard } from '@/components/MoneyAccountRowCard';
import { Button } from '@/components/UI/Button';
import { DBResponse, MoneyAccount } from '@/core/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function MoneyAccountsListPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session || !session?.user) {
    redirect('/signOut');
  }

  const moneyAccounts = (await supabase.from('BankAccounts').select('*, currency(code:short_code_title)')) as DBResponse<
    MoneyAccount[]
  >;
  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-5">
        {moneyAccounts.data.map((moneyAccount) => (
          <MoneyAccountRowCard key={moneyAccount.number} {...moneyAccount} />
        ))}
      </div>

      <Link href="/account/moneyAccounts/create">
        <Button type="button" text="Request for a new money account" appearance="purple" />
      </Link>
    </div>
  );
}
