
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin, Navigation } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Client } from '@googlemaps/google-maps-services-js';

interface DriverMapProps {
  className?: string;
}

interface DistanceData {
  origin: string;
  destination: string;
  distance: string;
  duration: string;
}

const DriverMap = ({ className }: DriverMapProps) => {
  const [googleApiKey, setGoogleApiKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [destinations, setDestinations] = useState<string[]>([
    'Av. Paulista, São Paulo', 
    'Estação da Luz, São Paulo',
    'Shopping Ibirapuera, São Paulo'
  ]);
  const [distanceResults, setDistanceResults] = useState<DistanceData[]>([]);
  const { toast } = useToast();

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
          
          // If we have an API key, calculate distances
          if (googleApiKey && latitude && longitude) {
            calculateDistances(`${latitude},${longitude}`);
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

  // Calculate distances when we have both API key and location
  useEffect(() => {
    if (googleApiKey && currentLocation) {
      const origin = `${currentLocation[1]},${currentLocation[0]}`;
      calculateDistances(origin);
    }
  }, [googleApiKey, currentLocation]);

  const calculateDistances = async (origin: string) => {
    if (!googleApiKey || destinations.length === 0) return;

    setIsLoading(true);
    const client = new Client({});
    
    try {
      const newResults: DistanceData[] = [];
      
      for (const destination of destinations) {
        try {
          const response = await client.distancematrix({
            params: {
              origins: [origin],
              destinations: [destination],
              key: googleApiKey
            }
          });
          
          if (
            response.data.rows[0] && 
            response.data.rows[0].elements[0] && 
            response.data.rows[0].elements[0].status === 'OK'
          ) {
            const element = response.data.rows[0].elements[0];
            newResults.push({
              origin: response.data.origin_addresses[0],
              destination: response.data.destination_addresses[0],
              distance: element.distance.text,
              duration: element.duration.text
            });
          }
        } catch (error) {
          console.error("Error calculating distance for", destination, error);
        }
      }
      
      setDistanceResults(newResults);
      setIsLoading(false);
      
      if (newResults.length === 0) {
        toast({
          variant: "destructive",
          title: "Nenhum resultado encontrado",
          description: "Não foi possível calcular as distâncias para os destinos informados."
        });
      }
    } catch (err) {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erro ao calcular distâncias",
        description: "Verifique se a chave API do Google é válida."
      });
    }
  };

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
      calculateDistances(`${currentLocation[1]},${currentLocation[0]}`);
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

  const handleCalculateDistances = () => {
    if (!currentLocation) {
      getCurrentPosition();
      return;
    }
    
    const origin = `${currentLocation[1]},${currentLocation[0]}`;
    calculateDistances(origin);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Distâncias e Tempos</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!googleApiKey ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-500 mb-2">
              Para calcular distâncias, insira sua chave API do Google Maps:
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
                      {currentLocation[1].toFixed(5)}, {currentLocation[0].toFixed(5)}
                    </span>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">Obtendo localização...</div>
                )}
              </div>
              
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
                onClick={handleCalculateDistances} 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Calculando...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 mr-2" />
                    Calcular Distâncias
                  </>
                )}
              </Button>
              
              {distanceResults.length > 0 && (
                <div className="mt-4 border rounded-md overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Destino</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Distância</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-500">Tempo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {distanceResults.map((result, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 truncate max-w-[150px]">{result.destination}</td>
                          <td className="px-4 py-2">{result.distance}</td>
                          <td className="px-4 py-2">{result.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {error && (
                <div className="p-2 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
                  {error}
                </div>
              )}
            </div>
            
            <div className="pt-2 text-xs text-gray-400">
              <p>Os tempos de viagem são estimativas baseadas no tráfego atual.</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default DriverMap;
