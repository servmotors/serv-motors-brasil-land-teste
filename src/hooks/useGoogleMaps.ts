
import { useState, useCallback, useRef, useEffect } from 'react';
import { Marker } from '@/types/map';
import { useAuth } from '@/contexts/AuthContext';

interface GoogleMapsState {
  googleApiKey: string;
  setGoogleApiKey: (key: string) => void;
  markers: Marker[];
  loadGoogleMapsApi: (center: { lat: number, lng: number }) => void;
  currentAddress: string | null;
  isLoadingAddress: boolean;
}

export const useGoogleMaps = (): GoogleMapsState => {
  const { user } = useAuth();
  // Load API key from localStorage when hook initializes
  const [googleApiKey, setGoogleApiKey] = useState<string>(() => {
    return localStorage.getItem('google_maps_api_key') || '';
  });
  
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [currentAddress, setCurrentAddress] = useState<string | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState<boolean>(false);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Store API key in localStorage when it changes
  useEffect(() => {
    if (googleApiKey) {
      localStorage.setItem('google_maps_api_key', googleApiKey);
    }
  }, [googleApiKey]);

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
      setIsLoadingAddress(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        // Initialize geocoder after API is loaded
        geocoderRef.current = new window.google.maps.Geocoder();
        // Get address for initial location
        getAddressFromCoords(center);
      };
      document.head.appendChild(script);
    } else {
      // If API is already loaded, initialize geocoder
      geocoderRef.current = new window.google.maps.Geocoder();
      // Get address for location
      getAddressFromCoords(center);
    }
  }, [googleApiKey]);

  // Get street address from coordinates using reverse geocoding
  const getAddressFromCoords = useCallback((coords: { lat: number, lng: number }) => {
    if (!geocoderRef.current) return;
    
    setIsLoadingAddress(true);
    setCurrentAddress(null);
    
    geocoderRef.current.geocode({ location: coords }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        setCurrentAddress(results[0].formatted_address);
      } else {
        console.error('Geocoder failed due to: ' + status);
        setCurrentAddress('Endereço não encontrado');
      }
      setIsLoadingAddress(false);
    });
  }, []);

  // Update address when markers change
  useEffect(() => {
    if (markers.length > 0 && geocoderRef.current) {
      const driverMarker = markers.find(m => m.title === 'Sua localização');
      if (driverMarker) {
        getAddressFromCoords(driverMarker.position);
      }
    }
  }, [markers, getAddressFromCoords]);

  // Auto-load map when user is logged in and we have the API key
  useEffect(() => {
    // Load saved API key on mount
    const savedApiKey = localStorage.getItem('google_maps_api_key');
    if (savedApiKey && savedApiKey !== googleApiKey) {
      setGoogleApiKey(savedApiKey);
    }
  }, []);

  return {
    googleApiKey,
    setGoogleApiKey,
    markers,
    loadGoogleMapsApi,
    currentAddress,
    isLoadingAddress
  };
};
