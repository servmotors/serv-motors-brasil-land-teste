
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CardContent } from '@/components/ui/card';
import AddressFields from './AddressFields';

interface AddressFormStepProps {
  form: UseFormReturn<any>;
  handlePrevStep: () => void;
  handleCompleteRegistration: () => Promise<void>;
  isSubmitting: boolean;
}

const AddressFormStep = ({ 
  form, 
  handlePrevStep, 
  handleCompleteRegistration,
  isSubmitting
}: AddressFormStepProps) => {
  return (
    <>
      <CardContent className="space-y-4 pt-6">
        <AddressFields 
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
          onClick={handleCompleteRegistration}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processando...' : 'Concluir cadastro'}
        </Button>
      </div>
    </>
  );
};

export default AddressFormStep;
