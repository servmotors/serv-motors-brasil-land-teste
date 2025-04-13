
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import { 
  AddressField, 
  ContactFields, 
  InfoBox,
  ErrorAlert
} from './FormFields';
import CargoDetailsSection from './CargoDetailsSection';
import { 
  DeliveryFormValues, 
  StandardDeliveryFormValues,
  standardDeliverySchema 
} from './types';

const StandardDeliveryForm: React.FC = () => {
  const { toast } = useToast();
  const methods = useForm<StandardDeliveryFormValues>({
    resolver: zodResolver(standardDeliverySchema),
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
    },
    mode: 'onBlur'
  });

  const { control, handleSubmit, formState: { errors, isSubmitting } } = methods;

  const hasFormErrors = Object.keys(errors).length > 0;

  const handleStandardSubmit = (data: DeliveryFormValues) => {
    console.log('Standard delivery data:', data);
    toast({
      title: "Solicitação enviada",
      description: "Buscando motoristas disponíveis para sua entrega."
    });
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleStandardSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AddressField 
            label="Endereço de coleta"
            placeholder="Digite o endereço de coleta"
            control={control}
            name="pickupAddress"
          />
          
          <AddressField 
            label="Endereço de entrega"
            placeholder="Digite o endereço de entrega"
            control={control}
            name="deliveryAddress"
          />
        </div>
        
        <CargoDetailsSection
          control={control}
        />

        <ContactFields 
          control={control}
        />
        
        {hasFormErrors && (
          <ErrorAlert message="Por favor, corrija os erros no formulário antes de enviar." />
        )}
        
        <InfoBox>
          Motoristas mais próximos serão notificados sobre sua solicitação. 
          O valor da entrega será calculado com base nas dimensões e distância.
        </InfoBox>
        
        <Button 
          type="submit" 
          className="w-full mt-4" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Buscar motoristas disponíveis"}
        </Button>
      </form>
    </Form>
  );
};

export default StandardDeliveryForm;
