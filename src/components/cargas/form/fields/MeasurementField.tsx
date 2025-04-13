
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface MeasurementFieldProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  step?: string;
  min?: string;
}

export const MeasurementField: React.FC<MeasurementFieldProps> = ({
  control, name, label, placeholder, icon, step = "1", min = "1"
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel>{label}</FormLabel>
        <div className="flex">
          <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
            {icon}
          </div>
          <FormControl>
            <Input 
              type="number"
              step={step}
              min={min}
              placeholder={placeholder}
              className="rounded-l-none"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber || parseFloat(min))}
            />
          </FormControl>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);
