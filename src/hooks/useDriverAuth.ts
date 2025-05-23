
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { LoginFormValues, RegisterFormValues } from '@/types/auth';

export const useDriverAuth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  const isDemoAccount = (email: string, password: string) => {
    return email === 'demo@motorista.com' && password === 'demo123';
  };

  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      // Check for demo account
      if (isDemoAccount(data.email, data.password)) {
        toast({
          title: 'Modo Demo',
          description: 'Bem-vindo ao modo de demonstração!',
        });
        navigate('/motorista/dashboard');
        return;
      }

      const response = await signIn(data.email, data.password);
      
      if (response.error) {
        toast({
          title: 'Erro ao fazer login',
          description: response.error.message,
          variant: 'destructive',
        });
        return;
      }

      if (response.data?.user) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta.',
        });
        navigate('/motorista/dashboard');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const authResult = await signUp(data.email, data.password, {
        fullName: data.fullName,
        userType: 'driver',
        phone: data.phone,
        profileImage: data.profileImage
      });
      
      if (authResult.error) {
        toast({
          title: 'Erro ao criar conta',
          description: authResult.error.message,
          variant: 'destructive',
        });
        return authResult;
      }
      
      if (authResult.data?.user) {
        toast({
          title: 'Conta criada com sucesso!',
          description: 'Você foi cadastrado como motorista.',
        });
        
        navigate('/motorista/dashboard');
      }
      
      return authResult;
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
      return { error };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    handleLogin,
    handleRegister
  };
};
