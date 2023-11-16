'use client';
import React from 'react';
import { LabeledInput } from '@/components/UI/Input';
import clsx from 'clsx';

interface CurrencyConverterFormProps {
  conversionRatios: Map<string, Map<string, number>>;
  className?: string;
}

export const CurrencyConverterForm = ({ conversionRatios, className }: CurrencyConverterFormProps): JSX.Element => {
  const currenciesNames: string[] = Array.from(conversionRatios.keys());
  const [currencyFrom, setCurrencyFrom] = React.useState<string>(currenciesNames[0]);
  const [currencyTo, setCurrencyTo] = React.useState<string>(currenciesNames[0]);
  const [currencyFromValue, setCurrencyFromValue] = React.useState<number>(1);
  const [currencyToValue, setCurrencyToValue] = React.useState<number>(1);

  React.useEffect(() => {
    const ratio = conversionRatios.get(currencyFrom)?.get(currencyTo) || 0;
    setCurrencyToValue(currencyFromValue * ratio);
  }, [currencyFrom, currencyTo, currencyToValue, currencyFromValue]);

  return (
    <div className={clsx('flex w-auto flex-row justify-center gap-5 pt-5 max-md:flex-col', className)}>
      <CurrencySelectionBlock
        title="From"
        currenciesList={currenciesNames}
        onCurrencyNameChange={setCurrencyFrom}
        onCurrencyValueChange={(value) => !Number.isNaN(value) && value >= 0 && setCurrencyFromValue(value)}
        selected={currencyFrom}
        enteredValue={currencyFromValue}
      />

      <CurrencySelectionBlock
        title="To"
        currenciesList={currenciesNames}
        onCurrencyNameChange={setCurrencyTo}
        selected={currencyTo}
        enteredValue={currencyToValue}
        disabled
      />
    </div>
  );
};

interface CurrencySelectionBlockProps {
  title: string;
  currenciesList: string[];
  selected: string;
  enteredValue: number;
  onCurrencyNameChange: (newCurrency: string) => void;
  onCurrencyValueChange?: (newCurrency: number) => void;
  disabled?: boolean;
}

const CurrencySelectionBlock = ({
  title,
  currenciesList,
  onCurrencyNameChange,
  onCurrencyValueChange,
  enteredValue,
  selected,
  disabled
}: CurrencySelectionBlockProps): JSX.Element => {
  return (
    <section className="flex w-auto flex-col rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800">
      <h2 className="pb-5 text-3xl font-bold dark:text-white">{title}</h2>
      <div className="flex flex-row items-center gap-x-3 border-t border-t-neutral-200 pt-5">
        <div className="flex flex-col">
          <label htmlFor="years" className="mb-1 block text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </label>
          <select
            size={3}
            className="block w-full overflow-hidden rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:outline-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={(event) => onCurrencyNameChange(event.currentTarget.value)}
          >
            {currenciesList.map((currencyName) => (
              <option key={currencyName} selected={currencyName === selected}>
                {currencyName}
              </option>
            ))}
          </select>
        </div>
        <LabeledInput label="Value" type="number" value={enteredValue} disabled={disabled} onChange={onCurrencyValueChange} />
      </div>
    </section>
  );
};
