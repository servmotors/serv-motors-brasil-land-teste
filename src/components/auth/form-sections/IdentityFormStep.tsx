
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import IdentityFields from './IdentityFields';

interface IdentityFormStepProps {
  form: UseFormReturn<any>;
  handlePrevStep: () => void;
  handleNextStep: () => void;
}

const IdentityFormStep = ({ form, handlePrevStep, handleNextStep }: IdentityFormStepProps) => {
  return (
    <>
      <CardContent className="space-y-4 pt-6">
        <IdentityFields 
          register={form.register} 
          errors={form.formState.errors}
          setValue={form.setValue}
          watch={form.watch}
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
  );
};

export default IdentityFormStep;
