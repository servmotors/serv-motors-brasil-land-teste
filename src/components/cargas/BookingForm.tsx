
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Package, Calendar, Layers, Ruler, Scale, Info } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';

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
  contactName?: string;
  contactPhone?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ deliveryType, setDeliveryType }) => {
  const { toast } = useToast();
  const standardForm = useForm<DeliveryFormValues>({
    defaultValues: {
      pickupAddress: '',
      deliveryAddress: '',
      cargoDescription: '',
      quantity: 1,
      height: 0,
      width: 0,
      length: 0,
      weight: 0,
      contactName: '',
      contactPhone: ''
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
      pickupDate: '',
      contactName: '',
      contactPhone: ''
    }
  });

  const handleStandardSubmit = (data: DeliveryFormValues) => {
    console.log('Standard delivery data:', data);
    toast({
      title: "Solicitação enviada",
      description: "Buscando motoristas disponíveis para sua entrega."
    });
  };

  const handleScheduledSubmit = (data: DeliveryFormValues) => {
    console.log('Scheduled delivery data:', data);
    toast({
      title: "Agendamento realizado",
      description: "Sua entrega foi agendada com sucesso."
    });
  };

  return (
    <Card className="lg:col-span-2 shadow-lg border-0 overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-primary p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold">Solicitar entrega</h2>
          <p className="text-sm mt-1 opacity-90">Preencha os dados para solicitar uma entrega</p>
        </div>
        
        <div className="p-6">
          <Tabs defaultValue="standard" className="mb-6">
            <TabsList className="grid grid-cols-2 mb-6 w-full">
              <TabsTrigger 
                value="standard" 
                onClick={() => setDeliveryType('standard')}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Imediata
              </TabsTrigger>
              <TabsTrigger 
                value="scheduled" 
                onClick={() => setDeliveryType('scheduled')}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Agendada
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="standard">
              <form onSubmit={standardForm.handleSubmit(handleStandardSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Endereço de coleta</label>
                  <div className="flex">
                    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                      <MapPin size={20} className="text-primary-foreground" />
                    </div>
                    <Input 
                      placeholder="Digite o endereço de coleta" 
                      className="rounded-l-none"
                      {...standardForm.register('pickupAddress', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Endereço de entrega</label>
                  <div className="flex">
                    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                      <MapPin size={20} className="text-primary-foreground" />
                    </div>
                    <Input 
                      placeholder="Digite o endereço de entrega" 
                      className="rounded-l-none"
                      {...standardForm.register('deliveryAddress', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Descrição da carga</label>
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Package size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        placeholder="Nome da mercadoria" 
                        className="rounded-l-none"
                        {...standardForm.register('cargoDescription', { required: true })}
                      />
                    </div>
                    <Textarea 
                      placeholder="Detalhes adicionais sobre a carga (opcional)" 
                      className="mt-2 h-20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Nome para contato</label>
                    <Input 
                      placeholder="Seu nome"
                      {...standardForm.register('contactName')}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Telefone</label>
                    <Input 
                      placeholder="(00) 00000-0000"
                      {...standardForm.register('contactPhone')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Quantidade de volumes</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Layers size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Quantidade"
                        className="rounded-l-none"
                        {...standardForm.register('quantity', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Peso total (kg)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Scale size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        step="0.1"
                        min="0.1"
                        placeholder="Peso em kg"
                        className="rounded-l-none"
                        {...standardForm.register('weight', { 
                          valueAsNumber: true,
                          min: 0.1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Altura (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Altura"
                        className="rounded-l-none"
                        {...standardForm.register('height', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Largura (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground rotate-90" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Largura"
                        className="rounded-l-none"
                        {...standardForm.register('width', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Comprimento (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground -rotate-45" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Comprimento"
                        className="rounded-l-none"
                        {...standardForm.register('length', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/40 p-3 rounded-md flex items-start mt-4">
                  <Info size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Motoristas mais próximos serão notificados sobre sua solicitação. 
                    O valor da entrega será calculado com base nas dimensões e distância.
                  </p>
                </div>
                
                <Button type="submit" className="w-full mt-4" size="lg">
                  Buscar motoristas disponíveis
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="scheduled">
              <form onSubmit={scheduledForm.handleSubmit(handleScheduledSubmit)} className="space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Endereço de coleta</label>
                  <div className="flex">
                    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                      <MapPin size={20} className="text-primary-foreground" />
                    </div>
                    <Input 
                      placeholder="Digite o endereço de coleta" 
                      className="rounded-l-none"
                      {...scheduledForm.register('pickupAddress', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Endereço de entrega</label>
                  <div className="flex">
                    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                      <MapPin size={20} className="text-primary-foreground" />
                    </div>
                    <Input 
                      placeholder="Digite o endereço de entrega" 
                      className="rounded-l-none"
                      {...scheduledForm.register('deliveryAddress', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Data e hora de coleta</label>
                  <div className="flex">
                    <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                      <Calendar size={20} className="text-primary-foreground" />
                    </div>
                    <Input 
                      type="datetime-local" 
                      className="rounded-l-none"
                      {...scheduledForm.register('pickupDate', { required: true })}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">Descrição da carga</label>
                  <div className="flex flex-col">
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Package size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        placeholder="Nome da mercadoria" 
                        className="rounded-l-none"
                        {...scheduledForm.register('cargoDescription', { required: true })}
                      />
                    </div>
                    <Textarea 
                      placeholder="Detalhes adicionais sobre a carga (opcional)" 
                      className="mt-2 h-20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Nome para contato</label>
                    <Input 
                      placeholder="Seu nome"
                      {...scheduledForm.register('contactName')}
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Telefone</label>
                    <Input 
                      placeholder="(00) 00000-0000"
                      {...scheduledForm.register('contactPhone')}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Quantidade de volumes</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Layers size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Quantidade"
                        className="rounded-l-none"
                        {...scheduledForm.register('quantity', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Peso total (kg)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Scale size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        step="0.1"
                        min="0.1"
                        placeholder="Peso em kg"
                        className="rounded-l-none"
                        {...scheduledForm.register('weight', { 
                          valueAsNumber: true,
                          min: 0.1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium">Altura (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Altura"
                        className="rounded-l-none"
                        {...scheduledForm.register('height', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Largura (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground rotate-90" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Largura"
                        className="rounded-l-none"
                        {...scheduledForm.register('width', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium">Comprimento (cm)</label>
                    <div className="flex">
                      <div className="bg-primary p-2 flex items-center justify-center rounded-l-md">
                        <Ruler size={20} className="text-primary-foreground -rotate-45" />
                      </div>
                      <Input 
                        type="number"
                        min="1"
                        placeholder="Comprimento"
                        className="rounded-l-none"
                        {...scheduledForm.register('length', { 
                          valueAsNumber: true,
                          min: 1,
                          required: true
                        })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-secondary/40 p-3 rounded-md flex items-start mt-4">
                  <Info size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">
                    Ao agendar uma entrega, você garante que um motorista estará disponível 
                    no horário escolhido. Confirmaremos o agendamento por telefone.
                  </p>
                </div>
                
                <Button type="submit" className="w-full mt-4" size="lg">
                  Agendar entrega
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
