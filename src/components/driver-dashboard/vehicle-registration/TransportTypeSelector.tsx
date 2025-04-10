
import React, { useState, useEffect } from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { TooltipProvider } from '@/components/ui/tooltip';
import { transportTypes } from './transportTypes';
import TransportTypeItem from './TransportTypeItem';
import SubtypeSelector from './SubtypeSelector';

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
        useEffect(() => {
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
                      <TransportTypeItem
                        key={type.id}
                        type={type}
                        isSelected={selectedType === type.id}
                        onSelect={handleTypeSelection}
                        name={name}
                      />
                    ))}
                  </TooltipProvider>
                </RadioGroup>
                
                {/* Subtype selection if available for the selected type */}
                {selectedTransportType && (
                  <SubtypeSelector
                    transportType={selectedTransportType}
                    selectedSubtype={selectedSubtype}
                    onSubtypeSelect={handleSubtypeSelection}
                    name={name}
                  />
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
