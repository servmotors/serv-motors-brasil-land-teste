
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from 'lucide-react';

const BookingTabs: React.FC = () => {
  return (
    <Tabs defaultValue="ride" className="mb-6">
      <TabsList className="w-full">
        <TabsTrigger value="ride" className="flex-1">Viagem</TabsTrigger>
        <TabsTrigger value="reserve" className="flex-1">Reserva</TabsTrigger>
      </TabsList>
      
      <TabsContent value="ride" className="mt-4">
        {/* Ride content is rendered in the parent component */}
      </TabsContent>
      
      <TabsContent value="reserve" className="mt-4">
        <div className="space-y-4 flex items-center">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <span>Agendar para mais tarde</span>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Reserve uma viagem com antecedência para garantir seu deslocamento.
        </p>
      </TabsContent>
    </Tabs>
  );
};

export default BookingTabs;
