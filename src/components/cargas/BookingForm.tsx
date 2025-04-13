
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Package, Calendar, Layers, Ruler, Scale } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface BookingFormProps {
  deliveryType: 'standard' | 'scheduled';
  setDeliveryType: (type: 'standard' | 'scheduled') => void;
}

interface DeliveryFormValues {
  pickupAddress: string;
  deliveryAddress: string;
  cargoDescription: string;
  quantity: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  pickupDate?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ deliveryType, setDeliveryType }) => {
  const standardForm = useForm<DeliveryFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      cargoDescription: '',
      quantity: 1,
      height: 0,
      width: 0,
      length: 0,
      weight: 0
    }
  });

  const scheduledForm = useForm<DeliveryFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      cargoDescription: '',
      quantity: 1,
      height: 0,
      width: 0,
      length: 0,
      weight: 0,
      pickupDate: ''
    }
  });

  const handleStandardSubmit = (data: DeliveryFormValues) => {
    console.log('Standard delivery data:', data);
  };

  const handleScheduledSubmit = (data: DeliveryFormValues) => {
    console.log('Scheduled delivery data:', data);
  };

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
            <form onSubmit={standardForm.handleSubmit(handleStandardSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço de coleta</label>
                <div className="flex">
                  <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <Input 
                    placeholder="Digite o endereço de coleta" 
                    className="rounded-l-none"
                    {...standardForm.register('pickupAddress')}
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
                    {...standardForm.register('deliveryAddress')}
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
                    {...standardForm.register('cargoDescription')}
                  />
                </div>
              </div>

              {/* Novos campos adicionados */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantidade de volumes</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Layers size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      className="rounded-l-none"
                      {...standardForm.register('quantity', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Peso total (kg)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Scale size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Peso em kg"
                      className="rounded-l-none"
                      {...standardForm.register('weight', { 
                        valueAsNumber: true,
                        min: 0.1
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Altura (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Altura"
                      className="rounded-l-none"
                      {...standardForm.register('height', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Largura (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary rotate-90" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Largura"
                      className="rounded-l-none"
                      {...standardForm.register('width', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Comprimento (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary -rotate-45" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Comprimento"
                      className="rounded-l-none"
                      {...standardForm.register('length', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" size="lg">
                Buscar motoristas disponíveis
              </Button>
            </form>
          </TabsContent>
          
          <TabsContent value="scheduled">
            <form onSubmit={scheduledForm.handleSubmit(handleScheduledSubmit)} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Endereço de coleta</label>
                <div className="flex">
                  <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <Input 
                    placeholder="Digite o endereço de coleta" 
                    className="rounded-l-none"
                    {...scheduledForm.register('pickupAddress')}
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
                    {...scheduledForm.register('deliveryAddress')}
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
                    {...scheduledForm.register('pickupDate')}
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
                    {...scheduledForm.register('cargoDescription')}
                  />
                </div>
              </div>

              {/* Novos campos adicionados */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantidade de volumes</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Layers size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Quantidade"
                      className="rounded-l-none"
                      {...scheduledForm.register('quantity', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Peso total (kg)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Scale size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      step="0.1"
                      min="0.1"
                      placeholder="Peso em kg"
                      className="rounded-l-none"
                      {...scheduledForm.register('weight', { 
                        valueAsNumber: true,
                        min: 0.1
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Altura (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Altura"
                      className="rounded-l-none"
                      {...scheduledForm.register('height', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Largura (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary rotate-90" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Largura"
                      className="rounded-l-none"
                      {...scheduledForm.register('width', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Comprimento (cm)</label>
                  <div className="flex">
                    <div className="bg-primary/10 p-2 flex items-center justify-center rounded-l-md">
                      <Ruler size={20} className="text-primary -rotate-45" />
                    </div>
                    <Input 
                      type="number"
                      min="1"
                      placeholder="Comprimento"
                      className="rounded-l-none"
                      {...scheduledForm.register('length', { 
                        valueAsNumber: true,
                        min: 1
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 mt-4" size="lg">
                Buscar motoristas disponíveis
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
