
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Car } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useGeolocation } from '@/hooks/useGeolocation';
import { RideOption } from '@/types/ride';
import BookingTabs from './BookingTabs';
import LocationSelector from './LocationSelector';
import RouteInformation from './RouteInformation';
import VehicleOptions from './VehicleOptions';
import PassengerSelector from './PassengerSelector';
import BookingButton from './BookingButton';
import { calculateRoute } from './utils/routeCalculator';
import { RideData } from './types';

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
  const navigate = useNavigate();
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [carType, setCarType] = useState('serv-x');
  const [passengers, setPassengers] = useState(1);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [fare, setFare] = useState<string | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const { toast } = useToast();
  const { 
    currentLocation, 
    error: locationError,
    isLoading: isLoadingLocation,
    getCurrentPosition
  } = useGeolocation();

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

  useEffect(() => {
    getCurrentPosition();
  }, [getCurrentPosition]);

  useEffect(() => {
    if (currentLocation && !pickup) {
      setPickup(`${currentLocation.lat.toFixed(6)}, ${currentLocation.lng.toFixed(6)}`);
    }
  }, [currentLocation, pickup]);

  useEffect(() => {
    const storedRideData = sessionStorage.getItem('rideData');
    const storedPaymentMethod = sessionStorage.getItem('paymentMethod');
    
    if (storedRideData) {
      const rideData: RideData = JSON.parse(storedRideData);
      setPickup(rideData.pickup);
      setDestination(rideData.destination);
      setCarType(rideData.carType);
      setPassengers(rideData.passengers);
      setDistance(rideData.distance);
      setDuration(rideData.duration);
      setFare(rideData.fare);
    }

    if (storedPaymentMethod) {
      setPaymentMethod(storedPaymentMethod);
      setPaymentComplete(true);
      
      toast({
        title: "Pagamento confirmado",
        description: `Forma de pagamento: ${getPaymentMethodName(storedPaymentMethod)}`,
      });

      sessionStorage.removeItem('paymentMethod');
    }
  }, [toast]);

  useEffect(() => {
    if (distance) {
      updateRideOptionFares(distance);
    }
  }, [distance, carType]);

  const getPaymentMethodName = (method: string): string => {
    switch (method) {
      case 'cash': return 'Dinheiro';
      case 'credit': return 'Cartão de Crédito';
      case 'pix': return 'PIX';
      case 'wallet': return 'Saldo em Carteira';
      default: return method;
    }
  };

  const updateRideOptionFares = (distanceInKm: number) => {
    const updatedOptions = [...rideOptionsState].map(option => {
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
      
      if (option.id === carType) {
        const calculatedFare = baseFare + (distanceInKm * ratePerKm);
        setFare(`R$ ${calculatedFare.toFixed(2)}`);
      }
      
      return {
        ...option,
        price: `R$ ${minFare.toFixed(0)}-${maxFare.toFixed(0)}`
      };
    });
    
    setRideOptionsState(updatedOptions);
  };

  const calculateRouteHandler = () => {
    if (!pickup || !destination) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha os locais de partida e destino",
        variant: "destructive"
      });
      return;
    }

    calculateRoute(pickup, destination, (distanceInKm, durationInMinutes) => {
      setDistance(distanceInKm);
      setDuration(durationInMinutes);
      
      toast({
        title: "Rota calculada",
        description: `Distância: ${distanceInKm.toFixed(1)}km - Tempo estimado: ${durationInMinutes} min`,
      });
    }, (error) => {
      toast({
        title: "Erro ao calcular rota",
        description: error || "Verifique os endereços informados e tente novamente",
        variant: "destructive"
      });
    });
  };

  const handlePickupChange = (value: string) => {
    setPickup(value);
  };

  const handleDestinationChange = (value: string) => {
    setDestination(value);
  };

  const saveRideDataAndGoToPayment = () => {
    if (!pickup || !destination) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha os locais de partida e destino",
        variant: "destructive"
      });
      return;
    }
    
    if (!distance || !fare) {
      calculateRouteHandler();
      toast({
        title: "Calculando rota",
        description: "Aguarde enquanto calculamos o valor da corrida",
      });
      return;
    }
    
    const rideData: RideData = {
      pickup,
      destination,
      carType,
      passengers,
      distance,
      duration,
      fare
    };
    
    sessionStorage.setItem('rideData', JSON.stringify(rideData));
    navigate('/payment');
  };

  const handleFindDriver = () => {
    setPaymentComplete(false);
    setPaymentMethod(null);
    sessionStorage.removeItem('paymentMethod');
    
    // Clear address fields after calling for a driver
    setPickup('');
    setDestination('');
    
    // Reset route information
    setDistance(null);
    setDuration(null);
    setFare(null);
    
    onBookRide();
  };

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

  const shouldShowPaymentButton = Boolean(pickup && destination);
  const shouldShowFindDriverButton = Boolean(paymentComplete && paymentMethod);

  return (
    <div className={`h-full bg-white shadow-lg transition-all duration-300 ${!showBookingPanel && 'translate-y-[calc(100%-60px)] md:translate-y-0'} z-10`}>
      <div className="md:hidden px-4 py-3 flex items-center justify-between" onClick={toggleBookingPanel}>
        <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="px-6 py-4 h-full overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Solicitar viagem</h2>
        
        <BookingTabs />
        
        <LocationSelector 
          pickup={pickup}
          destination={destination}
          onPickupChange={handlePickupChange}
          onDestinationChange={handleDestinationChange}
          onCalculateRoute={calculateRouteHandler}
        />
        
        {distance && duration && (
          <RouteInformation 
            distance={distance} 
            duration={duration} 
            fare={fare}
          />
        )}
        
        <VehicleOptions 
          rideOptions={rideOptionsState} 
          selectedType={carType} 
          onSelect={setCarType} 
        />
        
        <PassengerSelector passengers={passengers} setPassengers={setPassengers} />
        
        <BookingButton
          shouldShowFindDriverButton={shouldShowFindDriverButton}
          shouldShowPaymentButton={shouldShowPaymentButton}
          handleFindDriver={handleFindDriver}
          saveRideDataAndGoToPayment={saveRideDataAndGoToPayment}
          getButtonText={getButtonText}
        />
      </div>
    </div>
  );
};

export default BookingPanel;
