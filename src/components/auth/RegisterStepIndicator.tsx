
import React from 'react';

type RegistrationStep = 'account' | 'identity' | 'address';

interface RegisterStepIndicatorProps {
  currentStep: RegistrationStep;
}

const RegisterStepIndicator = ({ currentStep }: RegisterStepIndicatorProps) => {
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

export default RegisterStepIndicator;
