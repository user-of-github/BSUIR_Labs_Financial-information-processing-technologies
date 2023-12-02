import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { getAccountData, user1, user2 } from './mocks';

describe('Supabase logic', () => {
  let Supabase: SupabaseClient, SupabaseAdmin: SupabaseClient;
  let createdUser1Id: string, createdUser2Id: string;

  /*  Initialize Supabase Client, Register 2 new users, Save their id  */
  beforeAll(async () => {
    SupabaseAdmin = createClient(process.env.DB_URL as string, process.env.DB_KEY_ADMIN as string);
    Supabase = createClient(process.env.DB_URL as string, process.env.DB_KEY as string);

    const signUpResponse1 = await Supabase.auth.signUp(user1);
    const signUpResponse2 = await Supabase.auth.signUp(user2);

    if (signUpResponse1.data.user) {
      createdUser1Id = signUpResponse1.data.user.id;
      console.log('Signed up a new user: ', createdUser1Id);
    }

    if (signUpResponse2.data.user) {
      createdUser2Id = signUpResponse2.data.user.id;
      console.log('Signed up a new user: ', createdUser2Id);
    }
  });

  describe('Sign up logic worked correctly', () => {
    test.each([user1, user2])('Logs in successfully, checks trigger for PROFILES table worked', async (user) => {
      const logInResult = await Supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
      });
      expect(logInResult.error).toBe(null);
      const userId = logInResult.data.user?.id;
      const profilesResult = await Supabase.from('Profiles').select('*');
      expect(profilesResult.data?.length).toEqual(1); // RLS: user has permissions only to his account

      const profile = profilesResult.data?.find((item) => item.id === userId);
      expect(profile).not.toBe(null);
      expect(profile).toEqual({ ...user.options.data, id: userId });

      const logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);
    });
  });

  describe('Payments logic works correctly', () => {
    test('Unauthorized user can not create a new money account', async () => {
      const unauthorizedResult = await Supabase.from('BankAccounts').insert(getAccountData('84884', 'Not valid access'));
      expect(unauthorizedResult.data).toBe(null);
      expect(unauthorizedResult.error).not.toBe(null);
    });

    test.each([user1, user2])('Logs in successfully and creates virtual money account (card)', async (user) => {
      const logInResult = await Supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password
      });
      expect(logInResult.error).toBe(null);

      // Currently there are no opened money accounts
      let moneyAccounts = await Supabase.from('BankAccounts').select('*');
      expect(moneyAccounts.error).toBe(null);
      expect(moneyAccounts.data).toHaveLength(0);

      const accountData = getAccountData(logInResult.data.user!.id, `Account for ${user1.options.data.first_name}`);
      const createMoneyAccountResult = await Supabase.from('BankAccounts').insert(accountData);
      expect(createMoneyAccountResult.error).toBe(null);

      moneyAccounts = await Supabase.from('BankAccounts').select('*');
      expect(moneyAccounts.error).toBe(null);
      expect(moneyAccounts.data).toHaveLength(1);

      const logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);
    });
  });

  /* Remove created users */
  afterAll(async () => {
    const deleteResult1 = await SupabaseAdmin.auth.admin.deleteUser(createdUser1Id);
    expect(deleteResult1.error).toBe(null);

    const deleteResult2 = await SupabaseAdmin.auth.admin.deleteUser(createdUser2Id);
    expect(deleteResult2.error).toBe(null);
  });
});
