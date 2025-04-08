
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/auth/Header';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { loginSchema, registerSchema, driverIdentitySchema, driverAddressSchema } from '@/types/auth';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import { useRegistrationSteps } from '@/hooks/useRegistrationSteps';
import RegisterStepIndicator from '@/components/auth/RegisterStepIndicator';
import IdentityFormStep from '@/components/auth/form-sections/IdentityFormStep';
import AddressFormStep from '@/components/auth/form-sections/AddressFormStep';

const DriverAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  
  const { 
    isSubmitting, 
    handleLogin, 
    handleRegister 
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

  // Register form with zod validation for account details (step 1)
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
  });

  // Identity form with zod validation (step 2)
  const identityForm = useForm<{
    birthDate: Date;
    cpf: string;
    cpfDocument: File;
    cnh: string;
    cnhDocument: File;
    cnhExpiry: Date;
    hasRemuneratedActivity: boolean;
  }>({
    resolver: zodResolver(driverIdentitySchema),
    defaultValues: {
      hasRemuneratedActivity: false,
    },
  });

  // Address form with zod validation (step 3)
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
  });

  const { 
    currentStep, 
    setCurrentStep,
    handleNextStep,
    handlePrevStep 
  } = useRegistrationSteps(registerForm, identityForm);

  const handleCompleteRegistration = async () => {
    const addressValid = await addressForm.trigger();
    if (!addressValid) return;

    // Combine all form data
    const accountData = registerForm.getValues();
    const identityData = identityForm.getValues();
    const addressData = addressForm.getValues();

    // Call registration handler with all data
    await handleRegister({
      ...accountData,
      ...identityData,
      ...addressData,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigateBack={() => navigate('/')} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" onValueChange={(value) => {
            setIsRegistering(value === 'register');
            if (value === 'register') {
              // Reset to first step when switching to register tab
              setCurrentStep('account');
            }
          }}>
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
                {isRegistering && <RegisterStepIndicator currentStep={currentStep} />}
                
                {currentStep === 'account' && (
                  <RegisterForm 
                    form={registerForm} 
                    onSubmit={handleNextStep}
                    isSubmitting={isSubmitting}
                    buttonText="Próximo"
                  />
                )}
                
                {currentStep === 'identity' && (
                  <IdentityFormStep 
                    form={identityForm}
                    handlePrevStep={handlePrevStep}
                    handleNextStep={handleNextStep}
                  />
                )}
                
                {currentStep === 'address' && (
                  <AddressFormStep 
                    form={addressForm}
                    handlePrevStep={handlePrevStep}
                    handleCompleteRegistration={handleCompleteRegistration}
                    isSubmitting={isSubmitting}
                  />
                )}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default DriverAuth;
