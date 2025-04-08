
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { checkIfTestDriverExists, createTestDriver, loginWithTestDriver } from '@/services/testDriverService';
import { LoginFormValues, RegisterFormValues } from '@/types/auth';

export const useDriverAuth = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
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
        userType: 'driver'
      });
      
      if (authResult.error) {
        return;
      }
      
      if (authResult.user) {
        const driverData = {
          user_id: authResult.user.id,
          full_name: data.fullName,
          phone: data.phone,
          cpf: data.cpf,
          cnh: data.cnh,
          cnh_category: data.cnhCategory,
          has_ear: data.hasEar
        };

        const { error: driverError } = await supabase
          .from('drivers')
          .insert(driverData);

        if (driverError) {
          toast({
            title: 'Erro ao criar perfil de motorista',
            description: driverError.message,
            variant: 'destructive',
          });
          return;
        }

        toast({
          title: 'Conta criada com sucesso!',
          description: 'Você foi cadastrado como motorista.',
        });
        
        navigate('/driver/dashboard');
      }
    } catch (error: any) {
      toast({
        title: 'Erro ao criar conta',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTestDriverLogin = async () => {
    setIsTestLoading(true);
    try {
      console.log("Iniciando login como motorista de teste");
      
      // Verificar se o usuário já existe
      const userExists = await checkIfTestDriverExists();
      
      if (userExists) {
        console.log("Usuário de teste encontrado, fazendo login");
        // Usuário existe, fazer login
        const result = await loginWithTestDriver(signIn);
        
        if (!result.error) {
          toast({
            title: 'Login como motorista de teste',
            description: 'Você entrou como motorista de teste.',
          });
          navigate('/driver/dashboard');
        } else {
          console.error("Erro ao fazer login:", result.error);
          toast({
            title: 'Erro ao fazer login',
            description: result.error.message,
            variant: 'destructive',
          });
        }
      } else {
        console.log("Usuário de teste não encontrado, criando novo usuário");
        // Se não existe, criar o usuário de teste
        await createTestDriver(signUp);
        
        console.log("Fazendo login após criação");
        // Fazer login com as credenciais criadas
        const loginResult = await loginWithTestDriver(signIn);
        
        if (!loginResult.error) {
          toast({
            title: 'Motorista de teste criado',
            description: 'Você entrou como motorista de teste.',
          });
          navigate('/driver/dashboard');
        } else {
          console.error("Erro ao fazer login após criação:", loginResult.error);
          throw new Error(loginResult.error.message);
        }
      }
    } catch (error: any) {
      console.error("Erro no processo de login de teste:", error);
      toast({
        title: 'Erro ao entrar como motorista de teste',
        description: error.message || 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsTestLoading(false);
    }
  };

  return {
    isSubmitting,
    isTestLoading,
    handleLogin,
    handleRegister,
    handleTestDriverLogin
  };
};
