import { Inter } from 'next/font/google';

import { HeadingElement, routes } from '@/app/constants';
import { Navigation } from '@/components/Navigation';
import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Web Banking',
  description: 'Directed by Slutski Mikita'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} overflow-y-scroll pb-20`}>
        <div className="h-2 w-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        <Navigation headingElement={HeadingElement} routes={routes} />
        <main className="container m-auto mt-2 flex w-full flex-col py-5 max-sm:px-2 sm:px-6">{children}</main>
      </body>
    </html>
  );
}
