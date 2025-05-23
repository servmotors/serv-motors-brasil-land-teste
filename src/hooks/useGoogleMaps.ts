
import { useState, useCallback, useRef, useEffect } from 'react';
import { Marker, RouteDetails } from '@/types/map';
import { useAuth } from '@/contexts/AuthContext';

interface GoogleMapsState {
  googleApiKey: string;
  setGoogleApiKey: (key: string) => void;
  markers: Marker[];
  loadGoogleMapsApi: (center: { lat: number, lng: number }) => void;
  currentAddress: string | null;
  isLoadingAddress: boolean;
  calculateRoute: (origin: string, destination: string) => Promise<RouteDetails | null>;
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
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const apiLoadingRef = useRef<boolean>(false);
  const lastCenterRef = useRef<{lat: number, lng: number} | null>(null);

  // Store API key in localStorage when it changes
  useEffect(() => {
    if (googleApiKey) {
      localStorage.setItem('google_maps_api_key', googleApiKey);
    }
  }, [googleApiKey]);

  // Initialize Google Maps with API key
  const loadGoogleMapsApi = useCallback((center: { lat: number, lng: number }) => {
    if (!googleApiKey || apiLoadingRef.current) return;

    // Avoid reloading for small position changes
    if (lastCenterRef.current) {
      const distance = calculateDistance(
        lastCenterRef.current.lat, 
        lastCenterRef.current.lng, 
        center.lat, 
        center.lng
      );
      
      // If distance is less than 10 meters and we have markers, no need to reload
      if (distance < 0.01 && markers.length > 0) {
        return;
      }
    }
    
    lastCenterRef.current = center;

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
      apiLoadingRef.current = true;
      setIsLoadingAddress(true);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        // Initialize geocoder after API is loaded
        geocoderRef.current = new window.google.maps.Geocoder();
        directionsServiceRef.current = new window.google.maps.DirectionsService();
        // Get address for initial location
        getAddressFromCoords(center);
        apiLoadingRef.current = false;
      };
      document.head.appendChild(script);
    } else {
      // If API is already loaded, initialize geocoder
      geocoderRef.current = new window.google.maps.Geocoder();
      directionsServiceRef.current = new window.google.maps.DirectionsService();
      // Get address for location
      getAddressFromCoords(center);
    }
  }, [googleApiKey, markers.length]);

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

  // Get street address from coordinates using reverse geocoding
  const getAddressFromCoords = useCallback((coords: { lat: number, lng: number }) => {
    if (!geocoderRef.current) return;
    
    setIsLoadingAddress(true);
    
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

  // Calculate route and fare between origin and destination
  const calculateRoute = useCallback(async (origin: string, destination: string): Promise<RouteDetails | null> => {
    if (!directionsServiceRef.current || !window.google?.maps) {
      console.error('Google Maps not initialized');
      return null;
    }
    
    try {
      // Calculate route
      return new Promise((resolve, reject) => {
        directionsServiceRef.current?.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === google.maps.DirectionsStatus.OK && result) {
              // Get distance in kilometers
              const distanceValue = result.routes[0]?.legs[0]?.distance?.value || 0;
              const distanceInKm = distanceValue / 1000;
              
              // Get duration in minutes
              const durationValue = result.routes[0]?.legs[0]?.duration?.value || 0;
              const durationInMinutes = Math.round(durationValue / 60);
              
              // Calculate fare (simplified formula)
              const fare = 5 + (distanceInKm * 2.5);
              
              // Trigger route calculation on the map
              window.dispatchEvent(
                new CustomEvent('calculateRoute', {
                  detail: { origin, destination }
                })
              );
              
              resolve({
                distance: distanceInKm,
                duration: durationInMinutes,
                fare,
                origin,
                destination
              });
            } else {
              reject(new Error(`Direction service failed: ${status}`));
            }
          }
        );
      });
    } catch (error) {
      console.error('Error calculating route:', error);
      return null;
    }
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
    isLoadingAddress,
    calculateRoute
  };
};
