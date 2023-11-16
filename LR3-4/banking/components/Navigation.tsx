import Image from 'next/image';
import Link from 'next/link';
import { Route } from '@/core/types';

interface NavigationProps {
  routes: Route[];
  headingElement?: JSX.Element;
}

/*

 */
export const Navigation = (props: NavigationProps): JSX.Element => (
  <nav className="w-full border-b-[1px] border-gray-200 border-b-gray-200 bg-white dark:bg-gray-900">
    <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4">
      {props.headingElement}
      <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
        {props.routes.map((route) => (
          <li key={route.link}>
            <Link href={route.link} className="block p-0 text-blue-700" aria-current="page">
              {route.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);
