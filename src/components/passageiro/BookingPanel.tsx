import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Car, MapPin, Clock, CreditCard, Search,
  Users, Plus, Minus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { RideOption } from '@/types/ride';
import VehicleOptions from './VehicleOptions';
import PassengerSelector from './PassengerSelector';

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
  const { toast } = useToast();

  const handleBookRide = () => {
    if (!pickup || !destination) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha os locais de partida e destino",
        variant: "destructive"
      });
      return;
    }
    
    onBookRide();
  };

  const rideOptions: RideOption[] = [
    {
      id: 'serv-x',
      name: 'Moto Táxi',
      icon: <Car className="h-5 w-5" />,
      description: 'Transporte rápido e econômico',
      price: 'R$ 18-24',
      time: '3 min',
      image: '/lovable-uploads/1a265f81-d151-4e45-80c0-a3962e8b3399.png'
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
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className={`md:w-96 bg-white shadow-lg md:shadow-xl transition-all duration-300 ${!showBookingPanel && 'translate-y-[calc(100%-60px)] md:translate-y-0'} z-10`}>
      <div className="md:hidden px-4 py-3 flex items-center justify-between" onClick={toggleBookingPanel}>
        <div className="mx-auto w-12 h-1 bg-gray-300 rounded-full"></div>
      </div>
      
      <div className="px-6 py-4">
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
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                  
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Para onde?"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 py-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-800">Agora</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-800">5 min de espera</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reserve" className="mt-4">
            <div className="space-y-4">
              <Calendar className="h-5 w-5 text-gray-500" />
              <span>Agendar para mais tarde</span>
            </div>
            <p className="text-sm text-gray-600">
              Reserve uma viagem com antecedência para garantir seu deslocamento.
            </p>
          </TabsContent>
        </Tabs>
        
        <VehicleOptions rideOptions={rideOptions} selectedType={carType} onSelect={setCarType} />
        
        <PassengerSelector passengers={passengers} setPassengers={setPassengers} />
        
        <Button 
          onClick={handleBookRide}
          className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
        >
          Solicitar Serv {carType.split('-')[1]?.toUpperCase() || 'X'}
        </Button>
      </div>
    </div>
  );
};

import { Calendar } from 'lucide-react';

export default BookingPanel;
