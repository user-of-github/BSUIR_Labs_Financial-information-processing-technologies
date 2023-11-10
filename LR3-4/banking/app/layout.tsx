import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navigation } from '@/components/Navigation';
import { HeadingElement, routes } from '@/app/constants';
import './globals.css';

const inter = Inter({subsets: ['cyrillic', 'latin']});

export const metadata: Metadata = {
    title: 'Web Banking',
    description: 'Directed by Slutski Mikita'
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={inter.className}>
            <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <Navigation headingElement={HeadingElement} routes={routes}/>
            <main className="pt-5">
                {children}
            </main>
        </body>
        </html>
    );
}
