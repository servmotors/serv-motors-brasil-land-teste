
import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  Form, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { 
  DollarSign, 
  Plus, 
  Save, 
  Clock, 
  PercentSquare 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type PricingType = 'perMinute' | 'percentage';

interface RidePricingFormValues {
  minRidePrice: string;
  pricePerKm: string;
  additionalKmPrice: string;
  additionalStopPrice: string;
  additionalStopPricingType: PricingType;
}

const AdminRides = () => {
  const { toast } = useToast();
  const [pricingData, setPricingData] = useState<RidePricingFormValues>({
    minRidePrice: '15.00',
    pricePerKm: '2.50',
    additionalKmPrice: '3.00',
    additionalStopPrice: '2.00',
    additionalStopPricingType: 'perMinute'
  });
  
  const form = useForm<RidePricingFormValues>({
    defaultValues: pricingData
  });

  const onSubmit = (data: RidePricingFormValues) => {
    setPricingData(data);
    // Here we would save to the database in a real implementation
    toast({
      title: "Valores atualizados",
      description: "Os preços das corridas foram atualizados com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Tabela de Preços de Corridas</h3>
        <Button variant="outline" onClick={() => form.handleSubmit(onSubmit)()}>
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="bg-white rounded-md shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Tipo de Cobrança</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="w-[300px]">Descrição</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Valor Mínimo
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="minRidePrice"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                              <Input {...field} className="pl-8" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    Valor mínimo cobrado por corridas de até 3km
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-2 text-primary" />
                      Valor por Km
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="pricePerKm"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                              <Input {...field} className="pl-8" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    Valor cobrado por quilômetro percorrido
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Plus className="h-4 w-4 mr-2 text-primary" />
                      Km Adicional
                    </div>
                  </TableCell>
                  <TableCell>
                    <FormField
                      control={form.control}
                      name="additionalKmPrice"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormControl>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                              <Input {...field} className="pl-8" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    Valor por quilômetro excedente ao estimado inicialmente
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary" />
                      Parada Adicional
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2 items-center">
                      <FormField
                        control={form.control}
                        name="additionalStopPrice"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                                  {form.watch('additionalStopPricingType') === 'percentage' ? '%' : 'R$'}
                                </span>
                                <Input {...field} className="pl-8" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="flex space-x-1">
                        <Button
                          type="button"
                          size="sm"
                          variant={form.watch('additionalStopPricingType') === 'perMinute' ? 'default' : 'outline'}
                          onClick={() => form.setValue('additionalStopPricingType', 'perMinute')}
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Por minuto
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant={form.watch('additionalStopPricingType') === 'percentage' ? 'default' : 'outline'}
                          onClick={() => form.setValue('additionalStopPricingType', 'percentage')}
                        >
                          <PercentSquare className="h-4 w-4 mr-1" />
                          Percentual
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">
                    {form.watch('additionalStopPricingType') === 'perMinute' 
                      ? 'Valor por minuto em paradas solicitadas pelo passageiro' 
                      : 'Percentual do valor da corrida para paradas solicitadas'}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Informações sobre Preços de Corridas</h4>
            <p className="text-sm text-gray-600">
              Os valores configurados aqui serão utilizados para calcular o preço das corridas solicitadas pelos passageiros.
              O sistema escolherá o valor mais adequado considerando distância, horário e condições de trânsito.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminRides;
