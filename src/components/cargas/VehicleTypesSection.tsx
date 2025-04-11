
import React from 'react';
import VehicleTypeCard, { VehicleType } from './VehicleTypeCard';

interface VehicleTypesSectionProps {
  vehicleTypes: VehicleType[];
}

const VehicleTypesSection: React.FC<VehicleTypesSectionProps> = ({ vehicleTypes }) => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Escolha o veículo ideal para sua entrega</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vehicleTypes.map((vehicle) => (
            <VehicleTypeCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleTypesSection;
