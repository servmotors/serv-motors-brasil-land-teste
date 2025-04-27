import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/auth/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { loginSchema, registerSchema, driverIdentitySchema, driverAddressSchema } from '@/types/auth';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import { useRegistrationSteps } from '@/hooks/useRegistrationSteps';
import { useAuthTabs, AuthTab } from '@/hooks/useAuthTabs';
import LoginTab from '@/components/auth/tabs/LoginTab';
import RegisterTab from '@/components/auth/tabs/RegisterTab';
import { useAuth } from '@/contexts/AuthContext';

const DriverAuth = () => {
  const navigate = useNavigate();
  const { user, driverProfile } = useAuth();
  
  useEffect(() => {
    if (user && driverProfile) {
      navigate('/motorista/dashboard');
    }
  }, [user, driverProfile, navigate]);

  const { 
    isSubmitting, 
    handleLogin, 
    handleRegister 
  } = useDriverAuth();

  const { isRegistering, handleTabChange } = useAuthTabs();

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

  const registerForm = useForm<{
    fullName: string;
    email: string;
    repeatEmail: string;
    password: string;
    confirmPassword: string;
    phone: string;
    profileImage?: File;
  }>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      repeatEmail: '',
      password: '',
      confirmPassword: '',
      phone: '',
    },
    mode: 'onTouched'
  });

  const identityForm = useForm<{
    birthDate: Date;
    cpf: string;
    rgFrontDocument: File;
    rgBackDocument: File;
    cnh: string;
    cnhDocument: File;
    cnhExpiry: Date;
    hasRemuneratedActivity: boolean;
  }>({
    resolver: zodResolver(driverIdentitySchema),
    defaultValues: {
      hasRemuneratedActivity: false,
    },
    mode: 'onTouched'
  });

  const addressForm = useForm<{
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
  }>({
    resolver: zodResolver(driverAddressSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
    },
    mode: 'onTouched'
  });

  const { 
    currentStep, 
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
    resetForms
  } = useRegistrationSteps(registerForm, identityForm, addressForm);

  useEffect(() => {
    if (registrationSuccess) {
      resetForms();
      setRegistrationSuccess(false);
    }
  }, [registrationSuccess, resetForms]);

  const handleCompleteRegistration = async () => {
    const addressValid = await addressForm.trigger();
    if (!addressValid) return;

    const accountData = registerForm.getValues();
    const identityData = identityForm.getValues();
    const addressData = addressForm.getValues();

    const result = await handleRegister({
      ...accountData,
      ...identityData,
      ...addressData,
    });
    
    if (result && !result.error) {
      setRegistrationSuccess(true);
    }
  };

  const handleTabValueChange = (value: string) => {
    handleTabChange(value as AuthTab);
    if (value === 'register') {
      setCurrentStep('account');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigateBack={() => navigate('/')} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" onValueChange={handleTabValueChange}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Cadastrar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <LoginTab 
                form={loginForm}
                onSubmit={handleLogin}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
            
            <TabsContent value="register">
              <RegisterTab
                isRegistering={isRegistering}
                currentStep={currentStep}
                registerForm={registerForm}
                identityForm={identityForm}
                addressForm={addressForm}
                handleNextStep={handleNextStep}
                handlePrevStep={handlePrevStep}
                handleCompleteRegistration={handleCompleteRegistration}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DriverAuth;
