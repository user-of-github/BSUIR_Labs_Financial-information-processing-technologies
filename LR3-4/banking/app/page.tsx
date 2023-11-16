import Image from 'next/image';
import { PromoBlock } from '@/components/PromoBlock';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/home');
  return <></>;
}
