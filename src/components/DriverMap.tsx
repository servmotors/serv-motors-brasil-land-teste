
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin } from 'lucide-react';

interface DriverMapProps {
  className?: string;
}

const DriverMap = ({ className }: DriverMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get current position
  const getCurrentPosition = () => {
    setIsLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { longitude, latitude } = position.coords;
          setCurrentLocation([longitude, latitude]);
          setIsLoading(false);
          
          // If map is already initialized, fly to new location
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              essential: true
            });
            
            // Update or add marker
            const markers = document.getElementsByClassName('mapboxgl-marker');
            while(markers[0]) {
              markers[0].parentNode?.removeChild(markers[0]);
            }
            
            new mapboxgl.Marker({ color: '#FCCE0D' })
              .setLngLat([longitude, latitude])
              .addTo(map.current);
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

  useEffect(() => {
    if (!mapContainer.current || !currentLocation) return;
    
    // Only initialize map if we have both the container ref and location
    if (!mapboxToken) {
      // If no token is provided yet, don't initialize map
      return;
    }
    
    // Initialize map
    if (!map.current) {
      mapboxgl.accessToken = mapboxToken;
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: currentLocation,
        zoom: 14,
        attributionControl: false
      });
      
      // Add marker for driver location
      new mapboxgl.Marker({ color: '#FCCE0D' })
        .setLngLat(currentLocation)
        .addTo(map.current);
      
      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({ showCompass: false }),
        'top-right'
      );
    }
    
    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [currentLocation, mapboxToken]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapboxToken(e.target.value);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Sua Localização</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!mapboxToken ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">
              Para visualizar o mapa, insira seu token público do Mapbox:
            </p>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={mapboxToken}
                onChange={handleTokenChange}
                placeholder="Insira o token Mapbox"
                className="flex-1 p-2 text-sm border rounded-md"
              />
              <Button 
                onClick={() => setMapboxToken(mapboxToken)}
                size="sm"
              >
                Aplicar
              </Button>
            </div>
            <p className="text-xs text-gray-400">
              Obtenha seu token em <a href="https://account.mapbox.com" className="text-blue-500 underline" target="_blank" rel="noreferrer">account.mapbox.com</a>
            </p>
          </div>
        ) : (
          <>
            <div 
              ref={mapContainer} 
              className="h-[300px] rounded-md overflow-hidden border" 
            />
            
            <div className="flex justify-between items-center">
              {currentLocation ? (
                <div className="text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1 text-primary" />
                    {currentLocation[1].toFixed(5)}, {currentLocation[0].toFixed(5)}
                  </span>
                </div>
              ) : null}
              
              <Button 
                onClick={getCurrentPosition} 
                size="sm" 
                disabled={isLoading}
                className="ml-auto"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Atualizando...
                  </>
                ) : (
                  'Atualizar Localização'
                )}
              </Button>
            </div>
            
            {error && (
              <div className="p-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                {error}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverMap;
