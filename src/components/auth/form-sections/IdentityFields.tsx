import React from 'react';
import { format, parse } from 'date-fns';
import { CalendarIcon, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import InputField from '../form-fields/InputField';
import FileUploadField from '../form-fields/FileUploadField';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

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

  const handleDateChange = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cleanedValue = inputValue.replace(/\D/g, '');
    
    let formattedValue = cleanedValue;
    if (cleanedValue.length > 2) {
      formattedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2, 4)}`;
      if (cleanedValue.length > 4) {
        formattedValue += `/${cleanedValue.slice(4, 8)}`;
      }
    }
    e.target.value = formattedValue;

    if (formattedValue.length === 10) {
      const parsedDate = parse(formattedValue, 'dd/MM/yyyy', new Date());
      if (!isNaN(parsedDate.getTime())) {
        setValue(fieldName, parsedDate);
      }
    }
  };

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
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            Você deve ter pelo menos 18 anos para se cadastrar como motorista
          </AlertDescription>
        </Alert>
      )}

      {cnhExpired && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4 mr-2" />
          <AlertDescription>
            CNH vencida. Não é possível prosseguir com o cadastro.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="birthDate">Data de Nascimento</Label>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="birthDate"
                variant="outline"
                className={cn(
                  "w-1/2 justify-start text-left font-normal",
                  !birthDate && "text-muted-foreground",
                  isUnderage && "border-red-500 text-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {birthDate ? format(birthDate, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={birthDate}
                onSelect={(date) => setValue('birthDate', date)}
                disabled={(date) => date > new Date() || date < new Date('1930-01-01')}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(
              "w-1/2",
              isUnderage && "border-red-500 text-red-500"
            )}
            onChange={handleDateChange('birthDate')}
            defaultValue={birthDate ? format(birthDate, 'dd/MM/yyyy') : ''}
          />
        </div>
        {errors.birthDate && (
          <p className="text-sm text-red-500">{errors.birthDate.message}</p>
        )}
        {birthDate && !isUnderage && (
          <p className="text-sm text-green-500">Idade: {calculateAge(birthDate)} anos</p>
        )}
      </div>

      <InputField
        id="rg"
        label="CPF / RG"
        placeholder="0000000"
        icon={CreditCard}
        register={register}
        error={errors.rg?.message}
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

      <div className="space-y-2">
        <Label htmlFor="cnhExpiry">Data de Vencimento da CNH</Label>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="cnhExpiry"
                variant="outline"
                className={cn(
                  "w-1/2 justify-start text-left font-normal",
                  !cnhExpiry && "text-muted-foreground",
                  cnhExpired && "border-red-500 text-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {cnhExpiry ? format(cnhExpiry, 'dd/MM/yyyy') : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent
                mode="single"
                selected={cnhExpiry}
                onSelect={(date) => setValue('cnhExpiry', date)}
                disabled={(date) => date < new Date('2000-01-01')}
                initialFocus
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          <Input
            type="text"
            placeholder="DD/MM/AAAA"
            maxLength={10}
            className={cn(
              "w-1/2",
              cnhExpired && "border-red-500 text-red-500"
            )}
            onChange={handleDateChange('cnhExpiry')}
            defaultValue={cnhExpiry ? format(cnhExpiry, 'dd/MM/yyyy') : ''}
          />
        </div>
        {errors.cnhExpiry && (
          <p className="text-sm text-red-500">{errors.cnhExpiry.message}</p>
        )}
        {cnhExpiry && cnhExpired && (
          <p className="text-sm text-red-500">CNH vencida. Não é possível prosseguir com o cadastro.</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Exerce atividade remunerada?</Label>
        <RadioGroup 
          value={hasRemuneratedActivity?.toString()} 
          onValueChange={(value) => setValue('hasRemuneratedActivity', value === 'true')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="activity-yes" />
            <Label htmlFor="activity-yes">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="activity-no" />
            <Label htmlFor="activity-no">Não</Label>
          </div>
        </RadioGroup>
        {errors.hasRemuneratedActivity && (
          <p className="text-sm text-red-500">{errors.hasRemuneratedActivity.message}</p>
        )}
      </div>
    </>
  );
};

export default IdentityFields;
