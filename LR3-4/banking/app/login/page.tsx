'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { Button } from '@/components/UI/Button';
import Link from 'next/link';

export default function SignUpPage(): JSX.Element {
  const supabase = createClientComponentClient();

  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    });

    if (error) {
      window.alert('Failed to log in');
    }
  };

  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Log in" ordinaryText=" form" />
      <form
        className="mr-auto flex w-auto min-w-[50%] flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 max-md:w-full"
        onSubmit={handleSubmit}
      >
        <LabeledInput label="Email" value={email} type="email" onChange={setEmail} placeholder="example@email.com" />
        <LabeledInput label="Password" value={password} type="password" onChange={setPassword} />
        <Button type="submit" appearance="light" className="mt-5" text="Log in" />
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
