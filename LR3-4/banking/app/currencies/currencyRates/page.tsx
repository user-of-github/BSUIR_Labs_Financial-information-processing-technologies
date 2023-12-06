import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { CurrencyBuySell, DBResponse } from '@/core/types';

export default async function CurrencyRates(): Promise<JSX.Element> {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });

  const { data } = (await supabase
    .from('CurrencyBuySell')
    .select('bank_buys, bank_sells, currency:Currencies (code:short_code_title)')) as DBResponse<CurrencyBuySell[]>;

  return (
    <>
      <h1 className="mb-4 text-2xl font-extrabold text-gray-900 md:text-3xl lg:text-4xl">
        <span className="bg-gradient-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">Currency Rates</span>
      </h1>

      <div className="max-w-[500px]">
        <table className="w-full text-center text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
            <tr className="border-b bg-white">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
                Bank sells
              </th>
              {data!.map((item) => (
                <td key={item.currency.code} className="px-6 py-3">
                  {item.bank_sells}
                </td>
              ))}
            </tr>
            <tr className="border-b bg-white">
              <th scope="row" className="whitespace-nowrap px-6 py-4 font-medium text-gray-900">
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
