
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Package, Calendar, Layers, Ruler, Scale, Info } from 'lucide-react';

export const AddressField = ({ 
  label, 
  placeholder, 
  register, 
  required = true 
}: { 
  label: string; 
  placeholder: string; 
  register: any; 
  required?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    <div className="flex">
      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
        <MapPin size={20} className="text-primary-foreground" />
      </div>
      <Input 
        placeholder={placeholder} 
        className="rounded-l-none"
        {...register({ required })}
      />
    </div>
  </div>
);

export const CargoNameField = ({ 
  register, 
  required = true 
}: { 
  register: any;
  required?: boolean;
}) => (
  <div className="flex">
    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
      <Package size={20} className="text-primary-foreground" />
    </div>
    <Input 
      placeholder="Nome da mercadoria" 
      className="rounded-l-none"
      {...register({ required })}
    />
  </div>
);

export const PickupDateField = ({ 
  register,
  required = true
}: {
  register: any;
  required?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">Data e hora de coleta</label>
    <div className="flex">
      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
        <Calendar size={20} className="text-primary-foreground" />
      </div>
      <Input 
        type="datetime-local" 
        className="rounded-l-none"
        {...register({ required })}
      />
    </div>
  </div>
);

export const ContactFields = ({ 
  nameRegister, 
  phoneRegister 
}: { 
  nameRegister: any; 
  phoneRegister: any; 
}) => (
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-1">
      <label className="text-sm font-medium">Nome para contato</label>
      <Input 
        placeholder="Seu nome"
        {...nameRegister}
      />
    </div>
    
    <div className="space-y-1">
      <label className="text-sm font-medium">Telefone</label>
      <Input 
        placeholder="(00) 00000-0000"
        {...phoneRegister}
      />
    </div>
  </div>
);

export const QuantityField = ({ 
  register,
  required = true 
}: { 
  register: any;
  required?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">Quantidade de volumes</label>
    <div className="flex">
      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
        <Layers size={20} className="text-primary-foreground" />
      </div>
      <Input 
        type="number"
        min="1"
        placeholder="Quantidade"
        className="rounded-l-none"
        {...register({ 
          valueAsNumber: true,
          min: 1,
          required
        })}
      />
    </div>
  </div>
);

export const WeightField = ({ 
  register,
  required = true 
}: { 
  register: any;
  required?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">Peso total (kg)</label>
    <div className="flex">
      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
        <Scale size={20} className="text-primary-foreground" />
      </div>
      <Input 
        type="number"
        step="0.1"
        min="0.1"
        placeholder="Peso em kg"
        className="rounded-l-none"
        {...register({ 
          valueAsNumber: true,
          min: 0.1,
          required
        })}
      />
    </div>
  </div>
);

export const DimensionFields = ({ 
  heightRegister,
  widthRegister,
  lengthRegister,
  required = true 
}: { 
  heightRegister: any;
  widthRegister: any;
  lengthRegister: any;
  required?: boolean;
}) => (
  <div className="grid grid-cols-3 gap-3">
    <div className="space-y-1">
      <label className="text-sm font-medium">Altura (cm)</label>
      <div className="flex">
        <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
          <Ruler size={20} className="text-primary-foreground" />
        </div>
        <Input 
          type="number"
          min="1"
          placeholder="Altura"
          className="rounded-l-none"
          {...heightRegister({ 
            valueAsNumber: true,
            min: 1,
            required
          })}
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium">Largura (cm)</label>
      <div className="flex">
        <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
          <Ruler size={20} className="text-primary-foreground rotate-90" />
        </div>
        <Input 
          type="number"
          min="1"
          placeholder="Largura"
          className="rounded-l-none"
          {...widthRegister({ 
            valueAsNumber: true,
            min: 1,
            required
          })}
        />
      </div>
    </div>

    <div className="space-y-1">
      <label className="text-sm font-medium">Comprimento (cm)</label>
      <div className="flex">
        <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
          <Ruler size={20} className="text-primary-foreground -rotate-45" />
        </div>
        <Input 
          type="number"
          min="1"
          placeholder="Comprimento"
          className="rounded-l-none"
          {...lengthRegister({ 
            valueAsNumber: true,
            min: 1,
            required
          })}
        />
      </div>
    </div>
  </div>
);

export const InfoBox = ({ 
  children,
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-secondary/40 p-3 rounded-md flex items-start mt-4 ${className || ''}`}>
    <Info size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
    <p className="text-sm">{children}</p>
  </div>
);
