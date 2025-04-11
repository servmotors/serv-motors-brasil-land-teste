
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import TaxAndFeeSettings from './TaxAndFeeSettings';
import VehicleTypeSelector from './VehicleTypeSelector';

type VehicleType = 'car' | 'motorcycle';

interface RidePricingFormValues {
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
      // Tax and fees defaults
      taxRate: '7.5',
      paymentPartnerFee: '0.80'
    }
  });

  const onSubmit = (data: RidePricingFormValues) => {
    // Here we would save to the database in a real implementation
    console.log('Form data to save:', data);
    
    toast({
      title: "Valores atualizados",
      description: "As configurações de impostos e taxas foram atualizadas com sucesso!",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Configurações de Impostos e Taxas</h3>
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
          
          <TaxAndFeeSettings control={form.control} />

          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Informações sobre Taxas e Impostos</h4>
            <p className="text-sm text-gray-600">
              Os valores configurados aqui serão utilizados para calcular os impostos e taxas aplicados às corridas.
              O sistema utilizará estas configurações para todas as corridas, independentemente do tipo de veículo.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminRides;
