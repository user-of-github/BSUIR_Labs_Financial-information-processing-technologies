import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { ProfileDetails } from '@/components/ProfileDetails';
import { BaseUser, UserMetaData } from '@/core/types';

export default async function AccountPage() {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session || !session?.user) {
    redirect('/signOut');
  }

  const baseUser = session?.user as unknown as BaseUser;
  const metadata = (await supabase.from('Profiles').select('*').eq('id', baseUser.id)).data?.[0] as UserMetaData;
  return (
    <>
      <ProfileDetails
        email={baseUser.email}
        firstName={metadata.first_name}
        lastName={metadata.last_name}
        middleName={metadata.middle_name}
        passportId={metadata.passport_id}
        clientFrom={metadata.client_from_date}
      />
    </>
  );
}
