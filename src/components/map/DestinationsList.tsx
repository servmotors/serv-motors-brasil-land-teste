
import React from 'react';
import { Button } from '@/components/ui/button';

interface DestinationsListProps {
  destinations: string[];
  onDestinationChange: (index: number, value: string) => void;
  onAddDestination: () => void;
}

const DestinationsList: React.FC<DestinationsListProps> = ({ 
  destinations, 
  onDestinationChange, 
  onAddDestination 
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-500">Destinos:</label>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onAddDestination}
        >
          Adicionar
        </Button>
      </div>
      
      {destinations.map((destination, index) => (
        <input
          key={index}
          type="text"
          value={destination}
          onChange={(e) => onDestinationChange(index, e.target.value)}
          placeholder="Digite um endereço"
          className="w-full p-2 text-sm border rounded-md"
        />
      ))}
    </div>
  );
};

export default DestinationsList;
