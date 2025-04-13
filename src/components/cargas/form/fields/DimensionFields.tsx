
import React from 'react';
import { Ruler } from 'lucide-react';
import { MeasurementField } from './MeasurementField';

interface DimensionFieldsProps {
  control: any;
  required?: boolean;
}

export const DimensionFields: React.FC<DimensionFieldsProps> = ({ 
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
