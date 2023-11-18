import Link from 'next/link';
import { Route } from '@/core/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Button } from '@/components/UI/Button';

interface NavigationProps {
  routes: Route[];
  headingElement?: JSX.Element;
}

export const Navigation = async (props: NavigationProps) => {
  const supabase = createServerComponentClient({ cookies });
  const data = await supabase.auth.getSession();
  const session = data?.data?.session;

  return (
    <nav className="w-full border-b-[1px] border-gray-200 border-b-gray-200 bg-white dark:bg-gray-900">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-4 max-md:flex-col">
        {props.headingElement}
        <ul className="items-center mt-4 flex flex-col rounded-lg p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row max-md:gap-y-4 md:gap-x-8 max-md:w-full md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
          {props.routes.map((route) => (
            <li key={route.link}>
              <Link href={route.link} className="flex p-0 max-md:p-3 text-blue-700 max-md:bg-gray-50 max-md:border max-md:border-gray-100 max-md:rounded-xl" aria-current="page">
                {route.title}
              </Link>
            </li>
          ))}
          <li>
            {
              session ?  (
                <Link href="/signOut">
                  <Button type="button" text="Log out" appearance="purple" className="w-full"/>
                </Link>
              ): (
                <Link href="/login">
                <Button type="button" text="Log in" appearance="purple" className="w-full"/>
                </Link>
              )
            }
          </li>
        </ul>
      </div>
    </nav>
  );
};
