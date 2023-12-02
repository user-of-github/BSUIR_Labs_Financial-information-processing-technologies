'use client';

import React from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Button } from '@/components/UI/Button';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { ErrorBadge, SuccessBadge } from '@/components/UI/StateBadge';
import { emailValidator, inputFieldValidator, passportIdValidator, phoneValidator, validate } from '@/core/validators';
import clsx from 'clsx';

export const SignUpForm = (): JSX.Element => {
  const supabase = createClientComponentClient();

  const [firstName, setFirstName] = React.useState<string>('');
  const [middleName, setMiddleName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [passportId, setPassportId] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phone, setPhone] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [error, setError] = React.useState<string | undefined>();
  const [success, setSuccess] = React.useState<string | undefined>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError(undefined);
    setSuccess(undefined);

    const validation = validate([
      [firstName, inputFieldValidator, 'first name'],
      [middleName, inputFieldValidator, 'middle name'],
      [lastName, inputFieldValidator, 'last name'],
      [passportId, passportIdValidator, 'passport ID'],
      [email, emailValidator, 'email'],
      [phone, phoneValidator, 'phone number']
    ]);

    if (!validation.status) {
      setError(validation.error);
      return;
    }

    setLoading(true);
    const response = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: {
          first_name: firstName,
          middle_name: middleName,
          last_name: lastName,
          passport_id: passportId,
          client_from_date: new Date().toDateString()
        }
      }
    });
    setLoading(false);

    if (response.error) {
      setError(`${response.error.message}`);
    } else if (response.data) {
      setSuccess(
        ' Congratulations. Go to your inbox, verify email and start being our client ! If this email already associated with some account, you already can login'
      );
    }
  };

  if (success) {
    return <SuccessBadge title="SUCCESS " text={success} />;
  }

  return (
    <form
      className={clsx(
        'mr-auto flex w-3/5 flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800 max-md:w-full',
        { 'opacity-30 pointer-events-none cursor-default': loading }
      )}
      onSubmit={handleSubmit}
      autoComplete="on"
    >
      <LabeledInput
        required
        label="First name"
        value={firstName}
        type="text"
        onChange={setFirstName}
        placeholder="What is your name ?"
        pattern="[A-Za-z А-Яа-я\-]{4, }"
        maxLength={20}
      />
      <LabeledInput
        required
        label="Last name"
        value={lastName}
        type="text"
        onChange={setLastName}
        placeholder="And now surname"
        maxLength={20}
      />
      <LabeledInput
        required
        label="Middle name"
        value={middleName}
        type="text"
        onChange={setMiddleName}
        placeholder="Middlename"
        maxLength={20}
      />
      <LabeledInput
        required
        label="Passport id"
        value={passportId}
        type="text"
        onChange={setPassportId}
        placeholder="MR1234567"
        maxLength={9}
      />
      <LabeledInput
        maxLength={20}
        required
        label="Mobile phone"
        value={phone}
        type="tel"
        onChange={setPhone}
        placeholder="+375..."
      />
      <LabeledInput
        required
        label="Email"
        value={email}
        type="email"
        onChange={setEmail}
        placeholder="your.real.email@email.com"
        maxLength={40}
      />
      <LabeledInput maxLength={25} required label="Password" value={password} type="password" onChange={setPassword} />

      <Button disabled={loading} type="submit" appearance="purple" className="mt-5" text="Verify your email and register" />
      {error && <ErrorBadge title="ERROR" text={error} />}
    </form>
  );
};
