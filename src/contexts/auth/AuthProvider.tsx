
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthContextType, ProfileType, DriverType } from './types';
import { fetchProfile, fetchDriverProfile } from './profileUtils';
import { signIn as authSignIn, signUp as authSignUp, signOut as authSignOut } from './authUtils';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [driverProfile, setDriverProfile] = useState<DriverType | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener before checking for existing session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('Auth state changed:', event);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        if (currentSession?.user) {
          // Use setTimeout to prevent Supabase deadlocks
          setTimeout(() => {
            handleFetchProfile(currentSession.user.id);
            handleFetchDriverProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
          setDriverProfile(null);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('Session retrieved:', currentSession ? 'active' : 'none');
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        handleFetchProfile(currentSession.user.id);
        handleFetchDriverProfile(currentSession.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleFetchProfile = async (userId: string) => {
    const data = await fetchProfile(userId);
    setProfile(data);
  };

  const handleFetchDriverProfile = async (userId: string) => {
    const data = await fetchDriverProfile(userId);
    setDriverProfile(data);
  };

  const refreshDriverProfile = async () => {
    if (user) {
      await handleFetchDriverProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const data = await authSignIn(email, password);
      
      if (data.error) {
        toast({
          title: 'Erro ao fazer login',
          description: data.error.message,
          variant: 'destructive',
        });
      }
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Erro ao fazer login',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      const data = await authSignUp(email, password, userData);
      
      if (data.error) {
        toast({
          title: 'Erro ao criar conta',
          description: data.error.message,
          variant: 'destructive',
        });
      }
      
      return data;
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    }
  };

  const signOut = async () => {
    await authSignOut();
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        driverProfile,
        loading,
        signIn,
        signUp,
        signOut,
        refreshDriverProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
