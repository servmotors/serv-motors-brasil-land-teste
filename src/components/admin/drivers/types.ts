
import type { DriverType } from '@/contexts/auth/types';

export type ProfileData = {
  email: string;
  full_name: string | null;
  avatar_url: string | null;
};

export type DriverWithProfile = DriverType & {
  profiles: ProfileData | null;
};

export type FilterStatus = 'all' | 'pending' | 'approved';
