
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface NumericInputFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  maxLength?: number;
  min?: number;
  max?: number;
}

const NumericInputField: React.FC<NumericInputFieldProps> = ({
  control,
  name,
  label,
  placeholder,
  maxLength = 4,
  min,
  max
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input 
              type="number"
              placeholder={placeholder}
              max={max}
              min={min}
              {...field}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= maxLength) {
                  field.onChange(parseInt(value) || '');
                }
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default NumericInputField;
