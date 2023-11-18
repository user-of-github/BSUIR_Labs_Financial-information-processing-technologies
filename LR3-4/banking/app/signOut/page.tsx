'use client';
import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { useRouter } from 'next/navigation';
import React from 'react';
import { InfoBadge } from '@/components/UI/StateBadge';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';

export default function SignOutPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const signOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
    router.push('/');
  };

  React.useEffect(() => void signOut(), []);

  return <InfoBadge title="Logging out..." text={<LoadingSpinner />} />;
}
