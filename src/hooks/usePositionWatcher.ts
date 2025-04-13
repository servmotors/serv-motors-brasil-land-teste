
import { useRef, useCallback } from 'react';
import { hasPositionChangedSignificantly } from '@/utils/geolocationUtils';

interface PositionWatcherOptions {
  onPositionChange: (position: { lat: number, lng: number }) => void;
  onError: (error: string) => void;
  onLoadingChange: (isLoading: boolean) => void;
  minDistance?: number;
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

/**
 * Hook to handle watching the user's position
 */
export const usePositionWatcher = ({
  onPositionChange,
  onError,
  onLoadingChange,
  minDistance = 0.01,
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 0
}: PositionWatcherOptions) => {
  const watchIdRef = useRef<number | null>(null);
  
  // Start watching position
  const startWatchingPosition = useCallback(() => {
    // Don't start another watcher if one already exists
    if (watchIdRef.current !== null) return;
    
    onLoadingChange(true);
    
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          
          onPositionChange({ lat: latitude, lng: longitude });
          onLoadingChange(false);
        },
        (err) => {
          onError(`Erro ao monitorar localização: ${err.message}`);
          onLoadingChange(false);
        },
        { 
          enableHighAccuracy,
          timeout,
          maximumAge
        }
      );
      watchIdRef.current = id;
    } else {
      onError('Geolocalização não é suportada por este navegador.');
      onLoadingChange(false);
    }
  }, [onPositionChange, onError, onLoadingChange, minDistance, enableHighAccuracy, timeout, maximumAge]);
  
  // Stop watching position
  const stopWatchingPosition = useCallback(() => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);
  
  return {
    startWatchingPosition,
    stopWatchingPosition,
    isWatching: watchIdRef.current !== null
  };
};
