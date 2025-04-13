
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { 
  AddressField, 
  ContactFields, 
  PickupDateField, 
  InfoBox 
} from './FormFields';
import CargoDetailsSection from './CargoDetailsSection';
import { DeliveryFormValues } from './types';

const ScheduledDeliveryForm: React.FC = () => {
  const { toast } = useToast();
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

  const handleScheduledSubmit = (data: DeliveryFormValues) => {
    console.log('Scheduled delivery data:', data);
    toast({
      title: "Agendamento realizado",
      description: "Sua entrega foi agendada com sucesso."
    });
  };

  return (
    <form onSubmit={scheduledForm.handleSubmit(handleScheduledSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressField 
          label="Endereço de coleta"
          placeholder="Digite o endereço de coleta"
          register={(options) => scheduledForm.register('pickupAddress', options)}
        />
        
        <AddressField 
          label="Endereço de entrega"
          placeholder="Digite o endereço de entrega"
          register={(options) => scheduledForm.register('deliveryAddress', options)}
        />
      </div>
      
      <PickupDateField 
        register={(options) => scheduledForm.register('pickupDate', options)}
      />
      
      <CargoDetailsSection
        cargoDescriptionRegister={(options) => scheduledForm.register('cargoDescription', options)}
        quantityRegister={(options) => scheduledForm.register('quantity', options)}
        weightRegister={(options) => scheduledForm.register('weight', options)}
        heightRegister={(options) => scheduledForm.register('height', options)}
        widthRegister={(options) => scheduledForm.register('width', options)}
        lengthRegister={(options) => scheduledForm.register('length', options)}
      />

      <ContactFields 
        nameRegister={scheduledForm.register('contactName')}
        phoneRegister={scheduledForm.register('contactPhone')}
      />
      
      <InfoBox>
        Ao agendar uma entrega, você garante que um motorista estará disponível 
        no horário escolhido. Confirmaremos o agendamento por telefone.
      </InfoBox>
      
      <Button type="submit" className="w-full mt-4" size="lg">
        Agendar entrega
      </Button>
    </form>
  );
};

export default ScheduledDeliveryForm;
