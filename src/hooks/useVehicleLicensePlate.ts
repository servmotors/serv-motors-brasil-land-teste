
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { UseFormReturn } from 'react-hook-form';

interface UseLicensePlateVerificationProps<T> {
  form: UseFormReturn<T>;
  makePath: keyof T;
  modelPath: keyof T;
  yearPath: keyof T;
  platePath: keyof T;
}

export function useVehicleLicensePlate<T>({
  form,
  makePath,
  modelPath,
  yearPath,
  platePath
}: UseLicensePlateVerificationProps<T>) {
  const { toast } = useToast();
  const [isVerifyingPlate, setIsVerifyingPlate] = useState(false);
  const [plateVerified, setPlateVerified] = useState(false);
  const [plateVerificationError, setPlateVerificationError] = useState<string | null>(null);
  
  const watchedPlate = form.watch(platePath as any);

  const verifyLicensePlate = async () => {
    const plate = form.getValues(platePath as any);
    
    // Validate the plate format first
    if (!/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/.test(plate)) {
      setPlateVerificationError("Formato de placa inválido");
      setPlateVerified(false);
      return;
    }

    setIsVerifyingPlate(true);
    setPlateVerificationError(null);
    
    try {
      // Call our Supabase edge function
      const { data, error } = await supabase.functions.invoke('check-plate', {
        body: { plate },
      });

      if (error) {
        console.error('Error verifying plate:', error);
        setPlateVerificationError("Erro ao verificar a placa");
        setPlateVerified(false);
        return;
      }

      if (data.error) {
        setPlateVerificationError(data.error);
        setPlateVerified(false);
        return;
      }

      // If we have vehicle data, auto-fill the form fields
      if (data.success && data.data) {
        const vehicleData = data.data;
        
        // Auto-fill the form with data from the API
        form.setValue(makePath as any, vehicleData.marca || form.getValues(makePath as any), { shouldDirty: true });
        form.setValue(modelPath as any, vehicleData.modelo || form.getValues(modelPath as any), { shouldDirty: true });
        
        if (vehicleData.ano) {
          form.setValue(yearPath as any, parseInt(vehicleData.ano) || form.getValues(yearPath as any), { shouldDirty: true });
        }
        
        toast({
          title: "Placa verificada",
          description: "Informações do veículo preenchidas automaticamente",
        });
        
        setPlateVerified(true);
      }
    } catch (error) {
      console.error('Error verifying plate:', error);
      setPlateVerificationError("Erro ao conectar com o serviço de verificação de placas");
      setPlateVerified(false);
    } finally {
      setIsVerifyingPlate(false);
    }
  };

  const resetVerification = () => {
    setPlateVerified(false);
    setPlateVerificationError(null);
  };

  return {
    isVerifyingPlate,
    plateVerified,
    plateVerificationError,
    watchedPlate,
    verifyLicensePlate,
    resetVerification
  };
}
