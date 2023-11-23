import Image from 'next/image';
import Link from 'next/link';

import { Route } from '@/core/types';

export const HeadingElement = (
  <Link href="/home" className="flex items-center transition active:scale-95">
    <Image src="/assets/images/logo.png" height={25} width={25} objectFit="contain" alt="Banking logo" />
    <span className="ml-3 self-center whitespace-nowrap text-2xl font-semibold dark:text-white">Online Banking</span>
  </Link>
);

export const routes: Route[] = [
  {
    title: 'Home',
    link: '/home'
  },
  {
    title: 'Currencies',
    link: '/currencies'
  },
  {
    title: 'Payments',
    link: '/payments'
  },
  {
    title: 'My profile',
    link: '/account'
  },
  {
    title: 'Loans',
    link: '/account/loans'
  }
];
