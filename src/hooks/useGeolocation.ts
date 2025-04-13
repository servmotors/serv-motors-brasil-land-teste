
import { useState, useEffect, useRef } from 'react';
import { useCurrentPosition } from './useCurrentPosition';
import { usePositionWatcher } from './usePositionWatcher';

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
  const isInitialLoadRef = useRef(true);
  
  // Current position hook
  const { getCurrentPosition } = useCurrentPosition({
    onPositionChange: (position) => {
      setCurrentLocation(position);
      isInitialLoadRef.current = false;
    },
    onError: setError,
    onLoadingChange: setIsLoading,
    currentPosition: currentLocation,
    isInitialLoad: isInitialLoadRef.current
  });
  
  // Position watcher hook
  const { startWatchingPosition, stopWatchingPosition } = usePositionWatcher({
    onPositionChange: setCurrentLocation,
    onError: setError,
    onLoadingChange: setIsLoading
  });
  
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
