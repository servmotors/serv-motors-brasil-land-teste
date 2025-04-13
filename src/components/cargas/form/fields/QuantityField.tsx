
import React from 'react';
import { Layers } from 'lucide-react';
import { MeasurementField } from './MeasurementField';

interface QuantityFieldProps {
  control: any;
  name: string;
  required?: boolean;
}

export const QuantityField: React.FC<QuantityFieldProps> = ({ 
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
