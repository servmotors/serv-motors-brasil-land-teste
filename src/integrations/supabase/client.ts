
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lyoakkonnygmglitdgjh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5b2Fra29ubnlnbWdsaXRkZ2poIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNTM3ODAsImV4cCI6MjA1OTYyOTc4MH0.HpXoJ_2ZR5B8_ujgWbDEW1_OeGtEyAUSRvZh4Cc9wiw";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
