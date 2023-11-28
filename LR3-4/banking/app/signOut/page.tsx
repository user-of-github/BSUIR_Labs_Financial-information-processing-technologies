'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { InfoBadge } from '@/components/UI/StateBadge';

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
