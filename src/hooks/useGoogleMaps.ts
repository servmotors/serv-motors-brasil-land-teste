
import { useState, useCallback, useRef } from 'react';
import { Marker } from '@/types/map';

interface GoogleMapsState {
  googleApiKey: string;
  setGoogleApiKey: (key: string) => void;
  markers: Marker[];
  loadGoogleMapsApi: (center: { lat: number, lng: number }) => void;
}

export const useGoogleMaps = (): GoogleMapsState => {
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [markers, setMarkers] = useState<Marker[]>([]);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Initialize Google Maps with API key
  const loadGoogleMapsApi = useCallback((center: { lat: number, lng: number }) => {
    if (!googleApiKey) return;

    // Clear existing markers when reloading
    setMarkers([]);

    // Add driver marker (blue dot)
    setMarkers(prev => [...prev, {
      position: center,
      title: 'Sua localização',
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }]);

    // Load Google Maps API if not already loaded
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        // Initialize geocoder after API is loaded
        geocoderRef.current = new window.google.maps.Geocoder();
      };
      document.head.appendChild(script);
    } else {
      // If API is already loaded, initialize geocoder
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [googleApiKey]);

  return {
    googleApiKey,
    setGoogleApiKey,
    markers,
    loadGoogleMapsApi
  };
};
