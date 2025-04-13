
import React, { useEffect, useState } from 'react';
import { MapPin, Search, Navigation } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';
import { useAddressLookup } from '@/hooks/useAddressLookup';
import { formatCEP, isCEPPattern } from './utils/addressUtils';
import { 
  AddressInput, 
  RouteButton, 
  LocationIndicator,
  TimeDisplay
} from './location';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  const { toast } = useToast();
  const { currentLocation, getCurrentPosition, isLoading: isLoadingLocation } = useGeolocation();
  const { lookupAddressByCep, isLoading: isLoadingCep } = useAddressLookup();
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const [pickupMethod, setPickupMethod] = useState<'current' | 'manual'>('current');
  
  // Effect to get current location on component mount
  useEffect(() => {
    if (currentLocation && !pickup && !isUsingCurrentLocation && pickupMethod === 'current') {
      setIsUsingCurrentLocation(true);
      getCurrentPosition();
    }
  }, [currentLocation, pickup, onCalculateRoute, isUsingCurrentLocation, getCurrentPosition, pickupMethod]);
  
  // Handler for using current location
  const handleUseCurrentLocation = () => {
    setIsUsingCurrentLocation(true);
    setPickupMethod('current');
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

  // Create the action button for the pickup input
  const locationButton = (
    <Button
      variant="ghost"
      onClick={handleUseCurrentLocation}
      className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
      title="Usar localização atual"
    >
      <MapPin className="h-5 w-5 text-primary" />
    </Button>
  );

  return (
    <div className="space-y-4 mb-4">
      <div className="flex items-center space-x-3">
        <LocationIndicator />
        
        <div className="flex-1 space-y-3">
          <div className="mb-2">
            <Tabs defaultValue={pickupMethod} onValueChange={(value) => setPickupMethod(value as 'current' | 'manual')}>
              <TabsList className="w-full mb-2">
                <TabsTrigger value="current" className="flex-1">
                  <Navigation className="h-4 w-4 mr-1" /> Localização atual
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex-1">
                  <Search className="h-4 w-4 mr-1" /> Digitar endereço/CEP
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="mt-0">
                {isLoadingLocation ? (
                  <div className="text-sm text-gray-500 flex items-center">
                    <Navigation className="h-4 w-4 mr-1 animate-pulse" /> 
                    Obtendo sua localização...
                  </div>
                ) : (
                  <div className="text-sm flex items-center">
                    <Navigation className="h-4 w-4 mr-1 text-primary" /> 
                    {pickup || "Localização será usada automaticamente"}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="manual" className="mt-0">
                <AddressInput
                  value={pickup}
                  onChange={handlePickupChange}
                  placeholder="Local de partida ou CEP (00000-000)"
                  icon={null}
                  isLoading={isLoadingCep}
                  actionButton={locationButton}
                />
              </TabsContent>
            </Tabs>
          </div>
          
          <AddressInput
            value={destination}
            onChange={handleDestinationChange}
            placeholder="Para onde? Digite endereço ou CEP"
            icon={<Search className="h-5 w-5 text-gray-400" />}
            isLoading={isLoadingCep}
          />
        </div>
      </div>
      
      <div className="flex justify-between items-center py-2">
        <TimeDisplay />
        
        <RouteButton 
          onCalculateRoute={onCalculateRoute}
          isDisabled={!pickup || !destination || isLoadingLocation || isLoadingCep}
          isLoading={isLoadingLocation || isLoadingCep}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
