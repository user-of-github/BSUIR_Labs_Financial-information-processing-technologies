import React from 'react';

import { ColoredHeading } from '@/components/UI/ColoredHeading';

export default function SignUpLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Welcome! Ready to " ordinaryText=" become our client ?" swap />
      {children}
    </>
  );
}
