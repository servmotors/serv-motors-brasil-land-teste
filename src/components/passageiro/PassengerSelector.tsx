
import React from 'react';
import { Button } from "@/components/ui/button";
import { CreditCard, Users, Plus, Minus } from 'lucide-react';

interface PassengerSelectorProps {
  passengers: number;
  setPassengers: (count: number) => void;
}

const PassengerSelector: React.FC<PassengerSelectorProps> = ({ 
  passengers, 
  setPassengers 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Passageiros</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setPassengers(Math.max(1, passengers - 1))}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={passengers <= 1}
          >
            <Minus size={16} />
          </button>
          <span className="w-6 text-center">{passengers}</span>
          <button 
            onClick={() => setPassengers(Math.min(4, passengers + 1))}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
            disabled={passengers >= 4}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex">
        <Button variant="outline" className="w-full text-xs border-gray-300">
          <CreditCard className="mr-2 h-4 w-4" />
          Cartão
        </Button>
      </div>
    </div>
  );
};

export default PassengerSelector;
