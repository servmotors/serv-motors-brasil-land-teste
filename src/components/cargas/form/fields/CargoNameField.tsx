
import React from 'react';
import { Input } from "@/components/ui/input";
import { Package } from 'lucide-react';
import { FormControl } from "@/components/ui/form";

interface CargoNameFieldProps { 
  control: any;
  name: string;
  required?: boolean;
}

export const CargoNameField: React.FC<CargoNameFieldProps> = ({ 
  control,
  name,
  required = true 
}) => (
  <div className="flex">
    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
      <Package size={20} className="text-primary-foreground" />
    </div>
    <FormControl>
      <Input 
        placeholder="Nome da mercadoria" 
        className="rounded-l-none"
      />
    </FormControl>
  </div>
);
