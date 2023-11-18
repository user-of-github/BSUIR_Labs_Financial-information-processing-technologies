import React from 'react';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignUpLayout({ children }: React.PropsWithChildren) {
  const supabase = createServerComponentClient({ cookies });
  const sessionData = await supabase.auth.getSession();

  if (sessionData.data.session) {
    redirect('/account');
  }

  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Welcome! Ready to " ordinaryText=" become our client ?" swap />
      {children}
    </>
  );
}
