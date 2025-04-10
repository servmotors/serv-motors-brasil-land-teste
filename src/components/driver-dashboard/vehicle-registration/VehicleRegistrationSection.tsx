
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import VehicleForm from './VehicleForm';

const VehicleRegistrationSection = () => {
  const { driverProfile } = useAuth();

  // Check if vehicle is already registered
  // Add a type assertion to handle the missing transport_type property
  const isVehicleRegistered = driverProfile && 
    driverProfile.vehicle_make && 
    driverProfile.vehicle_model && 
    driverProfile.vehicle_plate &&
    (driverProfile as any).transport_type;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl font-bold">Cadastro de Veículo</CardTitle>
        {isVehicleRegistered && (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        )}
      </CardHeader>
      <CardContent>
        <p className="text-gray-500 mb-4">
          Preencha as informações sobre seu veículo para começar a aceitar corridas.
        </p>
        <VehicleForm />
      </CardContent>
    </Card>
  );
};

export default VehicleRegistrationSection;
