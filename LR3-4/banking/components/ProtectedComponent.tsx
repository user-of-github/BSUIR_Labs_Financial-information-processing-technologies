import React from 'react';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

export const ProtectedComponent = async ({ children }: React.PropsWithChildren<any>) => {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session }
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  return children;
};
