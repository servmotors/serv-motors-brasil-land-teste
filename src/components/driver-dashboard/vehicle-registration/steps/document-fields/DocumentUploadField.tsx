
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import FileUploadField from '@/components/auth/form-fields/FileUploadField';
import { Input } from '@/components/ui/input';

interface DocumentUploadFieldProps {
  control: any;
  setValue: any;
  type: 'crlv' | 'plate' | 'front' | 'diagonal' | 'back';
  label: string;
  accept?: string;
}

const fieldConfig = {
  crlv: {
    name: 'crlvDocument',
    label: 'CRLV do Veículo',
    accept: '.pdf,image/*'
  },
  plate: {
    name: 'plateImage',
    label: 'Foto da Placa do Veículo',
    accept: 'image/*'
  },
  front: {
    name: 'frontImage',
    label: 'Foto Frontal do Veículo',
    accept: 'image/*'
  },
  diagonal: {
    name: 'diagonalImage',
    label: 'Foto Diagonal do Veículo',
    accept: 'image/*'
  },
  back: {
    name: 'backImage',
    label: 'Foto Traseira do Veículo',
    accept: 'image/*'
  }
};

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  control,
  setValue,
  type,
  label,
  accept
}) => {
  const config = fieldConfig[type];
  
  return (
    <FormField
      control={control}
      name={config.name}
      render={({ field: { onChange, value, ...rest }, fieldState: { error } }) => (
        <FileUploadField
          id={config.name}
          label={label || config.label}
          setValue={setValue}
          error={error?.message}
          accept={accept || config.accept}
        />
      )}
    />
  );
};

export default DocumentUploadField;
