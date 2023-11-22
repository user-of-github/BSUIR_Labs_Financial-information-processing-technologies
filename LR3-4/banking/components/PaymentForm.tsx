'use client';

import React from 'react';

import { Button } from '@/components/UI/Button';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { Select } from '@/components/UI/Select';
import { MoneyAccount } from '@/core/types';
import { QrScannerComponent } from '@/components/QrScanner';

interface PaymentFormProps {
  availableAccounts: MoneyAccount[];
}
export const PaymentForm = (props: PaymentFormProps) => {
  const [sendersAccount, setSendersAccount] = React.useState<string>('');
  const [selectedAccount, setSelectedAccount] = React.useState(props.availableAccounts[0].number);
  const [selectedAccountInfo, setSelectedAccountInfo] = React.useState<[string, string, string]>([
    props.availableAccounts[0].currency.code,
    props.availableAccounts[0].amount.toString(),
    props.availableAccounts[0].name
  ]);

  const [qrScannerShown, setQrScannerShown] = React.useState<boolean>(false);
  const performPayment = () => {
    // TODO: 2factor
  };

  const openQRScanner = () => {
    setQrScannerShown(true);
  };

  const onScanValues = (value: string) => {
    setQrScannerShown(false);

    try {
      const parsed = JSON.parse(value);
      if (typeof parsed === 'object') {
        if (parsed.number && typeof parsed.number === 'string') {
          setSendersAccount(parsed.number);
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

  return (
    <form className="w-2/3 max-md:w-full flex flex-col gap-y-4 rounded-lg border border-gray-200 bg-white p-6 shadow ">
      <div className="flex flex-row gap-x-4 w-full">
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
      <LabeledInput label="Sender's account number" type="text" onChange={setSendersAccount} value={sendersAccount} required />
      <Button type="button" text="Or use QR scanner" appearance="dark" onClick={openQRScanner}/>
      {qrScannerShown && <QrScannerComponent onScan={onScanValues} onClose={() => setQrScannerShown(false)}/>}
      <Button type="submit" text="Transfer money" appearance="ordinary" onClick={performPayment} />
    </form>
  );
};
