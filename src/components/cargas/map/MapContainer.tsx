
import React, { useEffect } from 'react';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useGeolocation } from '@/hooks/useGeolocation';
import { Loader2, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MapContainer: React.FC = () => {
  const { googleApiKey, setGoogleApiKey, loadGoogleMapsApi, markers } = useGoogleMaps();
  const { 
    currentLocation, 
    error, 
    isLoading, 
    getCurrentPosition 
  } = useGeolocation();

  // Obter localização atual quando o componente carrega
  useEffect(() => {
    if (!currentLocation) {
      getCurrentPosition();
    }
  }, [getCurrentPosition, currentLocation]);

  // Carregar mapa quando temos a chave API e localização atual
  useEffect(() => {
    if (googleApiKey && currentLocation) {
      loadGoogleMapsApi(currentLocation);
    }
  }, [googleApiKey, currentLocation, loadGoogleMapsApi]);

  const handleUpdateLocation = () => {
    getCurrentPosition();
  };

  return (
    <div className="bg-gray-200 rounded-lg h-[400px] mb-3 flex flex-col overflow-hidden">
      {googleApiKey ? (
        <>
          <GoogleMapDisplay
            center={currentLocation || { lat: -23.55052, lng: -46.633309 }}
            zoom={15}
            markers={markers.filter(marker => marker.title === 'Sua localização')}
            className="h-full"
          />
          {currentLocation && (
            <div className="absolute bottom-4 right-4 z-10">
              <Button 
                onClick={handleUpdateLocation} 
                size="sm"
                className="bg-white text-black hover:bg-gray-200 rounded-full shadow-lg p-2 h-10 w-10"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Navigation className="h-5 w-5 text-primary" />
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="p-4 w-full max-w-md mx-auto my-auto">
          <GoogleApiKeyForm 
            googleApiKey={googleApiKey} 
            setGoogleApiKey={setGoogleApiKey} 
          />
        </div>
      )}
      
      {error && (
        <div className="p-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-600 mt-2 mx-4">
          {error}
        </div>
      )}
    </div>
  );
};

export default MapContainer;
