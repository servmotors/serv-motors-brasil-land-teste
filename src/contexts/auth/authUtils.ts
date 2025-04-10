
import { supabase } from '@/integrations/supabase/client';

export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error };
    }

    return data;
  } catch (error: any) {
    return { error };
  }
};

export const signUp = async (email: string, password: string, userData: any) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: userData.fullName,
          user_type: 'driver'
        },
      },
    });

    if (error) {
      return { error };
    }

    return data;
  } catch (error: any) {
    return { error };
  }
};

export const signOut = async () => {
  await supabase.auth.signOut();
};
