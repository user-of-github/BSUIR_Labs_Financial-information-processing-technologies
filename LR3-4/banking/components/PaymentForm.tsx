'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { QrScannerComponent } from '@/components/QrScanner';
import { Button } from '@/components/UI/Button';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { LoadingSpinner } from '@/components/UI/LoadingSpinner';
import { Select } from '@/components/UI/Select';
import { ErrorBadge, SuccessBadge } from '@/components/UI/StateBadge';
import { useInputTypeNumber } from '@/components/hooks/useInputTypeNumber';
import { MoneyAccount } from '@/core/types';
import { ConversionRules } from '@/core/utils';
import clsx from 'clsx';

interface PaymentFormProps {
  availableAccounts: MoneyAccount[];
}
export const PaymentForm = (props: PaymentFormProps) => {
  const supabase = createClientComponentClient();

  const [receiversAccount, setReceiversAccount] = React.useState<string>('');
  const [transferredSum, setTransferredSum] = useInputTypeNumber(0);
  const [selectedAccount, setSelectedAccount] = React.useState(props.availableAccounts[0].number);
  const [selectedAccountInfo, setSelectedAccountInfo] = React.useState<[string, string, string]>([
    props.availableAccounts[0].currency.code,
    props.availableAccounts[0].amount.toString(),
    props.availableAccounts[0].name
  ]);

  const [qrScannerShown, setQrScannerShown] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>(undefined);
  const [success, setSuccess] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);

  const validate = () => {
    const asNumber = Number(transferredSum);
    if (asNumber <= 0 || asNumber > (Number(selectedAccountInfo[1]) || 0)) {
      setError('Invalid transferred sum');
      return false;
    }
    return true;
  };
  const performPayment: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }
    setLoading(true);
    setSuccess(undefined);
    setError(undefined);

    const { error } = await supabase.rpc('transfer_money', {
      receiver_id: receiversAccount,
      sender_id: selectedAccount,
      transfer_amount: transferredSum
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setQrScannerShown(false);
      setReceiversAccount('');
      setSuccess(' Money transferred');
    }
  };

  const toggleQrScannerShown = () => {
    setQrScannerShown((isShown) => !isShown);
  };

  const onScanValues = (value: string) => {
    setQrScannerShown(false);

    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        if (parsed.number && typeof parsed.number === 'string') {
          setReceiversAccount(parsed.number);
        }
      }
    } catch (error) {
      window.alert('Please use valid QR from OUR banking');
    }
  };

  React.useEffect(() => {
    const account = props.availableAccounts.find((i) => i.number === selectedAccount)!;
    setSelectedAccountInfo([account.currency.code, account.amount.toString(), account.name]);
  }, [selectedAccount]);

  if (success) {
    return (
      <form className="w-2/3 max-md:w-full flex flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow ">
        <SuccessBadge title="Transaction success: " text={success} />
        <Link href="/home">
          <Button type="button" text="Go home" appearance="light" />
        </Link>
      </form>
    );
  }

  return (
    <form
      className={clsx('w-2/3 max-md:w-full flex flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow', {
        'opacity-30 pointer-events-none cursor-default': loading
      })}
      onSubmit={performPayment}
    >
      <div className="flex flex-row gap-x-4 w-full max-md:flex-col-reverse max-md:gap-y-1">
        <Select
          values={props.availableAccounts.map((i) => i.number)}
          selectedLabel={selectedAccount}
          onChange={setSelectedAccount}
        />
        <div className="p-5 flex flex-col border rounded border-b-blue-100">
          <span className="text-md">Account currency: {selectedAccountInfo[0]}</span>
          <span className="text-md">Available amount: {selectedAccountInfo[1]}</span>
          {selectedAccountInfo[2] && <span className="text-md">Associated title: {selectedAccountInfo[2]}</span>}
        </div>
      </div>
      <LabeledInput
        label="Sender's account number"
        type="text"
        onChange={setReceiversAccount}
        value={receiversAccount}
        required
      />
      <Button
        type="button"
        text={!qrScannerShown ? 'Use QR instead' : 'Close QR scanner'}
        appearance="dark"
        onClick={toggleQrScannerShown}
      />
      {qrScannerShown && <QrScannerComponent onScan={onScanValues} onClose={() => setQrScannerShown(false)} />}
      <LabeledInput label="Sum to transfer" type="text" onChange={setTransferredSum} value={transferredSum} required />
      <Button type="submit" text={loading ? <LoadingSpinner /> : 'Transfer money'} appearance="ordinary" disabled={loading} />
      {error && <ErrorBadge title="Transaction fail: " text={error} />}
    </form>
  );
};
