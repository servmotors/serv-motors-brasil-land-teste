
import { useState, useEffect } from 'react';

interface GeolocationState {
  currentLocation: { lat: number, lng: number } | null;
  error: string | null;
  isLoading: boolean;
  getCurrentPosition: () => void;
}

export const useGeolocation = (): GeolocationState => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getCurrentPosition = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (err) => {
          setError(`Erro ao obter localização: ${err.message}`);
          setIsLoading(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocalização não é suportada por este navegador.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initially attempt to get location when hook is used
    getCurrentPosition();
  }, []);

  return {
    currentLocation,
    error,
    isLoading,
    getCurrentPosition
  };
};
