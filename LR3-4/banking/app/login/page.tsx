'use client';

import React from 'react';

import Link from 'next/link';
import { redirect, useRouter } from 'next/navigation';

import { Button } from '@/components/UI/Button';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { ErrorBadge, InfoBadge } from '@/components/UI/StateBadge';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import clsx from 'clsx';
import { createTransport } from 'nodemailer';
import { emailValidator, inputFieldValidator, passportIdValidator, phoneValidator, validate } from '@/core/validators';

export default function SignUpPage(): JSX.Element {
  const supabase = createClientComponentClient();

  const router = useRouter();
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [letterSent, setLetterSent] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(undefined);
    setLoading(true);

    const validation = validate([
      [email, inputFieldValidator, 'email'],
      [password, inputFieldValidator, 'password']
    ]);

    if (!validation.status) {
      setError(validation.error);
      return;
    }

    const isPassword = await supabase.rpc('check_if_password_correct', {
      current_plain_password: password,
      current_email: email
    });
    setLoading(false);

    if (isPassword.error || !isPassword.data) {
      setError('Invalid login or password (do not match or do not exist at all)');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      console.log(error);
      setError(error.message);
    }

    if (data.user) {
      router.refresh();
      router.push('/account');
    }
  };

  return (
    <>
      {letterSent && <InfoBadge title="2 Factor auth: " text="Letter with confirmation link sent to your email" />}
      <form
        className={clsx(
          'relative mr-auto flex w-3/5 flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 max-md:w-full',
          { 'pointer-events-none opacity-30': letterSent }
        )}
        onSubmit={handleSubmit}
        autoComplete="on"
        autoSave="on"
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
