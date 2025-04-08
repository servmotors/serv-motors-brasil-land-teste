
import React from 'react';
import { format } from 'date-fns';
import { CalendarIcon, FileText, CreditCard, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import InputField from '../form-fields/InputField';
import FileUploadField from '../form-fields/FileUploadField';

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

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="birthDate">Data de Nascimento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="birthDate"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !birthDate && "text-muted-foreground"
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
        {errors.birthDate && (
          <p className="text-sm text-red-500">{errors.birthDate.message}</p>
        )}
      </div>
      
      <InputField
        id="cpf"
        label="CPF"
        placeholder="000.000.000-00"
        icon={CreditCard}
        register={register}
        error={errors.cpf?.message}
      />

      <FileUploadField
        id="cpfDocument"
        label="Anexar CPF (imagem ou PDF)"
        setValue={setValue}
        error={errors.cpfDocument?.message}
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
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="cnhExpiry"
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !cnhExpiry && "text-muted-foreground"
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
              disabled={(date) => date < new Date()}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
        {errors.cnhExpiry && (
          <p className="text-sm text-red-500">{errors.cnhExpiry.message}</p>
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
