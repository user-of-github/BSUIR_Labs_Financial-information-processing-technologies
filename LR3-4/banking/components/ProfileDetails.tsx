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
          <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 items-center">
            <dt className={textHeadingClassName}>Your money accounts</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Link href="/account/moneyAccounts">
                <Button type="button" text="View" appearance="primary" />
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  </>
);
