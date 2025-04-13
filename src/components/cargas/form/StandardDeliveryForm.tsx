
import React from 'react';
import { Button } from "@/components/ui/button";
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/use-toast';
import { 
  AddressField, 
  ContactFields, 
  InfoBox 
} from './FormFields';
import CargoDetailsSection from './CargoDetailsSection';
import { DeliveryFormValues } from './types';

const StandardDeliveryForm: React.FC = () => {
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

  const handleStandardSubmit = (data: DeliveryFormValues) => {
    console.log('Standard delivery data:', data);
    toast({
      title: "Solicitação enviada",
      description: "Buscando motoristas disponíveis para sua entrega."
    });
  };

  return (
    <form onSubmit={standardForm.handleSubmit(handleStandardSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddressField 
          label="Endereço de coleta"
          placeholder="Digite o endereço de coleta"
          register={(options) => standardForm.register('pickupAddress', options)}
        />
        
        <AddressField 
          label="Endereço de entrega"
          placeholder="Digite o endereço de entrega"
          register={(options) => standardForm.register('deliveryAddress', options)}
        />
      </div>
      
      <CargoDetailsSection
        cargoDescriptionRegister={(options) => standardForm.register('cargoDescription', options)}
        quantityRegister={(options) => standardForm.register('quantity', options)}
        weightRegister={(options) => standardForm.register('weight', options)}
        heightRegister={(options) => standardForm.register('height', options)}
        widthRegister={(options) => standardForm.register('width', options)}
        lengthRegister={(options) => standardForm.register('length', options)}
      />

      <ContactFields 
        nameRegister={standardForm.register('contactName')}
        phoneRegister={standardForm.register('contactPhone')}
      />
      
      <InfoBox>
        Motoristas mais próximos serão notificados sobre sua solicitação. 
        O valor da entrega será calculado com base nas dimensões e distância.
      </InfoBox>
      
      <Button type="submit" className="w-full mt-4" size="lg">
        Buscar motoristas disponíveis
      </Button>
    </form>
  );
};

export default StandardDeliveryForm;
