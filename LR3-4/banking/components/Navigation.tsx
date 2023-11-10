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
    <nav className="w-full bg-white border-gray-200 dark:bg-gray-900 border-b-gray-200 border-b-[1px]">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
            {props.headingElement}
                <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    {
                        props.routes.map(route => (
                            <li key={route.link}>
                                <Link href={route.link}
                                      className="block text-blue-700 p-0"
                                      aria-current="page"
                                >
                                    {route.title}</Link>
                            </li>
                        ))
                    }
                </ul>
        </div>
    </nav>
);
