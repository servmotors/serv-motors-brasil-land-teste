
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface DriverMapProps {
  className?: string;
}

interface Marker {
  position: { lat: number, lng: number };
  title: string;
  icon?: string;
}

const DriverMap = ({ className }: DriverMapProps) => {
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<string[]>([
    'Av. Paulista, São Paulo', 
    'Estação da Luz, São Paulo',
    'Shopping Ibirapuera, São Paulo'
  ]);
  const [markers, setMarkers] = useState<Marker[]>([]);
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const geocoderRef = useRef<google.maps.Geocoder | null>(null);

  // Function to get current position
  const getCurrentPosition = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
          
          // If we have an API key, initialize the map
          if (googleApiKey && latitude && longitude) {
            initializeGoogleMap({ lat: latitude, lng: longitude });
          }
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
    // Initially attempt to get location when component mounts
    getCurrentPosition();
  }, []);

  // Initialize Google Maps with API key
  const initializeGoogleMap = useCallback((center: { lat: number, lng: number }) => {
    if (!googleApiKey || !mapRef.current) return;

    // Load Google Maps API if not already loaded
    if (!window.google?.maps) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`;
      script.defer = true;
      script.async = true;
      script.onload = () => {
        createMap(center);
      };
      document.head.appendChild(script);
    } else {
      createMap(center);
    }
  }, [googleApiKey]);

  // Create the map
  const createMap = (center: { lat: number, lng: number }) => {
    if (!mapRef.current || !window.google?.maps) return;

    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom: 13,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
    });

    geocoderRef.current = new window.google.maps.Geocoder();
    
    // Add driver marker
    addMarker({
      position: center,
      title: 'Sua localização',
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });

    // Geocode destination addresses and add markers
    geocodeAddresses();
  };

  // Geocode destination addresses
  const geocodeAddresses = () => {
    if (!geocoderRef.current || !googleMapRef.current) return;
    
    destinations.forEach(address => {
      geocoderRef.current?.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const position = results[0].geometry.location.toJSON();
          
          addMarker({
            position,
            title: address,
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });
        } else {
          console.error(`Geocoding error for address: ${address}`, status);
        }
      });
    });
  };

  // Add a marker to the map
  const addMarker = (marker: Marker) => {
    if (!googleMapRef.current) return;
    
    const newMarker = new window.google.maps.Marker({
      position: marker.position,
      map: googleMapRef.current,
      title: marker.title,
      icon: marker.icon
    });

    // Add info window
    const infoWindow = new window.google.maps.InfoWindow({
      content: `<div style="font-weight: bold;">${marker.title}</div>`
    });

    newMarker.addListener('click', () => {
      infoWindow.open(googleMapRef.current, newMarker);
    });

    // Update markers state for reference
    setMarkers(prev => [...prev, marker]);
  };

  // Effect to initialize map when API key or location changes
  useEffect(() => {
    if (googleApiKey && currentLocation) {
      initializeGoogleMap(currentLocation);
    }
  }, [googleApiKey, currentLocation, initializeGoogleMap]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleApiKey(e.target.value);
  };

  const handleApiKeySubmit = () => {
    if (!googleApiKey) {
      toast({
        variant: "destructive",
        title: "Chave API inválida",
        description: "Por favor, insira uma chave API do Google válida."
      });
      return;
    }
    
    toast({
      title: "Chave API Google Atualizada",
      description: "A chave foi configurada com sucesso."
    });
    
    if (currentLocation) {
      initializeGoogleMap(currentLocation);
    }
  };

  const handleAddDestination = () => {
    setDestinations([...destinations, '']);
  };

  const handleDestinationChange = (index: number, value: string) => {
    const newDestinations = [...destinations];
    newDestinations[index] = value;
    setDestinations(newDestinations);
  };

  const handleUpdateMap = () => {
    if (!currentLocation) {
      getCurrentPosition();
      return;
    }
    
    // Reset markers and reinitialize map
    setMarkers([]);
    if (mapRef.current && googleMapRef.current) {
      initializeGoogleMap(currentLocation);
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Mapa de Localização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!googleApiKey ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">
              Para visualizar o mapa, insira sua chave API do Google Maps:
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={googleApiKey}
                onChange={handleApiKeyChange}
                placeholder="Insira a chave API Google Maps"
                className="flex-1 p-2 text-sm border rounded-md"
              />
              <Button 
                onClick={handleApiKeySubmit}
                size="sm"
              >
                Aplicar
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Obtenha sua chave API em <a href="https://console.cloud.google.com/google/maps-apis" className="text-blue-500 underline" target="_blank" rel="noreferrer">console.cloud.google.com</a>
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-medium text-gray-500">Sua Localização:</label>
                {currentLocation ? (
                  <div className="flex items-center text-sm">
                    <MapPin className="h-4 w-4 mr-1 text-primary" />
                    <span>
                      {currentLocation.lat.toFixed(5)}, {currentLocation.lng.toFixed(5)}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Obtendo localização...</div>
                )}
              </div>
              
              {/* Google Map */}
              <div 
                ref={mapRef} 
                className="w-full h-64 rounded-md border overflow-hidden bg-gray-100"
              ></div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-gray-500">Destinos:</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleAddDestination}
                  >
                    Adicionar
                  </Button>
                </div>
                
                {destinations.map((destination, index) => (
                  <input
                    key={index}
                    type="text"
                    value={destination}
                    onChange={(e) => handleDestinationChange(index, e.target.value)}
                    placeholder="Digite um endereço"
                    className="w-full p-2 text-sm border rounded-md"
                  />
                ))}
              </div>
              
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
              <p>Clique nos marcadores para ver detalhes.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

// Add Google Maps types
declare global {
  interface Window {
    google?: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        InfoWindow: typeof google.maps.InfoWindow;
        Geocoder: typeof google.maps.Geocoder;
        LatLng: typeof google.maps.LatLng;
      };
    };
  }
}

export default DriverMap;
