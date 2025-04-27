
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import DocumentUploadField from './document-fields/DocumentUploadField';
import NumericInputField from './document-fields/NumericInputField';
import CRLVExpirationField from './document-fields/CRLVExpirationField';

const Step2VehicleImages = () => {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Fotos e Documentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUploadField
          control={control}
          type="front"
          label="Foto Frontal do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          type="diagonal"
          label="Foto Diagonal do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          type="back"
          label="Foto Traseira do Veículo"
        />
        
        <FormField
          control={control}
          name="renavam"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Renavam</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Digite o Renavam (11 dígitos)" 
                  maxLength={11}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <DocumentUploadField
          control={control}
          type="plate"
          label="Foto da Placa do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          type="crlv"
          label="CRLV do Veículo"
        />
        
        <NumericInputField
          control={control}
          name="crlvYear"
          label="Ano do Exercício do CRLV"
          placeholder="Ex: 2023"
          min={2020}
          max={new Date().getFullYear() + 1}
        />
        
        <CRLVExpirationField
          control={control}
          name="crlvExpirationDate"
        />
      </div>
    </div>
  );
};

export default Step2VehicleImages;
