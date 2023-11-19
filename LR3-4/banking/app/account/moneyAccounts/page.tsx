import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DBResponse, MoneyAccount } from '@/core/types';
import { MoneyAccountRowCard } from '@/components/MoneyAccountRowCard';

export default async function MoneyAccountsListPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session || !session?.user) {
    redirect('/signOut');
  }

  const moneyAccounts = (await supabase.from('BankAccounts').select('*, currency(code:short_code_title)')) as DBResponse<MoneyAccount[]>;
  return (
    <div className="flex flex-col gap-y-5">
      {
      moneyAccounts.data.map(moneyAccount => (
        <MoneyAccountRowCard key={moneyAccount.number} {...moneyAccount} />
      ))
    }
    </div>
  )
}
