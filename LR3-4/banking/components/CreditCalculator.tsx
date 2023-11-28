'use client';

import React from 'react';

import { Button } from '@/components/UI/Button';
import { ColoredHeading } from '@/components/UI/ColoredHeading';
import { LabeledInput } from '@/components/UI/LabeledInput';
import { RangeInput } from '@/components/UI/RangeInput';
import { InfoBadge } from '@/components/UI/StateBadge';
import { getMonthlyPayment } from '@/core/utils';

interface CreditCalculatorProps {
  percent: number;
}
export const CreditCalculator = (props: CreditCalculatorProps) => {
  const [creditSum, setCreditSum] = React.useState<number>(100);
  const [creditTerm, setCreditTerm] = React.useState<number>(1);
  const [monthlyPayment, setMonthlyPayment] = React.useState<number>(1);

  React.useEffect(() => {
    const newMonthlyPayment = getMonthlyPayment(creditSum, creditTerm, props.percent);
    setMonthlyPayment(newMonthlyPayment);
  }, [creditSum, creditTerm]);

  return (
    <div className="flex max-md:flex-col max-md:gap-y-6 w-4/5 max-md:w-full gap-x-7 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="flex flex-col gap-y-5 w-full">
        <LabeledInput
          label="Credit sum, BYN"
          onChange={setCreditSum}
          value={creditSum}
          type="number"
          min={1}
          max={100000}
          maxLength={10}
        />
        <RangeInput
          dimensionTitle="year(s)"
          min={1}
          max={10}
          label="Credit term (years)"
          onChange={setCreditTerm}
          value={creditTerm}
        />
      </div>
      <div className="flex flex-col p-5 border border-1 border-gray-200 rounded-xl w-full">
        <ColoredHeading headingLevel={3} ordinaryText="Our proposal:" className="font-medium" />
        <div className="flex flex-row gap-x-4">
          <span className="w-full text-lg text-gray-500">
            Monthly payment
            <br />
            <strong className="text-black text-2xl">{monthlyPayment.toFixed(2)} BYN </strong>
          </span>

          <span className="w-full text-lg text-gray-500">
            Interest rate <br />
            <strong className="text-black text-2xl">{props.percent} %</strong>
          </span>
        </div>

        <div className="flex flex-col p-3 gap-y-2 mt-5 border border-1 border-gray-200 rounded-xl w-full">
          <span className="text-md text-gray-500">You'll need:</span>
          <div className="flex gap-x-1 text-gray-800">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4 3C4 2.44772 4.44772 2 5 2H12.185C13.9599 2 15.3468 3.53245 15.1701 5.29851L15.0243 6.75677C15.0117 6.88251 15.1175 6.98825 15.2432 6.97568L16.7015 6.82985C18.4675 6.65325 20 8.0401 20 9.81496V21C20 21.5523 19.5523 22 19 22H12.2429C12.2294 21.8054 12.1872 21.61 12.114 21.4197L11.7217 20.4C11.925 20.3104 12.1248 20.211 12.3204 20.1018C13.995 19.1676 15.2219 17.6013 15.7356 15.7529C16.2489 13.9054 16.0081 11.9278 15.0728 10.2527C14.5344 9.28853 13.3165 8.94317 12.3521 9.48118L11.9455 9.70805C11.3234 8.72039 10.2411 8.04901 9 8H4V3Z"
                fill="#0B1F35"
              />
              <path
                d="M4.76306 11.9913L3.50164 11.6506C3.50164 10.739 4.24097 10 5.15299 10H6.00274L7.00318 11L8.00362 10H8.85338C9.76539 10 10.5047 10.739 10.5047 11.6506L9.24331 11.9913C8.80694 12.1092 8.50385 12.5049 8.50385 12.9567V13.7621C8.51091 14.1703 8.84411 14.5 9.25408 14.5C9.66848 14.5 10.0044 14.1642 10.0044 13.75L10.0044 13.0812L13.3265 11.2278C14.0066 12.4456 14.18 13.8808 13.8085 15.2174C13.4371 16.5541 12.5513 17.6828 11.346 18.3553C10.6335 18.7527 9.84392 18.9716 9.04197 19.0044L10.2473 22.1378C9.261 22.7026 8.14216 23 7.00325 23C5.86434 23 4.7455 22.7026 3.75917 22.1378L4.96454 19.0044C4.17069 18.9738 3.38853 18.7608 2.68095 18.372C1.47145 17.7074 0.578915 16.5838 0.199692 15.2483C-0.17953 13.9128 -0.014375 12.4747 0.658826 11.2505L4.00176 13.0873V13.75C4.00176 14.1642 4.3377 14.5 4.7521 14.5C5.16441 14.5 5.49664 14.1676 5.5 13.7562L5.50243 12.9567C5.50243 12.5049 5.19943 12.1092 4.76306 11.9913Z"
                fill="#0B1F35"
              />
            </svg>
            Passport
          </div>
        </div>

        <InfoBadge title="ⓘ To get money request to the nearest office" className="mt-4" />
      </div>
    </div>
  );
};
