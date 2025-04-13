
import React from 'react';
import { Input } from "@/components/ui/input";
import { Calendar } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface PickupDateFieldProps {
  control: any;
  name: string;
  required?: boolean;
}

export const PickupDateField: React.FC<PickupDateFieldProps> = ({ 
  control,
  name,
  required = true
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem className="space-y-1">
        <FormLabel>Data e hora de coleta</FormLabel>
        <div className="flex">
          <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
            <Calendar size={20} className="text-primary-foreground" />
          </div>
          <FormControl>
            <Input 
              type="datetime-local" 
              className="rounded-l-none"
              {...field}
            />
          </FormControl>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);
