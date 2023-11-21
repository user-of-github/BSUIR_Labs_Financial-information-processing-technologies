import React from 'react';

import { ColoredHeading } from '@/components/UI/ColoredHeading';

export const metadata = {
  title: 'Login'
};
export default function LoginLayout({ children }: React.PropsWithChildren<any>) {
  return (
    <>
      <ColoredHeading headingLevel={1} coloredText="Log in" ordinaryText=" form" />
      {children}
    </>
  );
}
