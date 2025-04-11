
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Package, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookingFormProps {
  deliveryType: 'standard' | 'scheduled';
  setDeliveryType: (type: 'standard' | 'scheduled') => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ deliveryType, setDeliveryType }) => {
  return (
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
  );
};

export default BookingForm;
