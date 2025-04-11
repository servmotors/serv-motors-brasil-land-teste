
import React from 'react';
import { Button } from '@/components/ui/button';
import { Car, Motorcycle } from 'lucide-react';

interface VehicleTypeSelectorProps {
  selectedType: 'car' | 'motorcycle';
  onChange: (type: 'car' | 'motorcycle') => void;
}

const VehicleTypeSelector: React.FC<VehicleTypeSelectorProps> = ({ 
  selectedType, 
  onChange 
}) => {
  return (
    <div className="flex space-x-2 mb-6">
      <Button
        type="button"
        variant={selectedType === 'car' ? 'default' : 'outline'}
        className="flex items-center"
        onClick={() => onChange('car')}
      >
        <Car className="h-4 w-4 mr-2" />
        Carro
      </Button>
      <Button
        type="button"
        variant={selectedType === 'motorcycle' ? 'default' : 'outline'}
        className="flex items-center"
        onClick={() => onChange('motorcycle')}
      >
        <Motorcycle className="h-4 w-4 mr-2" />
        Moto
      </Button>
    </div>
  );
};

export default VehicleTypeSelector;
