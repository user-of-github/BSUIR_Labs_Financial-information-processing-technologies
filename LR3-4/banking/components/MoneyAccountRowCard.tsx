import Link from 'next/link';
import { InfoBadge } from '@/components/UI/StateBadge';
import { MoneyAccount } from '@/core/types';

type MoneyAccountRowCardProps = Omit<MoneyAccount, 'owner'>;

export const MoneyAccountRowCard = (props: MoneyAccountRowCardProps) => {
  return (
    <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white truncate">
        Money account <br /> {props.name && props.name}
        <br />
        {props.number.slice(0, 10) + new Array(props.number.length - 10).fill('*').join('') + props.number.slice(20)}
      </h5>
      <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
        <InfoBadge title={props.currency.code} className="mr-auto w-fit max-w-[100px]" />
      </p>
      <Link href={`/account/moneyAccounts/${props.number}`} className="inline-flex items-center text-blue-600 hover:underline">
        See this money account
        <svg
          className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 18 18"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
          />
        </svg>
      </Link>
    </div>
  );
};
