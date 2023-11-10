import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers';

const supabaseUrl= process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export default createClient(supabaseUrl, supabaseKey);
