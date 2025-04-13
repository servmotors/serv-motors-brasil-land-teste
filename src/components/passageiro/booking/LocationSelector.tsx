
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search, Navigation, Clock, MapPinOff, Loader2 } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';
import { useAddressLookup } from '@/hooks/useAddressLookup';

interface LocationSelectorProps {
  pickup: string;
  destination: string;
  onPickupChange: (value: string) => void;
  onDestinationChange: (value: string) => void;
  onCalculateRoute: () => void;
}

const formatCEP = (cep: string): string => {
  // Remove any non-digit characters
  const digits = cep.replace(/\D/g, '');
  
  // Format as 00000-000
  if (digits.length <= 5) {
    return digits;
  }
  return `${digits.slice(0, 5)}-${digits.slice(5, 8)}`;
};

const isCEPPattern = (text: string): boolean => {
  // Check if the input matches a CEP pattern (even partially)
  return /^\d{5}-?\d{0,3}$/.test(text);
};

const LocationSelector: React.FC<LocationSelectorProps> = ({
  pickup,
  destination,
  onPickupChange,
  onDestinationChange,
  onCalculateRoute
}) => {
  const { toast } = useToast();
  const { currentLocation, getCurrentPosition, isLoading: isLoadingLocation } = useGeolocation();
  const { lookupAddressByCep, isLoading: isLoadingCep } = useAddressLookup();
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  
  // Effect to get current location on component mount
  useEffect(() => {
    if (currentLocation && !pickup && !isUsingCurrentLocation) {
      // The effect should run only once when the component is first rendered
      setIsUsingCurrentLocation(true);
      getCurrentPosition();
    }
  }, [currentLocation, pickup, onCalculateRoute, isUsingCurrentLocation, getCurrentPosition]);
  
  // Handler for using current location
  const handleUseCurrentLocation = () => {
    setIsUsingCurrentLocation(true);
    getCurrentPosition();
    
    toast({
      title: "Localização atual",
      description: "Buscando sua localização atual...",
    });
  };
  
  // Handler for pickup input changes
  const handlePickupChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isCEPPattern(value)) {
      // If looks like a CEP, format it properly
      const formattedValue = formatCEP(value);
      onPickupChange(formattedValue);
      
      // If we have 8 digits (complete CEP), try to look up the address
      if (formattedValue.replace(/\D/g, '').length === 8) {
        const result = await lookupAddressByCep(formattedValue);
        if (result.success && result.address) {
          onPickupChange(result.address);
          toast({
            title: "Endereço encontrado",
            description: `Endereço encontrado para o CEP ${formattedValue}`,
          });
        } else if (result.error) {
          toast({
            title: "Erro na busca",
            description: result.error,
            variant: "destructive"
          });
        }
      }
    } else {
      // Not a CEP, just update the value
      onPickupChange(value);
    }
  };
  
  // Handler for destination input changes
  const handleDestinationChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isCEPPattern(value)) {
      // If looks like a CEP, format it properly
      const formattedValue = formatCEP(value);
      onDestinationChange(formattedValue);
      
      // If we have 8 digits (complete CEP), try to look up the address
      if (formattedValue.replace(/\D/g, '').length === 8) {
        const result = await lookupAddressByCep(formattedValue);
        if (result.success && result.address) {
          onDestinationChange(result.address);
          toast({
            title: "Endereço encontrado",
            description: `Endereço encontrado para o CEP ${formattedValue}`,
          });
        } else if (result.error) {
          toast({
            title: "Erro na busca",
            description: result.error,
            variant: "destructive"
          });
        }
      }
    } else {
      // Not a CEP, just update the value
      onDestinationChange(value);
    }
  };

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
            <Input
              type="text"
              placeholder="Local de partida ou CEP (00000-000)"
              value={pickup}
              onChange={handlePickupChange}
              className="w-full pl-3 pr-10 py-2"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {isLoadingLocation || isLoadingCep ? (
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={handleUseCurrentLocation}
                    title="Usar localização atual"
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                  </Button>
                  {pickup && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={() => onPickupChange('')}
                      title="Limpar"
                    >
                      <MapPinOff className="h-5 w-5 text-gray-400" />
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="relative">
            <Input
              type="text"
              placeholder="Para onde? Digite endereço ou CEP"
              value={destination}
              onChange={handleDestinationChange}
              className="w-full pl-3 pr-10 py-2"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
              {isLoadingCep ? (
                <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              ) : (
                <>
                  <Search className="h-5 w-5 text-gray-400" />
                  {destination && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={() => onDestinationChange('')}
                      title="Limpar"
                    >
                      <MapPinOff className="h-5 w-5 text-gray-400" />
                    </Button>
                  )}
                </>
              )}
            </div>
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
          disabled={!pickup || !destination || isLoadingLocation || isLoadingCep}
          className="text-xs"
        >
          {isLoadingLocation || isLoadingCep ? (
            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
          ) : (
            <Navigation className="h-4 w-4 mr-1" />
          )}
          Calcular
        </Button>
      </div>
    </div>
  );
};

export default LocationSelector;
