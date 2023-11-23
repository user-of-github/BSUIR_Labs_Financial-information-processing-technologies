import { cookies } from 'next/headers';

import { RequestForMoneyAccountForm } from '@/components/RequestForMoneyAccountForm';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { Currency } from '@/core/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function CreateMoneyAccountPage() {
  cookies().getAll();
const supabase = createServerComponentClient({ cookies });
  const data = (await supabase.from('Currencies').select('*')).data as Currency[];
  const userId = (await supabase.auth.getSession()).data.session?.user.id;
  const user = (await supabase.from('Profiles').select('*').eq('id', userId)).data![0];

  return (
    <>
      <ColoredHeading
        className="font-light"
        headingLevel={3}
        coloredText="Fill in the form to request for a new money account in any currency"
      />
      <RequestForMoneyAccountForm currencies={data} userData={user} />
    </>
  );
}
