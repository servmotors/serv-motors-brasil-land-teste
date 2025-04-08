
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type RegistrationStep = 'account' | 'identity' | 'address';

export const useRegistrationSteps = (
  registerForm: UseFormReturn<any>,
  identityForm: UseFormReturn<any>,
  addressForm?: UseFormReturn<any>
) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('account');

  const handleNextStep = async () => {
    if (currentStep === 'account') {
      const valid = await registerForm.trigger();
      if (valid) setCurrentStep('identity');
    } else if (currentStep === 'identity') {
      const valid = await identityForm.trigger();
      
      // Only proceed if all validations pass, including age check and CNH validation
      // The zod schema will handle these validations
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

  const resetForms = () => {
    registerForm.reset();
    identityForm.reset();
    if (addressForm) addressForm.reset();
    setCurrentStep('account');
  };

  return {
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep,
    resetForms
  };
};
