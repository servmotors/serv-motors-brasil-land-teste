
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Package, Calendar, Layers, Ruler, Scale, Info, AlertCircle } from 'lucide-react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

export const AddressField = ({ 
  label, 
  placeholder, 
  control,
  name,
  required = true 
}: { 
  label: string; 
  placeholder: string; 
  control: any;
  name: string;
  required?: boolean;
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

export const CargoNameField = ({ 
  control,
  name,
  required = true 
}: { 
  control: any;
  name: string;
  required?: boolean;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <div className="flex">
        <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
          <Package size={20} className="text-primary-foreground" />
        </div>
        <FormControl>
          <Input 
            placeholder="Nome da mercadoria" 
            className="rounded-l-none"
            {...field}
          />
        </FormControl>
      </div>
    )}
  />
);

export const PickupDateField = ({ 
  control,
  name,
  required = true
}: {
  control: any;
  name: string;
  required?: boolean;
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

export const ContactFields = ({ 
  control
}: { 
  control: any;
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

export const QuantityField = ({ 
  control,
  name,
  required = true 
}: { 
  control: any;
  name: string;
  required?: boolean;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel>Quantidade de volumes</FormLabel>
        <div className="flex">
          <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
            <Layers size={20} className="text-primary-foreground" />
          </div>
          <FormControl>
            <Input 
              type="number"
              min="1"
              placeholder="Quantidade"
              className="rounded-l-none"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber || 1)}
            />
          </FormControl>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const WeightField = ({ 
  control,
  name,
  required = true 
}: { 
  control: any;
  name: string;
  required?: boolean;
}) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem className="space-y-1">
        <FormLabel>Peso total (kg)</FormLabel>
        <div className="flex">
          <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
            <Scale size={20} className="text-primary-foreground" />
          </div>
          <FormControl>
            <Input 
              type="number"
              step="0.1"
              min="0.1"
              placeholder="Peso em kg"
              className="rounded-l-none"
              {...field}
              onChange={e => field.onChange(e.target.valueAsNumber || 0.1)}
            />
          </FormControl>
        </div>
        <FormMessage />
      </FormItem>
    )}
  />
);

export const DimensionFields = ({ 
  control,
  required = true 
}: { 
  control: any;
  required?: boolean;
}) => (
  <div className="grid grid-cols-3 gap-3">
    <FormField
      control={control}
      name="height"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Altura (cm)</FormLabel>
          <div className="flex">
            <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
              <Ruler size={20} className="text-primary-foreground" />
            </div>
            <FormControl>
              <Input 
                type="number"
                min="1"
                placeholder="Altura"
                className="rounded-l-none"
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber || 1)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="width"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Largura (cm)</FormLabel>
          <div className="flex">
            <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
              <Ruler size={20} className="text-primary-foreground rotate-90" />
            </div>
            <FormControl>
              <Input 
                type="number"
                min="1"
                placeholder="Largura"
                className="rounded-l-none"
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber || 1)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />

    <FormField
      control={control}
      name="length"
      render={({ field }) => (
        <FormItem className="space-y-1">
          <FormLabel>Comprimento (cm)</FormLabel>
          <div className="flex">
            <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
              <Ruler size={20} className="text-primary-foreground -rotate-45" />
            </div>
            <FormControl>
              <Input 
                type="number"
                min="1"
                placeholder="Comprimento"
                className="rounded-l-none"
                {...field}
                onChange={e => field.onChange(e.target.valueAsNumber || 1)}
              />
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
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

export const ErrorAlert = ({ 
  message 
}: { 
  message: string;
}) => (
  <div className="bg-destructive/10 p-3 rounded-md flex items-start mt-4">
    <AlertCircle size={20} className="text-destructive mr-2 mt-0.5 flex-shrink-0" />
    <p className="text-sm text-destructive">{message}</p>
  </div>
);
