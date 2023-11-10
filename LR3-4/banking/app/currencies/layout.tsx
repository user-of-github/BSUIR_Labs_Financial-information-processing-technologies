import { CurrenciesNavigation } from '@/components/CurrenciesNavigation';

export default function CurrenciesLayout({children}: { children: React.ReactNode }): JSX.Element {
    return (
        <>
            <CurrenciesNavigation/>
            {children}
        </>
    );
}
