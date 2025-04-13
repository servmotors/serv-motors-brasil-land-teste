
import React from 'react';
import { Input } from "@/components/ui/input";
import { Layers, Scale, Ruler } from 'lucide-react';
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

const MeasurementField: React.FC<MeasurementFieldProps> = ({
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

export const QuantityField: React.FC<{ control: any; name: string; required?: boolean }> = ({ 
  control, name, required = true 
}) => (
  <MeasurementField
    control={control}
    name={name}
    label="Quantidade de volumes"
    placeholder="Quantidade"
    icon={<Layers size={20} className="text-primary-foreground" />}
    min="1"
  />
);

export const WeightField: React.FC<{ control: any; name: string; required?: boolean }> = ({ 
  control, name, required = true 
}) => (
  <MeasurementField
    control={control}
    name={name}
    label="Peso total (kg)"
    placeholder="Peso em kg"
    icon={<Scale size={20} className="text-primary-foreground" />}
    step="0.1"
    min="0.1"
  />
);

export const DimensionFields: React.FC<{ control: any; required?: boolean }> = ({ 
  control, required = true 
}) => (
  <div className="grid grid-cols-3 gap-3">
    <MeasurementField
      control={control}
      name="height"
      label="Altura (cm)"
      placeholder="Altura"
      icon={<Ruler size={20} className="text-primary-foreground" />}
    />

    <MeasurementField
      control={control}
      name="width"
      label="Largura (cm)"
      placeholder="Largura"
      icon={<Ruler size={20} className="text-primary-foreground rotate-90" />}
    />

    <MeasurementField
      control={control}
      name="length"
      label="Comprimento (cm)"
      placeholder="Comprimento"
      icon={<Ruler size={20} className="text-primary-foreground -rotate-45" />}
    />
  </div>
);
