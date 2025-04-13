
import { useState, useEffect, useCallback, useRef } from 'react';

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
  const watchIdRef = useRef<number | null>(null);
  const isInitialLoadRef = useRef(true);

  const getCurrentPosition = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(prev => {
            // Only update if position has changed significantly (> 10 meters)
            // or if this is the first load
            if (!prev || isInitialLoadRef.current || 
                calculateDistance(prev.lat, prev.lng, latitude, longitude) > 0.01) {
              isInitialLoadRef.current = false;
              return { lat: latitude, lng: longitude };
            }
            return prev;
          });
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
  }, [isLoading]);

  const startWatchingPosition = useCallback(() => {
    // Não iniciar outro watcher se já existir um
    if (watchIdRef.current !== null) return;
    
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation(prev => {
            // Only update if position has changed significantly (> 10 meters)
            if (!prev || calculateDistance(prev.lat, prev.lng, latitude, longitude) > 0.01) {
              return { lat: latitude, lng: longitude };
            }
            return prev;
          });
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
      watchIdRef.current = id;
    } else {
      setError('Geolocalização não é suportada por este navegador.');
      setIsLoading(false);
    }
  }, []);

  const stopWatchingPosition = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  // Calculate distance between two coordinates in kilometers (Haversine formula)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // Distance in km
    return d;
  };

  const deg2rad = (deg: number): number => {
    return deg * (Math.PI/180);
  };

  useEffect(() => {
    // Initially attempt to get location when hook is used
    if (isInitialLoadRef.current) {
      getCurrentPosition();
    }
    
    // Cleanup function to stop watching position
    return () => {
      stopWatchingPosition();
    };
  }, [getCurrentPosition, stopWatchingPosition]);

  return {
    currentLocation,
    error,
    isLoading,
    getCurrentPosition,
    startWatchingPosition,
    stopWatchingPosition
  };
};
