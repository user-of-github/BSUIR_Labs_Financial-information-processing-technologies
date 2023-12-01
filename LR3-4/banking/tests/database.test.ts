import { SupabaseClient, createClient } from '@supabase/supabase-js';

import { email, password, phone, signUpMetadata } from './mocks';

describe('Supabase logic', () => {
  let Supabase: SupabaseClient;
  let createdUserId: string;
  /*
  Initialize SupaBase Client
  Register a new user
  Save its id
   */
  beforeAll(async () => {
    Supabase = createClient(process.env.DB_URL as string, process.env.DB_KEY as string);
    const signInResponse = await Supabase.auth.signUp({ email, password, phone, options: { data: signUpMetadata } });

    if (signInResponse.data.user) {
      createdUserId = signInResponse.data.user.id;
      console.log(createdUserId);
    }
  });

  test('Log in. Trigger for PROFILES table works', async () => {
    const logInResult = await Supabase.auth.signInWithPassword({ email, password });
    const profilesResult = await Supabase.from('Profiles').select('*');
    console.log(profilesResult.data);
  });

  afterAll(async () => {
    const deleteResult = await Supabase.auth.admin.deleteUser(createdUserId);
    console.log(deleteResult);
  });
});
