
import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { fetchProfile, fetchDriverProfile } from './profileUtils';
import { signIn, signUp, signOut } from './authUtils';
import { AuthContextType, ProfileType, DriverType } from './types';

const initialState: AuthContextType = {
  session: null,
  user: null,
  profile: null,
  driverProfile: null,
  loading: true,
  signIn: async () => ({ user: null, session: null }),
  signUp: async () => ({ user: null, session: null }),
  signOut: async () => {},
  refreshDriverProfile: async () => {},
};

export const AuthContext = createContext<AuthContextType>(initialState);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Defer Supabase calls with setTimeout
        if (session?.user) {
          setTimeout(() => {
            fetchUserData(session.user.id);
          }, 0);
        } else {
          setProfile(null);
          setDriverProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserData(session.user.id);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserData = async (userId: string) => {
    try {
      const [profileData, driverProfileData] = await Promise.all([
        fetchProfile(userId),
        fetchDriverProfile(userId)
      ]);
      
      setProfile(profileData);
      setDriverProfile(driverProfileData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshDriverProfile = async () => {
    if (user) {
      const driverProfileData = await fetchDriverProfile(user.id);
      setDriverProfile(driverProfileData);
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    const response = await signIn(email, password);
    
    if ('error' in response) {
      console.error('Sign in error:', response.error);
      return { error: response.error };
    }
    
    return response;
  };

  const handleSignUp = async (email: string, password: string, userData: any) => {
    const response = await signUp(email, password, userData);
    
    if ('error' in response) {
      console.error('Sign up error:', response.error);
      return { error: response.error };
    }
    
    return response;
  };

  const contextValue: AuthContextType = {
    session,
    user,
    profile,
    driverProfile,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut,
    refreshDriverProfile,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
