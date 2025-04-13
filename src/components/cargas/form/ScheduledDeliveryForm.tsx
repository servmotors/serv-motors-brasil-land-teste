
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from "@/components/ui/form";
import { 
  AddressField, 
  ContactFields, 
  PickupDateField, 
  InfoBox,
  ErrorAlert
} from './fields';
import CargoDetailsSection from './CargoDetailsSection';
import { 
  DeliveryFormValues, 
  ScheduledDeliveryFormValues,
  scheduledDeliverySchema 
} from './types';

const ScheduledDeliveryForm: React.FC = () => {
  const { toast } = useToast();
  const methods = useForm<ScheduledDeliveryFormValues>({
    resolver: zodResolver(scheduledDeliverySchema),
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
    },
    mode: 'onBlur'
  });

  const { control, handleSubmit, formState: { errors, isSubmitting } } = methods;

  const hasFormErrors = Object.keys(errors).length > 0;

  const handleScheduledSubmit = (data: DeliveryFormValues) => {
    console.log('Scheduled delivery data:', data);
    toast({
      title: "Agendamento realizado",
      description: "Sua entrega foi agendada com sucesso."
    });
  };

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(handleScheduledSubmit)} className="space-y-6">
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
        
        <PickupDateField 
          control={control}
          name="pickupDate"
        />
        
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
          Ao agendar uma entrega, você garante que um motorista estará disponível 
          no horário escolhido. Confirmaremos o agendamento por telefone.
        </InfoBox>
        
        <Button 
          type="submit" 
          className="w-full mt-4" 
          size="lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processando..." : "Agendar entrega"}
        </Button>
      </form>
    </Form>
  );
};

export default ScheduledDeliveryForm;
