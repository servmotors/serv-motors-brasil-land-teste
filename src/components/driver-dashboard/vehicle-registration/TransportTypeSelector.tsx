
import React, { useState } from 'react';
import { Users, Truck, Dog, Info, Car, Motorcycle } from 'lucide-react';
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
  hintText?: string;
  subtypes?: TransportSubtype[];
}

export interface TransportSubtype {
  id: string;
  name: string;
  icon: React.ReactNode;
}

export const transportTypes: TransportType[] = [
  {
    id: 'passengers',
    name: 'Passageiros',
    icon: <Users className="h-6 w-6" />,
    tooltip: 'Transporte de passageiros para corridas urbanas',
    hintText: 'Essa opção é para quem deseja transportar passageiros de carro ou moto.',
    subtypes: [
      {
        id: 'car',
        name: 'Carro',
        icon: <Car className="h-5 w-5" />
      },
      {
        id: 'motorcycle',
        name: 'Moto táxi',
        icon: <Motorcycle className="h-5 w-5" />
      }
    ]
  },
  {
    id: 'packages',
    name: 'Cargas / Pacotes',
    icon: <Truck className="h-6 w-6" />,
    tooltip: 'Entrega de pacotes e pequenas cargas',
    hintText: 'Escolha essa opção para transportar somente pacotes ou cargas de pequeno porte com veículo hatch ou sedan, utilitário, van ou caminhão pequeno.'
  },
  {
    id: 'tow',
    name: 'Guincho',
    icon: <TowTruckIcon className="h-6 w-6" />,
    tooltip: 'Serviço de reboque para veículos',
    hintText: 'Escolher essa opção especificamente se você tem um caminhão guincho preparado para essa modalidade de acordo com a legislação vigente.'
  },
  {
    id: 'pet',
    name: 'Pet',
    icon: <Dog className="h-6 w-6" />,
    tooltip: 'Transporte especializado para animais de estimação',
    hintText: 'Essa opção é indicada para quem tem veículo preparado para transporte de animais como lojas Pets, clínicas Pets ou no mínimo a caixinha para transportar pequenos animais.'
  }
];

interface TransportTypeSelectorProps {
  control: any;
  name: string;
  error?: string;
}

const TransportTypeSelector = ({ control, name, error }: TransportTypeSelectorProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSubtype, setSelectedSubtype] = useState<string | null>(null);
  
  // Find the selected transport type object
  const selectedTransportType = transportTypes.find(type => type.id === selectedType);
  
  // Handle main transport type selection
  const handleTypeSelection = (value: string) => {
    setSelectedType(value);
    
    // Reset subtype if changing main type
    setSelectedSubtype(null);
    
    // If the selected type has no subtypes, set the form value to the main type
    const type = transportTypes.find(t => t.id === value);
    if (!type?.subtypes || type.subtypes.length === 0) {
      control.setValue(name, value);
    }
  };
  
  // Handle subtype selection
  const handleSubtypeSelection = (typeId: string, subtypeId: string) => {
    setSelectedSubtype(subtypeId);
    // Set the form value as a combination of type and subtype
    control.setValue(name, `${typeId}:${subtypeId}`);
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // Initialize selected type and subtype from form value if present
        React.useEffect(() => {
          if (field.value) {
            // Check if value has format 'type:subtype'
            if (field.value.includes(':')) {
              const [typeId, subtypeId] = field.value.split(':');
              setSelectedType(typeId);
              setSelectedSubtype(subtypeId);
            } else {
              setSelectedType(field.value);
              setSelectedSubtype(null);
            }
          }
        }, [field.value]);

        return (
          <FormItem className="space-y-6">
            <FormLabel>Tipo de Transporte</FormLabel>
            <FormControl>
              <div className="space-y-6">
                {/* Main transport type selection */}
                <RadioGroup
                  value={selectedType || ''}
                  onValueChange={handleTypeSelection}
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
                              selectedType === type.id && "border-primary"
                            )}
                          >
                            <input
                              type="radio"
                              id={`transport-type-${type.id}`}
                              name={`${name}-type`}
                              value={type.id}
                              className="sr-only"
                              checked={selectedType === type.id}
                              onChange={() => handleTypeSelection(type.id)}
                            />
                            <div className="mb-3 text-center">{type.icon}</div>
                            <div className="text-center text-sm font-medium">
                              {type.name}
                              {type.hintText && (
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Info className="h-4 w-4 ml-1 inline-block text-muted-foreground cursor-help" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="max-w-xs">{type.hintText}</p>
                                  </TooltipContent>
                                </Tooltip>
                              )}
                            </div>
                          </label>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{type.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </RadioGroup>
                
                {/* Subtype selection if available for the selected type */}
                {selectedTransportType?.subtypes && selectedTransportType.subtypes.length > 0 && (
                  <div className="mt-4">
                    <FormLabel className="mb-2 block">Escolha uma opção de {selectedTransportType.name}</FormLabel>
                    <RadioGroup
                      value={selectedSubtype || ''}
                      onValueChange={(value) => handleSubtypeSelection(selectedTransportType.id, value)}
                      className="grid grid-cols-2 gap-4 sm:grid-cols-4"
                    >
                      {selectedTransportType.subtypes.map(subtype => (
                        <label
                          key={subtype.id}
                          htmlFor={`subtype-${subtype.id}`}
                          className={cn(
                            "flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground",
                            selectedSubtype === subtype.id && "border-primary"
                          )}
                        >
                          <input
                            type="radio"
                            id={`subtype-${subtype.id}`}
                            name={`${name}-subtype`}
                            value={subtype.id}
                            className="sr-only"
                            checked={selectedSubtype === subtype.id}
                            onChange={() => handleSubtypeSelection(selectedTransportType.id, subtype.id)}
                          />
                          <div className="mb-3 text-center">{subtype.icon}</div>
                          <div className="text-center text-sm font-medium">{subtype.name}</div>
                        </label>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
            </FormControl>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </FormItem>
        );
      }}
    />
  );
};

export default TransportTypeSelector;
