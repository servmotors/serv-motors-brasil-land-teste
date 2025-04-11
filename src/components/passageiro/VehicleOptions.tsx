
import React from 'react';
import { RideOption } from '@/types/ride';

interface VehicleOptionsProps {
  rideOptions: RideOption[];
  selectedType: string;
  onSelect: (id: string) => void;
}

const VehicleOptions: React.FC<VehicleOptionsProps> = ({ 
  rideOptions,
  selectedType,
  onSelect
}) => {
  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">Opções de veículo</h3>
      
      <div className="space-y-3">
        {rideOptions.map((option) => (
          <div 
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedType === option.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
          >
            <div className="w-16 h-12 rounded overflow-hidden mr-3">
              <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-semibold">{option.name}</p>
                <p className="font-semibold">{option.price}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xs text-gray-500">{option.description}</p>
                <p className="text-xs text-gray-500">{option.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleOptions;
