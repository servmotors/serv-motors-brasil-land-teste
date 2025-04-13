
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Car, MapPin, Clock, CreditCard, Search,
  Users, Plus, Minus, Calendar, Navigation
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { RideOption } from '@/types/ride';
import VehicleOptions from './VehicleOptions';
import PassengerSelector from './PassengerSelector';
import { useGeolocation } from '@/hooks/useGeolocation';

interface BookingPanelProps {
  onBookRide: () => void;
  showBookingPanel: boolean;
  toggleBookingPanel: () => void;
}

const BookingPanel: React.FC<BookingPanelProps> = ({ 
  onBookRide, 
  showBookingPanel, 
  toggleBookingPanel 
}) => {
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [carType, setCarType] = useState('serv-x');
  const [passengers, setPassengers] = useState(1);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [fare, setFare] = useState<string | null>(null);
  const { toast } = useToast();
  const { 
    currentLocation, 
    error: locationError,
    isLoading: isLoadingLocation,
    getCurrentPosition
  } = useGeolocation();

  // Get current location when component mounts
  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  // Set pickup location automatically when currentLocation changes
  useEffect(() => {
    if (currentLocation && !pickup) {
      // Convert coords to address (reverse geocoding) would go here
      // For now, just set the coordinates as pickup
      setPickup(`${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`);
    }
  }, [currentLocation, pickup]);

  // Calculate fare based on distance and vehicle type
  useEffect(() => {
    if (distance) {
      let baseFare = 0;
      let ratePerKm = 0;
      
      switch (carType) {
        case 'serv-x':
          baseFare = 5;
          ratePerKm = 2;
          break;
        case 'serv-comfort':
          baseFare = 7;
          ratePerKm = 2.5;
          break;
        case 'serv-black':
          baseFare = 10;
          ratePerKm = 3.5;
          break;
        default:
          baseFare = 5;
          ratePerKm = 2;
      }
      
      const calculatedFare = baseFare + (distance * ratePerKm);
      setFare(`R$ ${calculatedFare.toFixed(2)}`);
      
      // Update the ride options with the calculated fare
      updateRideOptionFares(distance);
    }
  }, [distance, carType]);

  const updateRideOptionFares = (distanceInKm: number) => {
    const updatedOptions = [...rideOptions].map(option => {
      let baseFare = 0;
      let ratePerKm = 0;
      
      switch (option.id) {
        case 'serv-x':
          baseFare = 5;
          ratePerKm = 2;
          break;
        case 'serv-comfort':
          baseFare = 7;
          ratePerKm = 2.5;
          break;
        case 'serv-black':
          baseFare = 10;
          ratePerKm = 3.5;
          break;
      }
      
      const minFare = baseFare + (distanceInKm * ratePerKm * 0.9);
      const maxFare = baseFare + (distanceInKm * ratePerKm * 1.1);
      
      return {
        ...option,
        price: `R$ ${minFare.toFixed(0)}-${maxFare.toFixed(0)}`
      };
    });
    
    setRideOptionsState(updatedOptions);
  };

  const calculateRoute = () => {
    if (!pickup || !destination || !window.google?.maps) {
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    
    directionsService.route(
      {
        origin: pickup,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          // Get distance in kilometers
          const distanceValue = result.routes[0]?.legs[0]?.distance?.value || 0;
          const distanceInKm = distanceValue / 1000;
          setDistance(distanceInKm);
          
          // Get duration in minutes
          const durationValue = result.routes[0]?.legs[0]?.duration?.value || 0;
          const durationInMinutes = Math.round(durationValue / 60);
          setDuration(durationInMinutes);
          
          toast({
            title: "Rota calculada",
            description: `Distância: ${distanceInKm.toFixed(1)}km - Tempo estimado: ${durationInMinutes} min`,
          });
        } else {
          toast({
            title: "Erro ao calcular rota",
            description: "Verifique os endereços informados e tente novamente",
            variant: "destructive"
          });
        }
      }
    );
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPickup(e.target.value);
  };

  const handleBookRide = () => {
    if (!pickup || !destination) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha os locais de partida e destino",
        variant: "destructive"
      });
      return;
    }
    
    if (!distance || !fare) {
      calculateRoute();
      toast({
        title: "Calculando rota",
        description: "Aguarde enquanto calculamos o valor da corrida",
      });
      return;
    }
    
    onBookRide();
  };

  // Function to get the button text based on the selected vehicle type
  const getButtonText = () => {
    switch (carType) {
      case 'serv-x':
        return 'Solicitar Moto';
      case 'serv-comfort':
        return 'Solicitar Carro';
      case 'serv-black':
        return 'Solicitar Executivo';
      default:
        return 'Solicitar Serviço';
    }
  };

  const [rideOptionsState, setRideOptionsState] = useState<RideOption[]>([
    {
      id: 'serv-x',
      name: 'Moto Táxi',
      icon: <Car className="h-5 w-5" />,
      description: 'Transporte rápido e econômico',
      price: 'R$ 18-24',
      time: '3 min',
      image: '/lovable-uploads/de093c3d-b12c-4386-a3dc-29067dc7043a.png'
    },
    {
      id: 'serv-comfort',
      name: 'Carro',
      icon: <Car className="h-5 w-5" />,
      description: 'Carros mais espaçosos para 4 pessoas',
      price: 'R$ 25-30',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'serv-black',
      name: 'Executivo',
      icon: <Car className="h-5 w-5" />,
      description: 'Carros premium com motoristas top',
      price: 'R$ 35-42',
      time: '8 min',
      image: '/lovable-uploads/b894cf04-c110-4f11-8149-d6caa7b00f5f.png'
    }
  ]);

  return (
    <div className={`h-full bg-white shadow-lg transition-all duration-300 ${!showBookingPanel && 'translate-y-[calc(100%-60px)] md:translate-y-0'} z-10`}>
      <div className="md:hidden px-4 py-3 flex items-center justify-between" onClick={toggleBookingPanel}>
        <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="px-6 py-4 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Solicitar viagem</h2>
        
        <Tabs defaultValue="ride" className="mb-6">
          <TabsList className="w-full">
            <TabsTrigger value="ride" className="flex-1">Viagem</TabsTrigger>
            <TabsTrigger value="reserve" className="flex-1">Reserva</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ride" className="mt-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                </div>
                
                <div className="flex-1 space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Local de partida"
                      value={pickup}
                      onChange={handlePickupChange}
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Para onde?"
                      value={destination}
                      onChange={handleDestinationChange}
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2" />
                  <span className="text-gray-800">Agora</span>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={calculateRoute}
                  disabled={!pickup || !destination}
                  className="text-xs"
                >
                  <Navigation className="h-4 w-4 mr-1" />
                  Calcular
                </Button>
              </div>
              
              {distance && duration && (
                <div className="p-3 bg-gray-50 rounded-lg text-sm">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Distância:</span>
                    <span>{distance.toFixed(1)} km</span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-medium">Tempo estimado:</span>
                    <span>{duration} min</span>
                  </div>
                  {fare && (
                    <div className="flex justify-between items-center pt-1 border-t border-gray-200 mt-1">
                      <span className="font-semibold">Valor estimado:</span>
                      <span className="font-semibold">{fare}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="reserve" className="mt-4">
            <div className="space-y-4 flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-2" />
              <span>Agendar para mais tarde</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Reserve uma viagem com antecedência para garantir seu deslocamento.
            </p>
          </TabsContent>
        </Tabs>
        
        <VehicleOptions 
          rideOptions={rideOptionsState} 
          selectedType={carType} 
          onSelect={setCarType} 
        />
        
        <PassengerSelector passengers={passengers} setPassengers={setPassengers} />
        
        <Button 
          onClick={handleBookRide}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};

export default BookingPanel;
