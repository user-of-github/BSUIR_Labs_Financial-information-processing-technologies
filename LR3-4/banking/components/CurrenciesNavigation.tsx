import Link from 'next/link';


const routes = [{
    link: '/currencies/currencyRates',
    text: 'Currency Rates'
}, {
    link: '/currencies/currencyConverter',
    text: 'Currency Converter'
}];

export const CurrenciesNavigation = (): JSX.Element => {
    return (
        <div className="flex gap-5">
            {
                routes.map(route => (
                    <Link
                        className="inline-block rounded border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-100 hover:bg-neutral-500 hover:bg-opacity-10 focus:border-primary-accent-100 focus:outline-none focus:ring-0 active:border-primary-accent-200 dark:text-primary-100 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                href={route.link}
                key={route.link}
                >
                {route.text}
                </Link>

    ))
}
    </div>
);
};
