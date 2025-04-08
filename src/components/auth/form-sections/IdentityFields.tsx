
import React from 'react';
import { FileText } from 'lucide-react';
import InputField from '../form-fields/InputField';
import FileUploadField from '../form-fields/FileUploadField';
import DatePickerField from '../form-fields/DatePickerField';
import RadioFieldGroup from '../form-fields/RadioFieldGroup';
import AlertMessage from '../form-fields/AlertMessage';
import CPFField from '../form-fields/CPFField';

interface IdentityFieldsProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
}

const IdentityFields = ({ register, errors, setValue, watch }: IdentityFieldsProps) => {
  const birthDate = watch('birthDate');
  const cnhExpiry = watch('cnhExpiry');
  const hasRemuneratedActivity = watch('hasRemuneratedActivity');

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const isUnderage = birthDate ? calculateAge(birthDate) < 18 : false;

  const isCnhExpired = (): boolean => {
    if (!cnhExpiry) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return cnhExpiry < today;
  };

  const cnhExpired = isCnhExpired();

  return (
    <>
      {isUnderage && (
        <AlertMessage 
          message="Você deve ter pelo menos 18 anos para se cadastrar como motorista" 
          variant="destructive" 
        />
      )}

      {cnhExpired && (
        <AlertMessage 
          message="CNH vencida. Não é possível prosseguir com o cadastro." 
          variant="destructive" 
        />
      )}

      <DatePickerField
        id="birthDate"
        label="Data de Nascimento"
        selectedDate={birthDate}
        onDateChange={(date) => setValue('birthDate', date)}
        error={errors.birthDate?.message}
        isError={isUnderage}
        infoText={birthDate && !isUnderage ? `Idade: ${calculateAge(birthDate)} anos` : undefined}
        disabledDates={(date) => date > new Date() || date < new Date('1930-01-01')}
      />

      <CPFField
        id="cpf"
        label="CPF"
        register={register}
        error={errors.cpf?.message}
        setValue={setValue}
        watch={watch}
      />

      <FileUploadField
        id="rgFrontDocument"
        label="Anexar CPF ou RG - Frente (imagem ou PDF)"
        setValue={setValue}
        error={errors.rgFrontDocument?.message}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <FileUploadField
        id="rgBackDocument"
        label="Anexar CPF ou RG - Verso (imagem ou PDF)"
        setValue={setValue}
        error={errors.rgBackDocument?.message}
        accept=".pdf,.jpg,.jpeg,.png"
      />
      
      <InputField
        id="cnh"
        label="CNH (Carteira Nacional de Habilitação)"
        placeholder="00000000000"
        icon={FileText}
        register={register}
        error={errors.cnh?.message}
      />

      <FileUploadField
        id="cnhDocument"
        label="Anexar CNH (imagem ou PDF)"
        setValue={setValue}
        error={errors.cnhDocument?.message}
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <DatePickerField
        id="cnhExpiry"
        label="Data de Vencimento da CNH"
        selectedDate={cnhExpiry}
        onDateChange={(date) => setValue('cnhExpiry', date)}
        error={errors.cnhExpiry?.message}
        isError={cnhExpired}
        disabledDates={(date) => date < new Date('2000-01-01')}
      />

      <RadioFieldGroup
        label="Exerce atividade remunerada?"
        value={hasRemuneratedActivity?.toString()}
        onChange={(value) => setValue('hasRemuneratedActivity', value === 'true')}
        options={[
          { value: 'true', label: 'Sim' },
          { value: 'false', label: 'Não' }
        ]}
        error={errors.hasRemuneratedActivity?.message}
      />
    </>
  );
};

export default IdentityFields;
