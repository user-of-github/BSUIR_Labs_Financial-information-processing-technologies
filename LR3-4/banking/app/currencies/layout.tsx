import { CurrenciesNavigation } from '@/components/CurrenciesNavigation';

export default function CurrenciesLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <>
      <div className="mb-5">
        <CurrenciesNavigation />
      </div>
      {children}
    </>
  );
}
