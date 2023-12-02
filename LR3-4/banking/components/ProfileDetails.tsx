import Link from 'next/link';
import { Button } from '@/components/UI/Button';
import { ColoredHeading } from '@/components/UI/ColoredHeading';

interface ProfileDetailsProps {
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  clientFrom: string;
  passportId: string;
}

const textContentClassName = 'mt-1 text-md text-gray-900 sm:mt-0 sm:col-span-2' as const;
const textHeadingClassName = 'text-md font-medium text-gray-500' as const;

export const ProfileDetails = (props: ProfileDetailsProps): JSX.Element => (
  <>
    <ColoredHeading headingLevel={1} coloredText="Welcome to your account, " ordinaryText={props.firstName} />
    <section className="bg-white overflow-hidden shadow rounded-lg border mt-5">
      <div className="px-4 py-5 sm:px-6">
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Here is some information about you.</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>First name</dt>
            <dd className={textContentClassName}>{props.firstName}</dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>Middle name</dt>
            <dd className={textContentClassName}>{props.middleName}</dd>
          </div>

          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>Last name</dt>
            <dd className={textContentClassName}>{props.lastName}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>Email address</dt>
            <dd className={textContentClassName}>{props.email}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>Passport ID</dt>
            <dd className={textContentClassName}>{props.passportId?.slice(0, props.passportId.length - 3) + '***'}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className={textHeadingClassName}>Our client since:</dt>
            <dd className={textContentClassName}>{props.clientFrom}</dd>
          </div>
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
            <dt className={textHeadingClassName}>Your virtual cards (money accounts)</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Link href="/account/moneyAccounts" className="inline-flex items-center text-blue-600 hover:underline">
                View
                <svg
                  className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778"
                  />
                </svg>
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </>
);
