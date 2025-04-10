
import { Session, User } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';

export type ProfileType = Database['public']['Tables']['profiles']['Row'];
export type DriverType = Database['public']['Tables']['drivers']['Row'];

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: ProfileType | null;
  driverProfile: DriverType | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, userData: any) => Promise<any>;
  signOut: () => Promise<void>;
  refreshDriverProfile: () => Promise<void>;
};
