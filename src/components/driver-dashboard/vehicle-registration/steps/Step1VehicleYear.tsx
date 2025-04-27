
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface Step1Props {
  vehicleAge: number;
  isVehicleTooOld: boolean;
}

const Step1VehicleYear = ({ vehicleAge, isVehicleTooOld }: Step1Props) => {
  const { control, watch } = useFormContext();
  const vehicleYear = watch('vehicleYear');

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Ano do Veículo</h3>
      
      <FormField
        control={control}
        name="vehicleYear"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Ano de fabricação</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Ex: 2020"
                max={new Date().getFullYear() + 1}
                min={1990}
                {...field}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 4) {
                    field.onChange(parseInt(value) || '');
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      {vehicleYear && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            Idade do veículo: <span className={vehicleAge > 13 ? "font-bold text-amber-500" : ""}>{vehicleAge} anos</span>
          </p>
        </div>
      )}
      
      {isVehicleTooOld && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Veículo não permitido</AlertTitle>
          <AlertDescription>
            Seu veículo tem {vehicleAge} anos e não pode ser cadastrado em nossa plataforma. O limite máximo é de 15 anos.
          </AlertDescription>
        </Alert>
      )}
      
      {vehicleAge > 13 && vehicleAge <= 15 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Atenção</AlertTitle>
          <AlertDescription>
            Seu veículo tem {vehicleAge} anos e está próximo do limite permitido de 15 anos. 
            Ao atingir esse limite, o veículo será automaticamente bloqueado na plataforma.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default Step1VehicleYear;

