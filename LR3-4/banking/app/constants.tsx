import Link from 'next/link';
import Image from 'next/image';
import { Route } from '@/core/types';
import React from 'react';

export const HeadingElement = (
    <Link href="/home" className="flex items-center">
        <Image src="/assets/images/logo.png" height={25} width={25} objectFit="contain" alt="Banking logo"/>
        <span className="ml-3 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Online Banking</span>
    </Link>
);



export const routes: Route[] = [{
    title: 'Home',
    link: '/home'
}, {
    title: 'Currencies',
    link: '/currencies'
}, {
    title: 'Account',
    link: '/account'
}];
