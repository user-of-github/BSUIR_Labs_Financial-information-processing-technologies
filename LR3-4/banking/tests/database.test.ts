import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { getAccountData, INITIAL_ACCOUNT_AMOUNT, invalidTransferAmounts, user1, user2, validTransferAmount } from './mocks';


describe('Supabase logic', () => {
  let Supabase: SupabaseClient, SupabaseAdmin: SupabaseClient;

  /*  Initialize Supabase Client, Register 2 new users, Save their id  */
  beforeAll(async () => {
    SupabaseAdmin = createClient(process.env.DB_URL as string, process.env.DB_KEY_ADMIN as string);
    Supabase = createClient(process.env.DB_URL as string, process.env.DB_KEY as string);

    const signUpResponse1 = await Supabase.auth.signUp(user1);
    const signUpResponse2 = await Supabase.auth.signUp(user2);

    if (signUpResponse1.data.user) {
      user1.id = signUpResponse1.data.user.id;
      console.log('Signed up a new user: ', user1.id);
    }

    if (signUpResponse2.data.user) {
      user2.id = signUpResponse2.data.user.id;
      console.log('Signed up a new user: ', user2.id);
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

  describe('Money account creation & access works', () => {
    test('Unauthorized user can not create a new money account', async () => {
      const unauthorizedResult = await Supabase.from('BankAccounts').insert(getAccountData('84884', 'Not valid access'));
      expect(unauthorizedResult.data).toBe(null);
      expect(unauthorizedResult.error).not.toBe(null);
    });

    test.each([user1, user2])('Creates virtual money account (card)', async (user) => {
      const logInResult = await Supabase.auth.signInWithPassword({ email: user.email, password: user.password });
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
      user.createdAccountId = moneyAccounts.data![0]!.number;

      const logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);
    });
  });

  describe('Payments logic works correctly', () => {
    test.each(invalidTransferAmounts)('Payment procedure throws error on invalid amounts', async (amount) => {
      const logInResult = await Supabase.auth.signInWithPassword({ email: user1.email, password: user1.password });
      expect(logInResult.error).toBe(null);

      const transferResult = await Supabase.rpc('transfer_money', {
        receiver_id: user2.createdAccountId,
        sender_id: user1.createdAccountId,
        transfer_amount: amount
      });
      expect(transferResult.error).not.toBe(null);

      const logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);
    });

    test('Valid payment is processed', async () => {
      let logInResult = await Supabase.auth.signInWithPassword({ email: user1.email, password: user1.password });
      expect(logInResult.error).toBe(null);

      const transferResult = await Supabase.rpc('transfer_money', {
        receiver_id: user2.createdAccountId,
        sender_id: user1.createdAccountId,
        transfer_amount: validTransferAmount
      });
      expect(transferResult.error).toBe(null);

      const sendersAccountResult = await Supabase.from('BankAccounts').select('*').eq('number', user1.createdAccountId);
      expect(sendersAccountResult.error).toBe(null);
      expect(sendersAccountResult.data).toHaveLength(1);
      expect(sendersAccountResult.data![0].amount).toEqual(INITIAL_ACCOUNT_AMOUNT - validTransferAmount);

      let logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);

      logInResult = await Supabase.auth.signInWithPassword({ email: user2.email, password: user2.password });
      expect(logInResult.error).toBe(null);

      const receiversAccountResult = await Supabase.from('BankAccounts').select('*').eq('number', user2.createdAccountId);
      expect(receiversAccountResult.error).toBe(null);
      expect(receiversAccountResult.data).toHaveLength(1);
      expect(receiversAccountResult.data![0].amount).toEqual(INITIAL_ACCOUNT_AMOUNT + validTransferAmount);

      logOutResult = await Supabase.auth.signOut();
      expect(logOutResult.error).toBe(null);
    });
  });

  describe('Authorization', () => {
    test('Unable to authorize with wrong credentials', async () => {
      let loginResult = await Supabase.auth.signInWithPassword({
        email: user1.email,
        password: user1.password + 'invalid-password'
      });
      expect(loginResult.error).not.toBe(null);

      loginResult = await Supabase.auth.signInWithPassword({
        email: user1.email + 'm',
        password: user1.password
      });
      expect(loginResult.error).not.toBe(null);

      loginResult = await Supabase.auth.signInWithPassword({
        email: user1.email,
        password: user2.password
      });
      expect(loginResult.error).not.toBe(null);
    });
  });

  /* Remove created users */
  afterAll(async () => {
    const deleteResult1 = await SupabaseAdmin.auth.admin.deleteUser(user1.id!);
    expect(deleteResult1.error).toBe(null);

    const deleteResult2 = await SupabaseAdmin.auth.admin.deleteUser(user2.id!);
    expect(deleteResult2.error).toBe(null);
  });
});
