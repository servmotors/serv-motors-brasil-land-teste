
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
  currentLocation: { lat: number, lng: number } | null;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ currentLocation }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-medium text-gray-500">Sua Localização:</label>
      {currentLocation ? (
        <div className="flex items-center text-sm">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          <span>
            {currentLocation.lat.toFixed(5)}, {currentLocation.lng.toFixed(5)}
          </span>
        </div>
      ) : (
        <div className="text-sm text-gray-500">Obtendo localização...</div>
      )}
    </div>
  );
};

export default LocationDisplay;
