
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import VehicleTypeSelector from './VehicleTypeSelector';

type VehicleType = 'car' | 'motorcycle';

const AdminRides = () => {
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType>('car');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Configurações de Corridas</h3>
      </div>
      
      <VehicleTypeSelector 
        selectedType={activeVehicleType} 
        onChange={setActiveVehicleType} 
      />
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h4 className="text-sm font-medium mb-2">Configurações de Corridas</h4>
        <p className="text-sm text-gray-600">
          Selecione o tipo de veículo para configurar as opções específicas para cada modalidade.
        </p>
      </div>
    </div>
  );
};

export default AdminRides;
