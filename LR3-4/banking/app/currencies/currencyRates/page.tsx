import supabase from '@/core/database/database';
import { DBResponse, CurrencyBuySell } from '@/core/types';


export default async function CurrencyRates(): Promise<JSX.Element> {
    const { data } = (await supabase.from('CurrencyBuySell').select('bank_buys, bank_sells, currency:Currencies (code:short_code_title)')) as DBResponse<CurrencyBuySell[]>;

    return (
        <div className="max-w-[500px] m-auto">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th></th>
                        {data!.map(item => <th key={item.currency.code} className="px-6 py-3">{item.currency.code}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Bank sells
                        </th>
                        {data!.map(item => <td key={item.currency.code} className="px-6 py-3">{item.bank_sells}</td>)}
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Bank buys
                        </th>
                        {data!.map(item => <td key={item.currency.code} className="px-6 py-3">{item.bank_buys}</td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
