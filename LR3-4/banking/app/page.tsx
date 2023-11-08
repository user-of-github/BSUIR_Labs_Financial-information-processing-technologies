import Image from 'next/image';
import { PromoBlock } from '@/components/PromoBlock';

export default function Home() {
    return (
        <main className="flex w-full container m-auto py-5 sm:px-6 max-sm:px-2">
            <div className="flex w-full">
                <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-x-6 gap-y-7 w-full">
                    <PromoBlock isClickable={false} className="sm:col-span-2" title="Online Banking System"
                                description="This system was created during 'Financial processing technologies' at BSUIR by Slutski Mikita. The main stack includes NextJS and TypeScript. Welcome to online Banking system, which allows you to create bills, make loans, transfer money and exchange currency"
                                backgroundImage="/assets/images/debit-card.png" color="rgb(242, 247, 255)"/>
                    <PromoBlock title="Opening a new bill" description="Create your first or additional bill in any currency you like"
                                backgroundImage="/assets/images/accounting.png" color="rgb(251, 245, 255)"/>
                    <PromoBlock title="Currencies" description="Our bank tries to provide most attractive currency-exchange tariffs"
                                backgroundImage="/assets/images/exchange.png" color="rgb(219, 255, 245)"/>
                    <PromoBlock title="Money transfers" description="Check out our new feature — quick transfers via QR codes !"
                                backgroundImage="/assets/images/money-transfer.png" color="rgb(224, 255, 224)"/>
                </div>
            </div>
        </main>
    );
}
