
import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import InputField from '../form-fields/InputField';

interface PersonalInfoFieldsProps {
  register: any;
  errors: any;
}

const PersonalInfoFields = ({ register, errors }: PersonalInfoFieldsProps) => {
  return (
    <>
      <InputField
        id="fullName"
        label="Nome completo"
        placeholder="Seu nome completo"
        icon={User}
        register={register}
        error={errors.fullName?.message}
      />
      
      <InputField
        id="email"
        label="E-mail"
        placeholder="seu@email.com"
        icon={Mail}
        register={register}
        error={errors.email?.message}
      />
      
      <InputField
        id="repeatEmail"
        label="Confirmar E-mail"
        placeholder="seu@email.com"
        icon={Mail}
        register={register}
        error={errors.repeatEmail?.message}
      />

      <InputField
        id="phone"
        label="Telefone"
        placeholder="(99) 99999-9999"
        icon={Phone}
        register={register}
        error={errors.phone?.message}
      />
    </>
  );
};

export default PersonalInfoFields;
