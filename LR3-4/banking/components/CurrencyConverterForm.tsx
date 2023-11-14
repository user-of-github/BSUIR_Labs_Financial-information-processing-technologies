'use client'
import React from 'react';


interface CurrencyConverterFormProps {
  conversionRatios: Map<string, Map<string, number>>;
}
export const CurrencyConverterForm = ({conversionRatios}: CurrencyConverterFormProps): JSX.Element => {
  const [currencyFrom, setCurrencyFrom] = React.useState<string>();
  const [currencyTo, setCurrencyTo] = React.useState<string>();

  const currenciesNames: string[] = Array.from(conversionRatios.keys());


  return (
    <div className="flex flex-col">
      <CurrencySelectionBlock
      currenciesList={currenciesNames}
      onCurrencyNameChange={() => {}} onCurrencyValueChange={() => {}}/>
    </div>
  );
};


interface CurrencySelectionBlockProps {
  currenciesList: string[];
  onCurrencyNameChange: (newCurrency: string) => void;
  onCurrencyValueChange: (newCurrency: string) => void;
}

const CurrencySelectionBlock = ({currenciesList, onCurrencyNameChange, onCurrencyValueChange}: CurrencySelectionBlockProps): JSX.Element => {
  return (
     <div className="flex flex-row">
       <div className="flex flex-col">
         <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
         <select id="years" size={2} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
           {
             currenciesList.map(currencyName => <option key={currencyName}>{currencyName}</option>)
           }
         </select>
       </div>
     </div>
  )
};
