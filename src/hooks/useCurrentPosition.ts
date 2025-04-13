
import { useCallback } from 'react';
import { hasPositionChangedSignificantly } from '@/utils/geolocationUtils';

interface CurrentPositionOptions {
  onPositionChange: (position: { lat: number, lng: number }) => void;
  onError: (error: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
  currentPosition: { lat: number, lng: number } | null;
  isInitialLoad: boolean;
  minDistance?: number;
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Hook to handle getting the user's current position
 */
export const useCurrentPosition = ({
  onPositionChange,
  onError,
  onLoadingChange,
  currentPosition,
  isInitialLoad,
  minDistance = 0.01,
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 0
}: CurrentPositionOptions) => {
  
  const getCurrentPosition = useCallback(() => {
    onLoadingChange(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          // Only update if position has changed significantly or this is the first load
          if (isInitialLoad || hasPositionChangedSignificantly(currentPosition, latitude, longitude, minDistance)) {
            onPositionChange({ lat: latitude, lng: longitude });
          }
          
          onLoadingChange(false);
        },
        (err) => {
          onError(`Erro ao obter localização: ${err.message}`);
          onLoadingChange(false);
        },
        { 
          enableHighAccuracy,
          timeout,
          maximumAge
        }
      );
    } else {
      onError('Geolocalização não é suportada por este navegador.');
      onLoadingChange(false);
    }
  }, [onPositionChange, onError, onLoadingChange, currentPosition, isInitialLoad, minDistance, enableHighAccuracy, timeout, maximumAge]);
  
  return { getCurrentPosition };
};
