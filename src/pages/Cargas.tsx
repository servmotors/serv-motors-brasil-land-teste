
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Truck, MapPin, Package, Clock, Calendar, Info, DollarSign, AlertCircle } from 'lucide-react';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useGeolocation } from '@/hooks/useGeolocation';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';

const Cargas: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<'standard' | 'scheduled'>('standard');
  const [vehicleType, setVehicleType] = useState<'motorcycle' | 'car' | 'van'>('motorcycle');
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [packageDescription, setPackageDescription] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  const { currentLocation, getCurrentPosition } = useGeolocation();
  const { 
    googleApiKey, 
    setGoogleApiKey, 
    markers, 
    loadGoogleMapsApi, 
    currentAddress,
    isLoadingAddress
  } = useGoogleMaps();

  // Estimated pricing by vehicle type
  const getPriceEstimate = () => {
    switch(vehicleType) {
      case 'motorcycle':
        return 'R$ 25 - R$ 35';
      case 'car':
        return 'R$ 35 - R$ 50';
      case 'van':
        return 'R$ 70 - R$ 100';
      default:
        return 'R$ 25 - R$ 100';
    }
  };

  // Estimated delivery time by vehicle type
  const getTimeEstimate = () => {
    switch(vehicleType) {
      case 'motorcycle':
        return '15-25 min';
      case 'car':
        return '20-35 min';
      case 'van':
        return '30-45 min';
      default:
        return '15-45 min';
    }
  };

  useEffect(() => {
    if (currentLocation && googleApiKey) {
      loadGoogleMapsApi(currentLocation);
    }
  }, [currentLocation, googleApiKey, loadGoogleMapsApi]);

  useEffect(() => {
    // Try to get current location on mount
    getCurrentPosition();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would implement the actual booking logic
    console.log({
      deliveryType,
      vehicleType,
      pickupAddress,
      deliveryAddress,
      packageDescription,
      scheduledTime: deliveryType === 'scheduled' ? scheduledTime : 'Now'
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-1">
        <div className="bg-primary/5 py-12">
          <div className="container-custom">
            <h1 className="text-3xl font-bold mb-6 text-center md:text-left">Solicitar entrega de carga</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left side - Booking Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-md border-0 overflow-hidden">
                  <CardContent className="p-0">
                    <form onSubmit={handleSubmit}>
                      <Tabs defaultValue="standard" className="w-full">
                        <TabsList className="w-full rounded-none grid grid-cols-2">
                          <TabsTrigger 
                            value="standard" 
                            onClick={() => setDeliveryType('standard')}
                            className="data-[state=active]:bg-primary data-[state=active]:text-black py-3"
                          >
                            <Clock className="w-4 h-4 mr-2" /> Agora
                          </TabsTrigger>
                          <TabsTrigger 
                            value="scheduled" 
                            onClick={() => setDeliveryType('scheduled')}
                            className="data-[state=active]:bg-primary data-[state=active]:text-black py-3"
                          >
                            <Calendar className="w-4 h-4 mr-2" /> Agendada
                          </TabsTrigger>
                        </TabsList>
                        
                        <div className="p-6 space-y-6">
                          {/* Vehicle Type Selection */}
                          <div className="space-y-3">
                            <Label className="font-medium">Tipo de veículo</Label>
                            <div className="grid grid-cols-3 gap-3">
                              <Card 
                                className={`cursor-pointer border hover:border-primary transition-all ${vehicleType === 'motorcycle' ? 'bg-primary/10 border-primary' : ''}`}
                                onClick={() => setVehicleType('motorcycle')}
                              >
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                  <div className="bg-gray-100 p-3 rounded-full mb-2">
                                    <Truck size={24} className="text-gray-600" />
                                  </div>
                                  <span className="text-sm font-medium">Moto</span>
                                  <span className="text-xs text-gray-500">Até 10kg</span>
                                </CardContent>
                              </Card>
                              
                              <Card 
                                className={`cursor-pointer border hover:border-primary transition-all ${vehicleType === 'car' ? 'bg-primary/10 border-primary' : ''}`}
                                onClick={() => setVehicleType('car')}
                              >
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                  <div className="bg-gray-100 p-3 rounded-full mb-2">
                                    <Truck size={24} className="text-gray-600" />
                                  </div>
                                  <span className="text-sm font-medium">Carro</span>
                                  <span className="text-xs text-gray-500">Até 50kg</span>
                                </CardContent>
                              </Card>
                              
                              <Card 
                                className={`cursor-pointer border hover:border-primary transition-all ${vehicleType === 'van' ? 'bg-primary/10 border-primary' : ''}`}
                                onClick={() => setVehicleType('van')}
                              >
                                <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                                  <div className="bg-gray-100 p-3 rounded-full mb-2">
                                    <Truck size={24} className="text-gray-600" />
                                  </div>
                                  <span className="text-sm font-medium">Van</span>
                                  <span className="text-xs text-gray-500">Até 300kg</span>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                          
                          {/* Address Fields */}
                          <div className="space-y-3">
                            <Label className="font-medium">Endereço de coleta</Label>
                            <div className="flex">
                              <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                                <MapPin size={20} className="text-primary" />
                              </div>
                              <Input 
                                placeholder="Digite o endereço de coleta" 
                                className="rounded-l-none"
                                value={pickupAddress}
                                onChange={(e) => setPickupAddress(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Label className="font-medium">Endereço de entrega</Label>
                            <div className="flex">
                              <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                                <MapPin size={20} className="text-primary" />
                              </div>
                              <Input 
                                placeholder="Digite o endereço de entrega" 
                                className="rounded-l-none"
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          <TabsContent value="scheduled" className="mt-0 space-y-3 p-0">
                            <Label className="font-medium">Data e hora de coleta</Label>
                            <div className="flex">
                              <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                                <Calendar size={20} className="text-primary" />
                              </div>
                              <Input 
                                type="datetime-local" 
                                className="rounded-l-none"
                                value={scheduledTime}
                                onChange={(e) => setScheduledTime(e.target.value)}
                              />
                            </div>
                          </TabsContent>
                          
                          <div className="space-y-3">
                            <Label className="font-medium">Descrição da carga</Label>
                            <div className="flex">
                              <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                                <Package size={20} className="text-primary" />
                              </div>
                              <Textarea 
                                placeholder="Descreva o tipo e tamanho da carga" 
                                className="rounded-l-none min-h-[80px]"
                                value={packageDescription}
                                onChange={(e) => setPackageDescription(e.target.value)}
                              />
                            </div>
                          </div>
                          
                          {/* Price and Time Estimates */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                            <Card className="bg-gray-50 border-0">
                              <CardContent className="p-4 flex items-center space-x-3">
                                <DollarSign className="text-primary h-8 w-8" />
                                <div>
                                  <p className="text-sm text-gray-500">Estimativa de preço</p>
                                  <p className="text-lg font-bold">{getPriceEstimate()}</p>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card className="bg-gray-50 border-0">
                              <CardContent className="p-4 flex items-center space-x-3">
                                <Clock className="text-primary h-8 w-8" />
                                <div>
                                  <p className="text-sm text-gray-500">Tempo de entrega</p>
                                  <p className="text-lg font-bold">{getTimeEstimate()}</p>
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <Button className="w-full bg-primary hover:bg-primary/90 text-black mt-4" size="lg">
                            Solicitar entrega agora
                          </Button>
                          
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            <span>O pagamento é realizado diretamente ao motorista</span>
                          </div>
                        </div>
                      </Tabs>
                    </form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Right side - Map */}
              <div className="lg:col-span-1 space-y-6">
                {!googleApiKey ? (
                  <Card className="border-0 shadow-md h-[400px]">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <GoogleApiKeyForm 
                        googleApiKey={googleApiKey} 
                        setGoogleApiKey={setGoogleApiKey} 
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="overflow-hidden border-0 shadow-md">
                    <CardContent className="p-0">
                      <GoogleMapDisplay 
                        className="h-[400px]" 
                        center={currentLocation || undefined}
                        markers={markers}
                        zoom={14}
                      />
                    </CardContent>
                  </Card>
                )}
                
                <Card className="border-0 shadow-md bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="text-primary h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-semibold mb-1">Como funciona</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-black font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
                            <span>Preencha o formulário com os endereços e detalhes</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-black font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
                            <span>Um motorista próximo aceitará sua solicitação</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-black font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
                            <span>Acompanhe a entrega em tempo real no mapa</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-primary/20 text-black font-medium rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">4</span>
                            <span>Pague diretamente ao motorista na entrega</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cargas;
