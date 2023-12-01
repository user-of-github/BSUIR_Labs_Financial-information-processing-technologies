import { UserMetaData } from '@/core/types';

export const email: Readonly<string> = 'testemail@test.com';
export const password: Readonly<string> = 'passworD@123456789';
export const phone: Readonly<string> = '+375290000000';

type SignUpMetadata = Readonly<Omit<UserMetaData, 'id'>>;

export const signUpMetadata: Readonly<SignUpMetadata> = {
  first_name: 'Anthony',
  middle_name: 'Howard',
  last_name: 'Stark',
  passport_id: 'MP1234567',
  client_from_date: new Date().toDateString()
};
