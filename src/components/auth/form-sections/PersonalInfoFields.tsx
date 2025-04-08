
import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import InputField from '../form-fields/InputField';
import ImageUploadField from '../form-fields/ImageUploadField';

interface PersonalInfoFieldsProps {
  register: any;
  errors: any;
  setValue: any;
}

const PersonalInfoFields = ({ register, errors, setValue }: PersonalInfoFieldsProps) => {
  return (
    <>
      <ImageUploadField
        id="profileImage"
        label="Foto do Motorista"
        setValue={setValue}
        error={errors.profileImage?.message}
      />
      
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
