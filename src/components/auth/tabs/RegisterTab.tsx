
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import RegisterForm from '@/components/auth/RegisterForm';
import RegisterStepIndicator from '@/components/auth/RegisterStepIndicator';
import IdentityFormStep from '@/components/auth/form-sections/IdentityFormStep';
import AddressFormStep from '@/components/auth/form-sections/AddressFormStep';

type RegistrationStep = 'account' | 'identity' | 'address';

interface RegisterTabProps {
  isRegistering: boolean;
  currentStep: RegistrationStep;
  registerForm: UseFormReturn<any>;
  identityForm: UseFormReturn<any>;
  addressForm: UseFormReturn<any>;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleCompleteRegistration: () => Promise<void>;
  isSubmitting: boolean;
}

const RegisterTab = ({ 
  isRegistering,
  currentStep,
  registerForm,
  identityForm,
  addressForm,
  handleNextStep,
  handlePrevStep,
  handleCompleteRegistration,
  isSubmitting
}: RegisterTabProps) => {
  // Wrap the handleNextStep function to return a Promise
  const handleFormSubmit = async (data: any) => {
    handleNextStep();
    return Promise.resolve();
  };

  return (
    <Card>
      {isRegistering && <RegisterStepIndicator currentStep={currentStep} />}
      
      {currentStep === 'account' && (
        <RegisterForm 
          form={registerForm} 
          onSubmit={handleFormSubmit}
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
  );
};

export default RegisterTab;
