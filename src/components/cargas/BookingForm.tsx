
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StandardDeliveryForm from './form/StandardDeliveryForm';
import ScheduledDeliveryForm from './form/ScheduledDeliveryForm';

interface BookingFormProps {
  deliveryType: 'standard' | 'scheduled';
  setDeliveryType: (type: 'standard' | 'scheduled') => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ deliveryType, setDeliveryType }) => {
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
              <StandardDeliveryForm />
            </TabsContent>
            
            <TabsContent value="scheduled">
              <ScheduledDeliveryForm />
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
