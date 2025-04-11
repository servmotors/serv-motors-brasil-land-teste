
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Truck, MapPin, Package, Clock, Calendar, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useGeolocation } from '@/hooks/useGeolocation';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';

const Cargas: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<'standard' | 'scheduled'>('standard');
  const { currentLocation, getCurrentPosition } = useGeolocation();
  const { 
    googleApiKey, 
    setGoogleApiKey, 
    markers, 
    loadGoogleMapsApi, 
    currentAddress,
    isLoadingAddress
  } = useGoogleMaps();

  useEffect(() => {
    if (currentLocation && googleApiKey) {
      loadGoogleMapsApi(currentLocation);
    }
  }, [currentLocation, googleApiKey, loadGoogleMapsApi]);

  useEffect(() => {
    // Try to get current location on mount
    getCurrentPosition();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary/5 to-primary/10 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left side - Booking Form */}
              <Card className="lg:col-span-2 shadow-lg border-0">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Solicitar entrega</h2>
                  
                  <Tabs defaultValue="standard" className="mb-6">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger 
                        value="standard" 
                        onClick={() => setDeliveryType('standard')}
                      >
                        Agora
                      </TabsTrigger>
                      <TabsTrigger 
                        value="scheduled" 
                        onClick={() => setDeliveryType('scheduled')}
                      >
                        Agendada
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="standard">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de coleta" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de entrega</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de entrega" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Descrição da carga</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Package size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Tipo e tamanho da carga" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="scheduled">
                      <div className="space-y-5">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de coleta" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Endereço de entrega</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <MapPin size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Digite o endereço de entrega" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Data e hora de coleta</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Calendar size={20} className="text-primary" />
                            </div>
                            <Input 
                              type="datetime-local" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Descrição da carga</label>
                          <div className="flex">
                            <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                              <Package size={20} className="text-primary" />
                            </div>
                            <Input 
                              placeholder="Tipo e tamanho da carga" 
                              className="rounded-l-none"
                            />
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                  
                  <Button className="w-full bg-primary hover:bg-primary/90 mt-4" size="lg">
                    Buscar motoristas disponíveis
                  </Button>
                </CardContent>
              </Card>
              
              {/* Right side - Map */}
              <div className="lg:col-span-3">
                {!googleApiKey ? (
                  <Card className="border-0 shadow-lg h-full">
                    <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                      <GoogleApiKeyForm 
                        googleApiKey={googleApiKey} 
                        setGoogleApiKey={setGoogleApiKey} 
                      />
                    </CardContent>
                  </Card>
                ) : (
                  <GoogleMapDisplay 
                    className="h-[400px] mb-6 rounded-lg shadow-lg" 
                    center={currentLocation || undefined}
                    markers={markers}
                    zoom={14}
                  />
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Clock className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Rápido & Pontual</h3>
                      <p className="text-sm text-gray-600">Entregas no mesmo dia</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Truck className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Diversos Veículos</h3>
                      <p className="text-sm text-gray-600">Para qualquer tamanho de carga</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-primary/5 border-0">
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <Package className="text-primary h-8 w-8 mb-2" />
                      <h3 className="font-semibold">Carga Segura</h3>
                      <p className="text-sm text-gray-600">Com seguro incluso</p>
                    </CardContent>
                  </Card>
                </div>
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
