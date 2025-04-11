
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import {
  Car, MapPin, Clock, CreditCard, Navigation, ChevronRight,
  Calendar, User, Star, Search, Users, X, Menu, Plus, Minus
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PassageirosSection from '@/components/PassageirosSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useToast } from '@/hooks/use-toast';

const Passageiro = () => {
  const [showBookingPanel, setShowBookingPanel] = useState(true);
  const [destination, setDestination] = useState('');
  const [pickup, setPickup] = useState('');
  const [carType, setCarType] = useState('serv-x');
  const [passengers, setPassengers] = useState(1);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const { toast } = useToast();
  const { 
    googleApiKey, 
    setGoogleApiKey, 
    currentAddress, 
    loadGoogleMapsApi 
  } = useGoogleMaps();

  const handleInitMap = () => {
    if (googleApiKey) {
      // São Paulo coordinates
      loadGoogleMapsApi({ lat: -23.5505, lng: -46.6333 });
    } else {
      toast({
        title: "API Key Missing",
        description: "Please enter a Google Maps API key in the settings",
        variant: "destructive"
      });
    }
  };

  const toggleBookingPanel = () => {
    setShowBookingPanel(!showBookingPanel);
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
    
    toast({
      title: "Viagem solicitada!",
      description: "Procurando motoristas próximos...",
    });
  };

  const rideOptions = [
    {
      id: 'serv-x',
      name: 'Serv X',
      icon: <Car className="h-5 w-5" />,
      description: 'Carros econômicos para 4 pessoas',
      price: 'R$ 18-24',
      time: '3 min',
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'serv-comfort',
      name: 'Comfort',
      icon: <Car className="h-5 w-5" />,
      description: 'Carros mais espaçosos para 4 pessoas',
      price: 'R$ 25-30',
      time: '5 min',
      image: 'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 'serv-black',
      name: 'Serv Black',
      icon: <Car className="h-5 w-5" />,
      description: 'Carros premium com motoristas top',
      price: 'R$ 35-42',
      time: '8 min',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 relative">
        {/* Mobile header */}
        <div className="md:hidden bg-white py-3 px-4 shadow-sm">
          <div className="flex justify-between items-center">
            <button 
              onClick={toggleBookingPanel}
              className="bg-white p-2 rounded-full shadow"
            >
              {showBookingPanel ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Button variant="outline" size="sm" className="text-xs" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
              Use o aplicativo
            </Button>
          </div>
        </div>

        {/* Map and booking interface */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] md:h-[600px]">
          {/* Map area */}
          <div className="flex-1 bg-gray-200 relative">
            <div 
              className="w-full h-full bg-cover bg-center" 
              style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')"}}
            >
              {/* Map placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button 
                  onClick={handleInitMap}
                  className="bg-white text-black hover:bg-gray-200 shadow-lg"
                >
                  <MapPin className="mr-2 h-4 w-4 text-primary" />
                  Carregar Mapa
                </Button>
              </div>
              
              {/* Current location pin */}
              <div className="absolute bottom-20 right-4 md:top-4 md:right-4 z-10">
                <button className="bg-white p-3 rounded-full shadow-lg">
                  <Navigation className="h-5 w-5 text-primary" />
                </button>
              </div>
            </div>
          </div>

          {/* Booking panel */}
          <div className={`absolute inset-x-0 bottom-0 md:relative md:w-96 bg-white shadow-lg rounded-t-3xl md:rounded-none transition-transform duration-300 ${!showBookingPanel && 'translate-y-[calc(100%-60px)] md:translate-y-0'}`}>
            {/* Panel header (visible when collapsed on mobile) */}
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
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-gray-500" />
                      <span>Agendar para mais tarde</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Reserve uma viagem com antecedência para garantir seu deslocamento.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Opções de veículo</h3>
                
                <div className="space-y-3">
                  {rideOptions.map((option) => (
                    <div 
                      key={option.id}
                      onClick={() => setCarType(option.id)}
                      className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${carType === option.id ? 'border-primary bg-primary/5' : 'border-gray-200 hover:bg-gray-50'}`}
                    >
                      <div className="w-16 h-12 rounded overflow-hidden mr-3">
                        <img src={option.image} alt={option.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-semibold">{option.name}</p>
                          <p className="font-semibold">{option.price}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-xs text-gray-500">{option.description}</p>
                          <p className="text-xs text-gray-500">{option.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Passageiros</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      disabled={passengers <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-6 text-center">{passengers}</span>
                    <button 
                      onClick={() => setPassengers(Math.min(4, passengers + 1))}
                      className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                      disabled={passengers >= 4}
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1 text-xs border-gray-300">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Cartão
                  </Button>
                  <Button variant="outline" className="flex-1 text-xs border-gray-300">
                    <Users className="mr-2 h-4 w-4" />
                    Dividir
                  </Button>
                </div>
              </div>
              
              <Button 
                onClick={handleBookRide}
                className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
              >
                Solicitar Serv {carType.split('-')[1]?.toUpperCase() || 'X'}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Toggle button for app info sections (mobile only) */}
        <div className="md:hidden mt-4 px-4">
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            <span>Saiba mais sobre o Serv Motors</span>
            <ChevronRight className={`h-5 w-5 transition-transform ${showFullContent ? 'rotate-90' : ''}`} />
          </Button>
        </div>
        
        {/* App info sections (visible on desktop or when toggled on mobile) */}
        <div className={`${!showFullContent && 'hidden md:block'}`}>
          <PassageirosSection />
          <TestimonialsSection />
          <DownloadSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Passageiro;
