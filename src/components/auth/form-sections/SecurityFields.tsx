
import React from 'react';
import { Key } from 'lucide-react';
import InputField from '../form-fields/InputField';

interface SecurityFieldsProps {
  register: any;
  errors: any;
}

const SecurityFields = ({ register, errors }: SecurityFieldsProps) => {
  return (
    <>
      <InputField
        id="password"
        label="Senha"
        placeholder="Senha (mínimo 6 caracteres)"
        type="password"
        icon={Key}
        register={register}
        error={errors.password?.message}
      />
      
      <InputField
        id="confirmPassword"
        label="Confirmar Senha"
        placeholder="Digite a senha novamente"
        type="password"
        icon={Key}
        register={register}
        error={errors.confirmPassword?.message}
      />
    </>
  );
};

export default SecurityFields;
