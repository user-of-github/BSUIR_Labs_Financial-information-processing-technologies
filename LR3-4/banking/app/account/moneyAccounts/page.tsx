import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { MoneyAccountRowCard } from '@/components/MoneyAccountRowCard';
import { Button } from '@/components/UI/Button';
import { DBResponse, MoneyAccount } from '@/core/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';


export default async function MoneyAccountsListPage() {
  const supabase = createServerComponentClient({ cookies });
  const moneyAccounts = (await supabase.from('BankAccounts').select('*, currency(code:short_code_title)')) as DBResponse<MoneyAccount[]>;

  return (
    <div className="flex flex-col gap-y-10">
      <div className="flex flex-col gap-y-5">
        {moneyAccounts.data.map((moneyAccount) => (
          <MoneyAccountRowCard key={moneyAccount.number} {...moneyAccount} />
        ))}
        {moneyAccounts.data.length === 0 && <span className="text-gray-500 text-xl italic">No money accounts, create your first !</span>}
      </div>

      <Link href="/account/moneyAccounts/create">
        <Button type="button" text="Request for a new money account" appearance="purple" />
      </Link>
    </div>
  );
}
