import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Search, Navigation, Clock } from 'lucide-react';

interface LocationSelectorProps {
  pickup: string;
  destination: string;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onCalculateRoute: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
  onCalculateRoute
}) => {
  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center space-x-3">
        <div className="flex flex-col items-center">
          <div className="w-3 h-3 rounded-full bg-primary"></div>
          <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
          <div className="w-3 h-3 rounded-full bg-gray-800"></div>
        </div>
        
        <div className="flex-1 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Local de partida"
              value={pickup}
              onChange={(e) => onPickupChange(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Para onde?"
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center py-2">
        <div className="flex items-center">
          <Clock className="h-5 w-5 text-gray-500 mr-2" />
          <span className="text-gray-800">Agora</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onCalculateRoute}
          disabled={!pickup || !destination}
          className="text-xs"
        >
          <Navigation className="h-4 w-4 mr-1" />
          Calcular
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
