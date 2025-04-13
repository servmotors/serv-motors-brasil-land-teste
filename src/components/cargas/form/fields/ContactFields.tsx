
import React from 'react';
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface ContactFieldsProps { 
  control: any;
}

export const ContactFields: React.FC<ContactFieldsProps> = ({ 
  control
}) => (
  <div className="grid grid-cols-2 gap-4">
    <FormField
      control={control}
      name="contactName"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Nome para contato</FormLabel>
          <FormControl>
            <Input 
              placeholder="Seu nome"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    
    <FormField
      control={control}
      name="contactPhone"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Telefone</FormLabel>
          <FormControl>
            <Input 
              placeholder="(00) 00000-0000"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </div>
);
