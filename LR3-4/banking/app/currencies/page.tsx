import { redirect } from 'next/navigation';

export default function Currencies(): JSX.Element {
  redirect('/currencies/currencyRates');
}
