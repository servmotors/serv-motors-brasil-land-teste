
import { useState, useEffect } from 'react';

interface GeolocationState {
  currentLocation: { lat: number, lng: number } | null;
  error: string | null;
  isLoading: boolean;
  getCurrentPosition: () => void;
  startWatchingPosition: () => void;
  stopWatchingPosition: () => void;
}

export const useGeolocation = (): GeolocationState => {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [watchId, setWatchId] = useState<number | null>(null);

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

  const startWatchingPosition = () => {
    // Não iniciar outro watcher se já existir um
    if (watchId !== null) return;
    
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
        },
        (err) => {
          setError(`Erro ao monitorar localização: ${err.message}`);
          setIsLoading(false);
        },
        { 
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
      setWatchId(id);
    } else {
      setError('Geolocalização não é suportada por este navegador.');
      setIsLoading(false);
    }
  };

  const stopWatchingPosition = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
  };

  useEffect(() => {
    // Initially attempt to get location when hook is used
    getCurrentPosition();
    
    // Cleanup function to stop watching position
    return () => {
      stopWatchingPosition();
    };
  }, []);

  return {
    currentLocation,
    error,
    isLoading,
    getCurrentPosition,
    startWatchingPosition,
    stopWatchingPosition
  };
};
