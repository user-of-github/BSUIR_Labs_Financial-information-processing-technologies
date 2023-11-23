'use client';

import { useState } from 'react';
import { QRCode } from 'react-qrcode-logo';

import { Button } from '@/components/UI/Button';
import { MoneyAccount } from '@/core/types';

const textContentClassName = 'mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2' as const;
const textHeadingClassName = 'text-md font-medium text-gray-500' as const;

export const MoneyAccountData = ({ account }: { account: MoneyAccount }) => {
  const [qrData, setQrData] = useState<string | undefined>(undefined);
  const generateQR = () => {
    setQrData(
      JSON.stringify({
        number: account.number,
        currency: account.currency
      })
    );
  };
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border mt-5 px-2">
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className={textHeadingClassName}>Number</dt>
          <dd className={textContentClassName}>{account.number}</dd>
        </div>

        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className={textHeadingClassName}>Currency</dt>
          <dd className={textContentClassName}>{account.currency.code}</dd>
        </div>

        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className={textHeadingClassName}>Associated name</dt>
          <dd className={textContentClassName}>
            {account.name} {account.name.trim().length === 0 && 'Not provided'}
          </dd>
        </div>

        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt className={textHeadingClassName}>Available amount</dt>
          <dd className={textContentClassName}>{account.amount} {account.currency.code}</dd>
        </div>
      </div>

      {
        <Button
          type="button"
          text="Generate this card's QR for fast money receiving"
          appearance="ordinary"
          onClick={generateQR}
        />
      }
      {qrData && (
        <QRCode
          value={qrData} // here you should keep the link/value(string) for which you are generation promocode
          size={200} // the dimension of the QR code (number)
          qrStyle="squares"
        />
      )}
    </div>
  );
};
