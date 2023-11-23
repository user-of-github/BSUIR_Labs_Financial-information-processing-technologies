import React from 'react';

import { ColoredHeading } from '@/components/UI/ColoredHeading';

export const metadata = {
  title: 'Money accounts'
};

export default function MoneyAccountsListLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Virtual cards (Money accounts)" className="mb-4" />
      {children}
    </>
  );
}
