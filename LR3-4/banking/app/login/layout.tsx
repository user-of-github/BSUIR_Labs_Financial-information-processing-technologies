import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginLayout({children}: React.PropsWithChildren<any>) {
  const supabase = createServerComponentClient({ cookies });
  const sessionData = await supabase.auth.getSession();

  if (sessionData.data.session) {
    redirect('/account');
  }

  return children;
}
