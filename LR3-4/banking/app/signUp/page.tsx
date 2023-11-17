'use client';

import React from 'react';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { Button } from '@/components/UI/Button';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function SignUpPage(): JSX.Element {
  const supabase = createClientComponentClient();

  const [firstName, setFirstName] = React.useState<string>('');
  const [middleName, setMiddleName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [passportId, setPassportId] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          passport_id: passportId
        },
      }
    });

    console.log(response.data)

    if (response.error) {
      window.alert(`${response.error.message}`);
    } else if (response.data){
      window.alert(`Verify your email. Confirmation link sent to ${email}`);
    }
  };

  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Welcome! Ready to " ordinaryText=" become our client ?" swap />
      <form
        className="mr-auto flex w-auto min-w-[50%] flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <LabeledInput required label="First name" value={firstName} type="text" onChange={setFirstName} placeholder="Loki" pattern="[A-Za-z А-Яа-я\-]{4, }" />
        <LabeledInput required label="Last name" value={lastName} type="text" onChange={setLastName} placeholder="Odinson" />
        <LabeledInput
          required
          label="Middle name (if there is)"
          value={middleName}
          type="text"
          onChange={setMiddleName}
          placeholder="Laufeyson"
        />
        <LabeledInput
          required
          label="Passport id"
          value={passportId}
          type="text"
          onChange={setPassportId}
          placeholder="MR1234567"
          maxLength={10}
        />
        <LabeledInput required label="Email" value={email} type="email" onChange={setEmail} />
        <LabeledInput required label="Password" value={password} type="password" onChange={setPassword} />

        <Button type="submit" appearance="purple" className="mt-5" text="Verify your email and register" />
      </form>
    </>
  );
}
