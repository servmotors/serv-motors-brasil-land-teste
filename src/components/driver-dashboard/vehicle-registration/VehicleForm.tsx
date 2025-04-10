
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { PlateVerifier } from './PlateVerifier';
import { useVehicleLicensePlate } from '@/hooks/useVehicleLicensePlate';
import TransportTypeSelector from './TransportTypeSelector';

// Define the form schema for vehicle registration
const vehicleFormSchema = z.object({
  make: z.string().min(2, "Marca deve ter pelo menos 2 caracteres"),
  model: z.string().min(2, "Modelo deve ter pelo menos 2 caracteres"),
  year: z.coerce.number().min(1990, "Ano deve ser após 1990").max(new Date().getFullYear() + 1, "Ano não pode ser no futuro"),
  plate: z.string()
    .min(7, "Placa deve ter no mínimo 7 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres")
    .regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa deve estar no formato ABC1234 ou ABC1D23"),
  transportType: z.string().min(1, "Selecione um tipo de transporte")
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const VehicleForm = () => {
  const { toast } = useToast();
  const { user, driverProfile, refreshDriverProfile } = useAuth();
  
  // Initialize form with existing values if available
  const form = useForm<VehicleFormValues>({
    resolver: zodResolver(vehicleFormSchema),
    defaultValues: {
      make: driverProfile?.vehicle_make || '',
      model: driverProfile?.vehicle_model || '',
      year: driverProfile?.vehicle_year || undefined,
      plate: driverProfile?.vehicle_plate || '',
      // Handle the case where transport_type might not exist in driverProfile
      transportType: driverProfile?.transport_type as string || ''
    },
  });

  const { isSubmitting, isDirty } = form.formState;
  
  const {
    isVerifyingPlate,
    plateVerified,
    plateVerificationError,
    watchedPlate,
    verifyLicensePlate,
    resetVerification
  } = useVehicleLicensePlate({
    form,
    makePath: 'make',
    modelPath: 'model',
    yearPath: 'year',
    platePath: 'plate'
  });

  // Reset verification when plate is changed
  useEffect(() => {
    resetVerification();
  }, [watchedPlate, resetVerification]);

  const onSubmit = async (data: VehicleFormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para cadastrar um veículo",
        variant: "destructive"
      });
      return;
    }

    try {
      // Normalize the license plate to uppercase
      const formattedPlate = data.plate.toUpperCase();
      
      // Update the driver profile with vehicle information
      const { error } = await supabase
        .from('drivers')
        .update({
          vehicle_make: data.make,
          vehicle_model: data.model,
          vehicle_year: data.year,
          vehicle_plate: formattedPlate,
          transport_type: data.transportType,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      
      // Update local state
      if (refreshDriverProfile) {
        await refreshDriverProfile();
      }
      
      toast({
        title: "Veículo cadastrado",
        description: "Informações do veículo salvas com sucesso",
      });
      
      // Reset verification status
      resetVerification();
    } catch (error) {
      console.error('Error saving vehicle information:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as informações do veículo",
        variant: "destructive"
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <TransportTypeSelector 
          control={form.control}
          name="transportType"
          error={form.formState.errors.transportType?.message}
        />

        <FormField
          control={form.control}
          name="plate"
          render={({ field }) => (
            <PlateVerifier
              control={form.control}
              name="plate"
              isVerifyingPlate={isVerifyingPlate}
              plateVerified={plateVerified}
              plateVerificationError={plateVerificationError}
              onVerifyPlate={verifyLicensePlate}
              watchedPlate={watchedPlate as string}
            />
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="make"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Toyota" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="model"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Corolla" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ano</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Ex: 2020" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Informações'}
        </Button>
      </form>
    </Form>
  );
};

export default VehicleForm;
