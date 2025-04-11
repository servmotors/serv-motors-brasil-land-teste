
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import PricingTable from './PricingTable';
import TaxAndFeeSettings from './TaxAndFeeSettings';
import VehicleTypeSelector from './VehicleTypeSelector';

type PricingType = 'perMinute' | 'percentage';
type VehicleType = 'car' | 'motorcycle';

interface RidePricingFormValues {
  // Car pricing
  carMinRidePrice: string;
  carPricePerKm: string;
  carAdditionalKmPrice: string;
  carAdditionalStopPrice: string;
  carAdditionalStopPricingType: PricingType;
  
  // Motorcycle pricing
  motorcycleMinRidePrice: string;
  motorcyclePricePerKm: string;
  motorcycleAdditionalKmPrice: string;
  motorcycleAdditionalStopPrice: string;
  motorcycleAdditionalStopPricingType: PricingType;
  
  // Tax and fees
  taxRate: string;
  paymentPartnerFee: string;
}

const AdminRides = () => {
  const { toast } = useToast();
  const [activeVehicleType, setActiveVehicleType] = useState<VehicleType>('car');
  
  // Initialize form with default values
  const form = useForm<RidePricingFormValues>({
    defaultValues: {
      // Car pricing defaults
      carMinRidePrice: '15.00',
      carPricePerKm: '2.50',
      carAdditionalKmPrice: '3.00',
      carAdditionalStopPrice: '2.00',
      carAdditionalStopPricingType: 'perMinute',
      
      // Motorcycle pricing defaults
      motorcycleMinRidePrice: '10.00',
      motorcyclePricePerKm: '1.80',
      motorcycleAdditionalKmPrice: '2.20',
      motorcycleAdditionalStopPrice: '1.50',
      motorcycleAdditionalStopPricingType: 'perMinute',
      
      // Tax and fees defaults
      taxRate: '7.5',
      paymentPartnerFee: '0.80'
    }
  });

  const handleStopPricingTypeChange = (type: PricingType) => {
    if (activeVehicleType === 'car') {
      form.setValue('carAdditionalStopPricingType', type);
    } else {
      form.setValue('motorcycleAdditionalStopPricingType', type);
    }
  };

  const handleDeletePrice = (priceId: string) => {
    form.setValue(priceId as any, '0.00');
    toast({
      title: "Valor removido",
      description: `O valor para ${priceId} foi removido do sistema.`,
    });
  };

  const onSubmit = (data: RidePricingFormValues) => {
    // Here we would save to the database in a real implementation
    console.log('Form data to save:', data);
    
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
          <VehicleTypeSelector 
            selectedType={activeVehicleType} 
            onChange={setActiveVehicleType} 
          />
          
          <PricingTable 
            control={form.control}
            vehicleType={activeVehicleType}
            additionalStopPricingType={
              activeVehicleType === 'car' 
                ? form.watch('carAdditionalStopPricingType') 
                : form.watch('motorcycleAdditionalStopPricingType')
            }
            onStopPricingTypeChange={handleStopPricingTypeChange}
            onDeletePrice={handleDeletePrice}
          />
          
          <TaxAndFeeSettings control={form.control} />

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Informações sobre Preços de Corridas</h4>
            <p className="text-sm text-gray-600">
              Os valores configurados aqui serão utilizados para calcular o preço das corridas solicitadas pelos passageiros.
              O sistema escolherá o valor mais adequado considerando distância, horário e condições de trânsito.
              Os valores de imposto e taxa do parceiro de pagamento serão incluídos no cálculo final.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminRides;
