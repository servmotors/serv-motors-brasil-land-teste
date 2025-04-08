
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Header from '@/components/auth/Header';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { loginSchema, registerSchema, driverIdentitySchema, driverAddressSchema } from '@/types/auth';
import { useDriverAuth } from '@/hooks/useDriverAuth';
import IdentityFields from '@/components/auth/form-sections/IdentityFields';
import AddressFields from '@/components/auth/form-sections/AddressFields';

const DriverAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [currentStep, setCurrentStep] = useState<'account' | 'identity' | 'address'>('account');
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

  const handleNextStep = async () => {
    if (currentStep === 'account') {
      const valid = await registerForm.trigger();
      if (valid) setCurrentStep('identity');
    } else if (currentStep === 'identity') {
      const valid = await identityForm.trigger();
      if (valid) setCurrentStep('address');
    }
  };

  const handlePrevStep = () => {
    if (currentStep === 'identity') {
      setCurrentStep('account');
    } else if (currentStep === 'address') {
      setCurrentStep('identity');
    }
  };

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

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'account' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <div className="h-1 w-12 bg-gray-200 mx-2"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'identity' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <div className="h-1 w-12 bg-gray-200 mx-2"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'address' ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            3
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {currentStep === 'account' ? 'Dados da conta' : 
           currentStep === 'identity' ? 'Documentos pessoais' : 'Endereço'}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header navigateBack={() => navigate('/')} />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login" onValueChange={(value) => {
            setIsRegistering(value === 'register');
            setCurrentStep('account');
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
                {isRegistering && renderStepIndicator()}
                
                {currentStep === 'account' && (
                  <RegisterForm 
                    form={registerForm} 
                    onSubmit={handleNextStep}
                    isSubmitting={isSubmitting}
                    buttonText="Próximo"
                  />
                )}
                
                {currentStep === 'identity' && (
                  <>
                    <CardContent className="space-y-4 pt-6">
                      <IdentityFields 
                        register={identityForm.register} 
                        errors={identityForm.formState.errors}
                        setValue={identityForm.setValue}
                        watch={identityForm.watch}
                      />
                    </CardContent>
                    <div className="flex justify-between p-6 pt-0">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleNextStep}
                      >
                        Próximo
                      </Button>
                    </div>
                  </>
                )}
                
                {currentStep === 'address' && (
                  <>
                    <CardContent className="space-y-4 pt-6">
                      <AddressFields 
                        register={addressForm.register} 
                        errors={addressForm.formState.errors}
                        setValue={addressForm.setValue}
                        watch={addressForm.watch}
                      />
                    </CardContent>
                    <div className="flex justify-between p-6 pt-0">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={handlePrevStep}
                      >
                        Voltar
                      </Button>
                      <Button 
                        type="button" 
                        onClick={handleCompleteRegistration}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Processando...' : 'Concluir cadastro'}
                      </Button>
                    </div>
                  </>
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
