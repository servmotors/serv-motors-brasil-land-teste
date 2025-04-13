
import React from 'react';
import { Scale } from 'lucide-react';
import { MeasurementField } from './MeasurementField';

interface WeightFieldProps {
  control: any;
  name: string;
  required?: boolean;
}

export const WeightField: React.FC<WeightFieldProps> = ({ 
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
