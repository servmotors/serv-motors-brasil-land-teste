
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
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Use non-optional types for form values to match component expectations
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

  // Use non-optional types for form values to match component expectations
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
