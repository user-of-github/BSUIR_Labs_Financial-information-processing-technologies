import supabase from '@/core/database/database';
import { DBResponse, CurrencyBuySell } from '@/core/types';

export default async function CurrencyRates(): Promise<JSX.Element> {
  const { data } = (await supabase
    .from('CurrencyBuySell')
    .select('bank_buys, bank_sells, currency:Currencies (code:short_code_title)')) as DBResponse<CurrencyBuySell[]>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Currency Rates
        </span>
      </h1>

      <div className="max-w-[500px]">
        <table className="w-full text-center text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th></th>
              {data!.map((item) => (
                <th key={item.currency.code} className="px-6 py-3">
                  {item.currency.code}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Bank sells
              </th>
              {data!.map((item) => (
                <td key={item.currency.code} className="px-6 py-3">
                  {item.bank_sells}
                </td>
              ))}
            </tr>
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white">
                Bank buys
              </th>
              {data!.map((item) => (
                <td key={item.currency.code} className="px-6 py-3">
                  {item.bank_buys}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </>

  );
}
