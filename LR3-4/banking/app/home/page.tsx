import { HomePromos } from '@/components/HomePromos';

export default function Home() {
    return (
        <main className="flex w-full container m-auto py-5 sm:px-6 max-sm:px-2">
            <div className="flex w-full">
                <HomePromos/>
            </div>
        </main>
    );
}
