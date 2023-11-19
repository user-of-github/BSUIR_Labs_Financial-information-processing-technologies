import React from 'react';
import { ColoredHeading } from '@/components/UI/ColoredHeading';

export default function MoneyAccountsListLayout({children}: React.PropsWithChildren) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Your money accounts list"  className="mb-4" />
      {children}
    </>
  );
}
