
import React from 'react';
import { Users, Truck, Dog } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { TowTruckIcon } from '@/components/Icons';

export interface TransportType {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
}

export const transportTypes: TransportType[] = [
  {
    id: 'passengers',
    name: 'Passageiros',
    icon: <Users className="h-6 w-6" />,
    tooltip: 'Transporte de passageiros para corridas urbanas'
  },
  {
    id: 'packages',
    name: 'Cargas / Pacotes',
    icon: <Truck className="h-6 w-6" />,
    tooltip: 'Entrega de pacotes e pequenas cargas'
  },
  {
    id: 'tow',
    name: 'Guincho',
    icon: <TowTruckIcon className="h-6 w-6" />,
    tooltip: 'Serviço de reboque para veículos'
  },
  {
    id: 'pet',
    name: 'Pet',
    icon: <Dog className="h-6 w-6" />,
    tooltip: 'Transporte especializado para animais de estimação'
  }
];

interface TransportTypeSelectorProps {
  control: any;
  name: string;
  error?: string;
}

const TransportTypeSelector = ({ control, name, error }: TransportTypeSelectorProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel>Tipo de Transporte</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className="grid grid-cols-2 gap-4 sm:grid-cols-4"
            >
              <TooltipProvider>
                {transportTypes.map(type => (
                  <Tooltip key={type.id}>
                    <TooltipTrigger asChild>
                      <label
                        htmlFor={`transport-type-${type.id}`}
                        className={cn(
                          "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground",
                          field.value === type.id && "border-primary"
                        )}
                      >
                        <input
                          type="radio"
                          id={`transport-type-${type.id}`}
                          name={name}
                          value={type.id}
                          className="sr-only"
                          checked={field.value === type.id}
                          onChange={() => field.onChange(type.id)}
                        />
                        <div className="mb-3 text-center">{type.icon}</div>
                        <div className="text-center text-sm font-medium">{type.name}</div>
                      </label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{type.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </TooltipProvider>
            </RadioGroup>
          </FormControl>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </FormItem>
      )}
    />
  );
};

export default TransportTypeSelector;
