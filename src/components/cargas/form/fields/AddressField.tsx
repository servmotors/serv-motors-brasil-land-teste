
import React from 'react';
import { Input } from "@/components/ui/input";
import { MapPin } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface AddressFieldProps { 
  label: string; 
  placeholder: string; 
  control: any;
  name: string;
  required?: boolean;
}

export const AddressField: React.FC<AddressFieldProps> = ({ 
  label, 
  placeholder, 
  control,
  name,
  required = true 
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <FormItem className="space-y-1">
        <FormLabel>{label}</FormLabel>
        <div className="flex">
          <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
            <MapPin size={20} className="text-primary-foreground" />
          </div>
          <FormControl>
            <Input 
              placeholder={placeholder} 
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
