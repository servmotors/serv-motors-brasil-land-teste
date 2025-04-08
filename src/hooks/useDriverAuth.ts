
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

  const handleLogin = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await signIn(data.email, data.password);
      if (!result.error) {
        toast({
          title: 'Login realizado com sucesso!',
          description: 'Bem-vindo de volta.',
        });
        navigate('/driver/dashboard');
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
        // Add profileImage to the data being passed to signUp
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
        
        navigate('/driver/dashboard');
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
