
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/integrations/supabase/client';
import Header from '@/components/auth/Header';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import TestDriverButton from '@/components/auth/TestDriverButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { loginSchema, registerSchema } from '@/types/auth';
import { useDriverAuth } from '@/hooks/useDriverAuth';

const DriverAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  
  const { 
    isSubmitting, 
    isTestLoading, 
    handleLogin, 
    handleRegister, 
    handleTestDriverLogin 
  } = useDriverAuth();

  // Login form with zod validation
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

  // Register form with zod validation
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigateBack={() => navigate('/')} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <TestDriverButton 
            onClick={handleTestDriverLogin}
            isLoading={isTestLoading}
          />
          
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
