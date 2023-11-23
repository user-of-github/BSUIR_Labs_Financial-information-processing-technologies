import { cookies } from 'next/headers';
import Link from 'next/link';

import { Button } from '@/components/UI/Button';
import { Route } from '@/core/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

interface NavigationProps {
  routes: Route[];
  headingElement?: JSX.Element;
}

export const Navigation = async (props: NavigationProps) => {
  cookies().getAll();
const supabase = createServerComponentClient({ cookies });
  const data = await supabase.auth.getSession();
  const session = data?.data?.session;

  return (
    <nav className="w-full border-b-[1px] border-gray-200 border-b-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4 max-md:flex-col">
        {props.headingElement}
        <ul className="mt-4 max-md:w-full flex flex-col items-center rounded-lg p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 max-md:w-full max-md:gap-y-4 md:mt-0 md:flex-row md:gap-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {props.routes.map((route) => (
            <li key={route.link} className="max-md:w-full">
              <Link
                href={route.link}
                className="max-md:w-full flex p-0 text-blue-700 max-md:rounded-xl max-md:border max-md:border-gray-100 max-md:bg-gray-50 max-md:p-3"
                aria-current="page"
              >
                {route.title}
              </Link>
            </li>
          ))}
          <li>
            {session ? (
              <Link href="/signOut" className="max-md:w-full max-md:flex max-md:justify-end">
                <Button type="button" text="Log out" appearance="primary" className="max-md:ml-auto" />
              </Link>
            ) : (
              <Link href="/login" className="max-md:w-full max-md:flex max-md:justify-end">
                <Button type="button" text="Log in" appearance="primary" className="max-md:ml-auto" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
