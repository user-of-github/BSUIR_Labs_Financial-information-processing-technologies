import React from 'react';

import { ColoredHeading } from '@/components/UI/ColoredHeading';

export default function MoneyAccountsListLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Money accounts" className="mb-4" />
      {children}
    </>
  );
}
