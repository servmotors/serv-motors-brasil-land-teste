
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import DocumentUploadField from './document-fields/DocumentUploadField';
import NumericInputField from './document-fields/NumericInputField';

const Step2VehicleImages = () => {
  const { control, setValue, watch } = useFormContext();
  const crlvExpirationDate = watch('crlvExpirationDate');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Fotos e Documentos</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DocumentUploadField
          control={control}
          setValue={setValue}
          type="front"
          label="Foto Frontal do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          setValue={setValue}
          type="diagonal"
          label="Foto Diagonal do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          setValue={setValue}
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
          setValue={setValue}
          type="plate"
          label="Foto da Placa do Veículo"
        />
        
        <DocumentUploadField
          control={control}
          setValue={setValue}
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
        
        <FormField
          control={control}
          name="crlvExpirationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Vencimento do CRLV</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date > new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                    }
                    initialFocus
                    locale={ptBR}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step2VehicleImages;
