import Link from 'next/link';
import { PromoBlock } from '@/components/PromoBlock';

export const HomePromos = (): JSX.Element => (
  <div className="grid w-full grid-cols-2 gap-x-6 gap-y-7 max-sm:grid-cols-2 max-md:gap-x-2">
    <PromoBlock
      isClickable={false}
      className="col-span-2"
      title="Online Banking System [Educational]"
      description="Welcome to online Banking system, which allows you to create bills, make loans, transfer money and exchange currency. This system was created for 'Financial processing technologies' subject at BSUIR. The main stack includes NextJS, TypeScript and Supabase. "
      backgroundImage="/assets/images/debit-card.png"
      color="rgb(242, 247, 255)"
      titleClassName="mb-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl"
    />
    <Link href="/account/moneyAccounts/create">
      <PromoBlock
        title="Opening a new money account"
        description="Create your first or additional bill in any currency you like"
        backgroundImage="/assets/images/for-promo.png"
        color="rgb(251, 245, 255)"
      />
    </Link>
    <Link href="/currencies">
      <PromoBlock
        title="Currencies"
        description="Our bank tries to provide most attractive currency-exchange tariffs"
        backgroundImage="/assets/images/exchange.png"
        color="rgb(219, 255, 245)"
      />
    </Link>
    <Link href="/payments">
      <PromoBlock
        title="Money transfers"
        description="Check out our new feature — quick transfers via QR codes !"
        backgroundImage="/assets/images/money-transfer.png"
        color="rgb(224, 255, 224)"
      />
    </Link>
  </div>
);
