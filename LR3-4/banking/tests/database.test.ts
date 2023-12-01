import { SupabaseClient, createClient } from '@supabase/supabase-js';

import exp from 'constants';

import { email, password, phone, signUpMetadata } from './mocks';

describe('Supabase logic', () => {
  let Supabase: SupabaseClient;
  let createdUserId: string;

  /*  Initialize SupaBase Client, Register a new user, Save its id  */
  beforeAll(async () => {
    Supabase = createClient(process.env.DB_URL as string, process.env.DB_KEY as string);
    const signInResponse = await Supabase.auth.signUp({ email, password, phone, options: { data: signUpMetadata } });

    if (signInResponse.data.user) {
      createdUserId = signInResponse.data.user.id;
      console.log(createdUserId);
    }
  });

  describe('Sign up logic works correctly', () => {
    test('Log in after sign up is successful', async () => {
      const logInResult = await Supabase.auth.signInWithPassword({ email, password });
      expect(logInResult.error).toBe(null);
    });

    test('Trigger for PROFILES table worked correctly', async () => {
      const profilesResult = await Supabase.from('Profiles').select('*');

      expect(profilesResult.data).not.toBe(null);
      const profile = profilesResult.data?.find((item) => item.id === createdUserId);
      expect(profile).not.toBe(null);
      expect(profile).toEqual({ ...signUpMetadata, id: createdUserId });
    });
  });

  /* Remove a created user */
  afterAll(async () => {
    const deleteResult = await Supabase.auth.admin.deleteUser(createdUserId);
    console.log(deleteResult);
  });
});
