
import React from 'react';
import { FormLabel } from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { TransportType } from './types';

interface SubtypeSelectorProps {
  transportType: TransportType;
  selectedSubtype: string | null;
  onSubtypeSelect: (typeId: string, subtypeId: string) => void;
  name: string;
}

const SubtypeSelector = ({ transportType, selectedSubtype, onSubtypeSelect, name }: SubtypeSelectorProps) => {
  if (!transportType.subtypes || transportType.subtypes.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <FormLabel className="mb-2 block">Escolha uma opção de {transportType.name}</FormLabel>
      <RadioGroup
        value={selectedSubtype || ''}
        onValueChange={(value) => onSubtypeSelect(transportType.id, value)}
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {transportType.subtypes.map(subtype => (
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
              onChange={() => onSubtypeSelect(transportType.id, subtype.id)}
            />
            <div className="mb-3 text-center">{subtype.icon}</div>
            <div className="text-center text-sm font-medium">{subtype.name}</div>
          </label>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SubtypeSelector;
