
import React from 'react';
import { Navigation } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationDisplayProps {
  currentLocation?: { lat: number, lng: number } | null; // Make it optional with ?
  currentAddress?: string | null;
  isLoadingAddress?: boolean;
}

const LocationDisplay: React.FC<LocationDisplayProps> = ({ 
  currentAddress, 
  isLoadingAddress = false 
}) => {
  return (
    <div className="flex flex-col space-y-3">
      <div>
        <label className="text-xs font-medium text-gray-500">Endereço atual:</label>
        {isLoadingAddress ? (
          <Skeleton className="h-5 w-full mt-1" />
        ) : currentAddress ? (
          <div className="flex items-start text-sm">
            <Navigation className="h-4 w-4 mr-1 mt-0.5 text-primary" />
            <span>{currentAddress}</span>
          </div>
        ) : (
          <div className="text-sm text-gray-500">Endereço não disponível</div>
        )}
      </div>
    </div>
  );
};

export default LocationDisplay;
