import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import '../globals.css';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'Web Banking. Home',
  description: 'Directed by Slutski Mikita'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
