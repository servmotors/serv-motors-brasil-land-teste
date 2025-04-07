
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import Header from '@/components/auth/Header';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Type definition for Supabase drivers table insert
type DriversInsert = Database['public']['Tables']['drivers']['Insert'];

// Define the schema types to match our form interfaces
const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const registerSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  cpf: z.string().min(11, 'CPF inválido'),
  cnh: z.string().min(9, 'CNH inválida'),
  cnhCategory: z.string().min(1, 'Categoria da CNH é obrigatória'),
  hasEar: z.boolean().default(false)
});

// Define these types using the z.infer to ensure they match the schema
type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

const DriverAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTestLoading, setIsTestLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Use the explicit non-optional types matching the component expectations
  const loginForm = useForm<{
    email: string;
    password: string;
  }>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Use the explicit non-optional types matching the component expectations
  const registerForm = useForm<{
    fullName: string;
    email: string;
    password: string;
    phone: string;
    cpf: string;
    cnh: string;
    cnhCategory: string;
    hasEar: boolean;
  }>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      cpf: '',
      cnh: '',
      cnhCategory: '',
      hasEar: false,
    },
  });

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

  const handleTestDriverLogin = async () => {
    setIsTestLoading(true);
    try {
      console.log("Iniciando login como motorista de teste");
      // Credenciais do motorista de teste - usando um email válido
      const testCredentials = {
        email: 'motorista.teste@gmail.com', // Changed to a common valid email domain
        password: 'teste123'
      };
      
      // Verificar se o usuário já existe
      const { data: existingUser } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', testCredentials.email)
        .single();
      
      if (existingUser) {
        console.log("Usuário de teste encontrado, fazendo login");
        // Usuário existe, fazer login
        const result = await signIn(testCredentials.email, testCredentials.password);
        
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
        await createTestDriver();
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

  const createTestDriver = async () => {
    try {
      console.log("Iniciando criação do motorista de teste");
      // Dados do motorista de teste - usando um email válido
      const testCredentials = {
        email: 'motorista.teste@gmail.com', // Changed to a common valid email domain
        password: 'teste123',
        fullName: 'Motorista Teste',
        phone: '11999998888',
        cpf: '12345678901',
        cnh: '123456789',
        cnhCategory: 'B',
        hasEar: true
      };
      
      // Criar conta no Supabase Auth
      console.log("Criando conta de autenticação");
      const authResult = await signUp(testCredentials.email, testCredentials.password, {
        fullName: testCredentials.fullName,
        userType: 'driver'
      });
      
      if (authResult.error) {
        console.error("Erro ao criar autenticação:", authResult.error);
        throw new Error(authResult.error.message);
      }
      
      // Aguardar um momento para garantir que o trigger tenha tempo de criar o perfil
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (authResult.user) {
        console.log("Criando perfil de motorista");
        // Criar perfil de motorista
        const driverData: DriversInsert = {
          user_id: authResult.user.id,
          full_name: testCredentials.fullName,
          phone: testCredentials.phone,
          cpf: testCredentials.cpf,
          cnh: testCredentials.cnh,
          cnh_category: testCredentials.cnhCategory,
          has_ear: testCredentials.hasEar,
          is_approved: true  // Motorista de teste já aprovado
        };

        const { error: driverError } = await supabase
          .from('drivers')
          .insert(driverData);

        if (driverError) {
          console.error("Erro ao criar perfil de motorista:", driverError);
          throw new Error(driverError.message);
        }

        console.log("Fazendo login após criação");
        // Fazer login com as credenciais criadas
        const loginResult = await signIn(testCredentials.email, testCredentials.password);
        
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
      console.error("Erro na criação do motorista de teste:", error);
      toast({
        title: 'Erro ao criar motorista de teste',
        description: error.message || 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
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
        const driverData: DriversInsert = {
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigateBack={() => navigate('/')} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Button 
            variant="outline" 
            className="w-full mb-4 border-dashed border-primary text-primary hover:bg-primary/5"
            onClick={handleTestDriverLogin}
            disabled={isTestLoading}
          >
            {isTestLoading ? 'Processando...' : 'Entrar como Motorista Teste'}
          </Button>
          
          <Tabs defaultValue="login" onValueChange={(value) => setIsRegistering(value === 'register')}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <LoginForm 
                  form={loginForm} 
                  onSubmit={handleLogin}
                  isSubmitting={isSubmitting}
                />
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <RegisterForm 
                  form={registerForm} 
                  onSubmit={handleRegister}
                  isSubmitting={isSubmitting}
                />
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DriverAuth;
