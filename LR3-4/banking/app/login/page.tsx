'use client';

import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/UI/Button';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { ErrorBadge } from '@/components/UI/StateBadge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUpPage(): JSX.Element {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError(undefined);
    setLoading(true);
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    setLoading(false);

    if (error) {
      console.log(error);
      setError(error.message);
    }

    if (data.user) {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Log in" ordinaryText=" form" />
      <form
        className="relative mr-auto flex w-3/5 flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 max-md:w-full"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
        {error && <ErrorBadge title="Error" text={error} className="absolute -right-1.5 -top-[20px]" />}
        <LabeledInput label="Email" value={email} type="email" onChange={setEmail} placeholder="example@email.com" />
        <LabeledInput label="Password" value={password} type="password" onChange={setPassword} />
        <div className="flex flex-row items-center">
          <Button type="submit" appearance="light" className="mt-5" text="Log in" />
          {loading && <LoadingSpinner />}
        </div>
      </form>
      <small className="mt-4 text-sm font-semibold text-blue-600/50 dark:text-blue-500/50">
        Not an existing client ?{' '}
        <Link href="/signUp" className="text-blue-600/100 dark:text-blue-500/100">
          Create your bank account !
        </Link>
      </small>
    </>
  );
}
