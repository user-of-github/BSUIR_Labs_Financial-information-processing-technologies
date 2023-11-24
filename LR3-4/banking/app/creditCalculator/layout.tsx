import React from 'react';
import { ColoredHeading } from '@/components/UI/ColoredHeading';

export default function CreditPageLayout({children}: React.PropsWithChildren) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Credits calculator"/>
      {children}
    </>
  );
}
