'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Button } from '@/components/UI/Button';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { Select } from '@/components/UI/Select';
import { ErrorBadge, SuccessBadge } from '@/components/UI/StateBadge';
import { Currency, UserMetaData } from '@/core/types';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface RequestForMoneyAccountFormProps {
  currencies: Omit<Currency, 'short_code_title'>[];
  userData: UserMetaData;
}
export const RequestForMoneyAccountForm = (props: RequestForMoneyAccountFormProps) => {
  const currencyNames = props.currencies.map((curr) => curr.title);
  const [currencyTitle, setCurrencyTitle] = React.useState<string>(props.currencies[0].title);
  const [accountName, setAccountName] = React.useState<string>('');
  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    alert('kek');
    const response = await supabase.from('BankAccounts').insert({
      owner: props.userData.id,
      currency: props.currencies.find((curr) => curr.title === currencyTitle)?.id,
      date_opened: new Date().toDateString(),
      name: accountName
    });

    if (response.error) {
      setError(response.error.message);
    } else {
      setSuccess('Money account created. Redirecting to accounts list...');
      window.setTimeout(() => {
        router.push('/account/moneyAccounts');
      }, 4000);
    }
  };

  return (
    <form className="flex flex-col w-2/3 max-md:w-full gap-y-5" onSubmit={onSubmit}>
      {error && <ErrorBadge title="Error" text={error} />}
      {success && <SuccessBadge title={success} text={<LoadingSpinner />} />}
      <LabeledInput
        type="text"
        label="Full name"
        disabled
        value={props.userData.last_name + ' ' + props.userData.first_name + ' ' + props.userData.middle_name}
      />
      <LabeledInput type="text" label="Passport id" disabled value={props.userData.passport_id} />
      <div className="flex flex-col">
        <span className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">Choose currency</span>
        <Select
          values={currencyNames}
          selectedLabel={currencyTitle}
          onChange={setCurrencyTitle}
          className="mr-auto max-md:w-full w-2/3"
        />
      </div>
      <LabeledInput label="[Optionally] Account purpose: " value={accountName} required onChange={setAccountName} type="text" />
      <Button type="submit" text="Request for money account" appearance="purple" />
    </form>
  );
};
