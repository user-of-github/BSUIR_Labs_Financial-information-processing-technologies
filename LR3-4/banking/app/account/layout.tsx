import { redirect } from 'next/navigation';
import { ProtectedComponent } from '@/components/ProtectedComponent';


export default function AccountLayout({ children }: { children: React.ReactNode }){
  return (
    <ProtectedComponent>
      {children}
    </ProtectedComponent>
  );
};
