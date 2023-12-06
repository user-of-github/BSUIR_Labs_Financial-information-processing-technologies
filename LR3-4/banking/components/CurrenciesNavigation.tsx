import Link from 'next/link';

const routes = [
  {
    link: '/currencies/currencyRates',
    text: 'Currency Rates'
  },
  {
    link: '/currencies/currencyConverter',
    text: 'Currency Converter'
  }
];

export const CurrenciesNavigation = (): JSX.Element => {
  return (
    <div className="mb-5 flex gap-5 max-md:gap-2">
      {routes.map((route) => (
        <Link
          className="border-primary-100 text-primary-700 hover:border-primary-accent-100 focus:border-primary-accent-100 active:border-primary-accent-200 inline-block rounded border-2 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 focus:outline-none focus:ring-0 max-md:w-full items-center flex justify-center text-center"
          href={route.link}
          key={route.link}
        >
          {route.text}
        </Link>
      ))}
    </div>
  );
};
