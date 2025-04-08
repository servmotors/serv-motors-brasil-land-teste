
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';

type RegistrationStep = 'account' | 'identity' | 'address';

export const useRegistrationSteps = (
  registerForm: UseFormReturn<any>,
  identityForm: UseFormReturn<any>
) => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('account');

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

  return {
    currentStep,
    setCurrentStep,
    handleNextStep,
    handlePrevStep
  };
};
