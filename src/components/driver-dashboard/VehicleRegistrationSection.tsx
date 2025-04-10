
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Car, CheckCircle2 } from 'lucide-react';

// Define the form schema for vehicle registration
const vehicleFormSchema = z.object({
  make: z.string().min(2, "Marca deve ter pelo menos 2 caracteres"),
  model: z.string().min(2, "Modelo deve ter pelo menos 2 caracteres"),
  year: z.coerce.number().min(1990, "Ano deve ser após 1990").max(new Date().getFullYear() + 1, "Ano não pode ser no futuro"),
  plate: z.string()
    .min(7, "Placa deve ter no mínimo 7 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres")
    .regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa deve estar no formato ABC1234 ou ABC1D23")
});

type VehicleFormValues = z.infer<typeof vehicleFormSchema>;

const VehicleRegistrationSection = () => {
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
    },
  });

  const { isSubmitting, isDirty } = form.formState;

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
    } catch (error) {
      console.error('Error saving vehicle information:', error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as informações do veículo",
        variant: "destructive"
      });
    }
  };

  // Check if vehicle is already registered
  const isVehicleRegistered = driverProfile && 
    driverProfile.vehicle_make && 
    driverProfile.vehicle_model && 
    driverProfile.vehicle_plate;

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <FormField
              control={form.control}
              name="plate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Placa</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: ABC1234" 
                      {...field} 
                      onChange={(e) => {
                        // Convert to uppercase as user types
                        field.onChange(e.target.value.toUpperCase());
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Formato: ABC1234 ou ABC1D23 (Mercosul)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting || !isDirty}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Informações'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default VehicleRegistrationSection;
