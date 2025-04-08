
import React from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioFieldGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
}

const RadioFieldGroup = ({
  label,
  value,
  onChange,
  options,
  error
}: RadioFieldGroupProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <RadioGroup 
        value={value} 
        onValueChange={onChange}
        className="flex gap-4"
      >
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={`option-${option.value}`} />
            <Label htmlFor={`option-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default RadioFieldGroup;
