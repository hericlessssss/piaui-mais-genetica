import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || supabaseUrl === 'your_supabase_url') {
  throw new Error(
    'Missing Supabase URL. Please click "Connect to Supabase" button and set up your project.'
  );
}

if (!supabaseAnonKey || supabaseAnonKey === 'your_supabase_anon_key') {
  throw new Error(
    'Missing Supabase Anon Key. Please click "Connect to Supabase" button and set up your project.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);