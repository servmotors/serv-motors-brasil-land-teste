
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Navigation } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';
import LocationDisplay from '@/components/map/LocationDisplay';
import { DriverMapProps } from '@/types/map';
import { useAuth } from '@/contexts/AuthContext';

const DriverMap = ({ className }: DriverMapProps) => {
  const { user } = useAuth();
  const { 
    currentLocation, 
    error, 
    isLoading, 
    getCurrentPosition,
    startWatchingPosition
  } = useGeolocation();

  const {
    googleApiKey,
    setGoogleApiKey,
    markers,
    loadGoogleMapsApi,
    currentAddress,
    isLoadingAddress
  } = useGoogleMaps();

  // Load Google Maps when API key and location are available
  useEffect(() => {
    if (googleApiKey && currentLocation) {
      loadGoogleMapsApi(currentLocation);
    }
  }, [googleApiKey, currentLocation, loadGoogleMapsApi]);

  // Initial setup to auto-locate when user is logged in or component mounts
  useEffect(() => {
    // If the user is logged in, attempt to get their location
    if (user) {
      // Se não tivermos uma localização atual, obtenha-a
      if (!currentLocation) {
        getCurrentPosition();
      } else if (googleApiKey) {
        // If we have both API key and location, update the map
        loadGoogleMapsApi(currentLocation);
      }
    }
  }, [user, googleApiKey, currentLocation, getCurrentPosition, loadGoogleMapsApi]);

  const handleUpdateMap = () => {
    if (!currentLocation) {
      getCurrentPosition();
      return;
    }
    
    if (googleApiKey) {
      loadGoogleMapsApi(currentLocation);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Mapa de Localização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!googleApiKey ? (
          <GoogleApiKeyForm 
            googleApiKey={googleApiKey} 
            setGoogleApiKey={setGoogleApiKey} 
          />
        ) : (
          <>
            <div className="space-y-4">
              <LocationDisplay 
                currentLocation={currentLocation} 
                currentAddress={currentAddress}
                isLoadingAddress={isLoadingAddress}
              />
              
              {/* Google Map */}
              <GoogleMapDisplay 
                center={currentLocation || undefined} 
                markers={markers}
              />
              
              <Button 
                onClick={handleUpdateMap} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Carregando...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Atualizar Mapa
                  </>
                )}
              </Button>
              
              {error && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
            
            <div className="pt-2 text-xs text-gray-400">
              <p>Sua localização em tempo real.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverMap;
