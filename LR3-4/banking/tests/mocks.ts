import { UserMetaData } from '@/core/types';

type SignUpMetadata = Readonly<Omit<UserMetaData, 'id'>>;

interface MockedUserData {
  email: string;
  password: string;
  phone: string;
  options: { data: Readonly<SignUpMetadata> };
  id: string | null;
  createdAccountId: string | null;
}

export const signUpMetadata1: Readonly<SignUpMetadata> = {
  first_name: 'Anthony',
  middle_name: 'Howard',
  last_name: 'Stark',
  passport_id: 'MP1234567',
  client_from_date: new Date().toDateString()
};

export const user1: MockedUserData = {
  email: 'anthony@test.com',
  password: 'anthonyPassword2023TOFI',
  phone: '+375290000000',
  options: { data: signUpMetadata1 },
  id: null,
  createdAccountId: null
};

export const signUpMetadata2: Readonly<SignUpMetadata> = {
  first_name: 'Peter',
  middle_name: 'Benjamin',
  last_name: 'Parker',
  passport_id: 'MP7654321',
  client_from_date: new Date().toDateString()
};

export const user2: MockedUserData = {
  email: 'peterparker@test.com',
  password: 'peterPassword2023TOFI',
  phone: '+375330000000',
  options: { data: signUpMetadata2 },
  id: null,
  createdAccountId: null
};

export const INITIAL_ACCOUNT_AMOUNT = 1000;

export const getAccountData = (owner: string, name: string) => ({
    amount: INITIAL_ACCOUNT_AMOUNT,
    currency: 1,
    date_opened: new Date().toDateString(),
    name,
    owner
}) as const;

export const invalidTransferAmounts = [-1000, 500000] as const;
export const validTransferAmount = 500;
