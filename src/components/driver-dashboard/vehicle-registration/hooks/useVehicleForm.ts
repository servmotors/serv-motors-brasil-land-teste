
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  formSchema, 
  step1Schema, 
  step2Schema, 
  step3Schema,
  FormValues 
} from '../schemas/vehicleFormSchemas';

export const useVehicleForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVehicleTooOld, setIsVehicleTooOld] = useState(false);
  const [vehicleAge, setVehicleAge] = useState(0);
  const { toast } = useToast();
  const { user, refreshDriverProfile } = useAuth();

  const methods = useForm<FormValues>({
    resolver: zodResolver(
      currentStep === 0 ? step1Schema : 
      currentStep === 1 ? step2Schema : 
      step3Schema
    ),
    mode: "onChange",
    defaultValues: {
      vehicleYear: new Date().getFullYear(),
      renavam: "",
      plate: "",
      rideTypes: [],
    }
  });

  const { handleSubmit, trigger, watch } = methods;
  const watchVehicleYear = watch("vehicleYear");

  useEffect(() => {
    if (watchVehicleYear) {
      const currentYear = new Date().getFullYear();
      const age = currentYear - watchVehicleYear;
      setVehicleAge(age);
      setIsVehicleTooOld(age > 15);
      
      if (age > 13 && age <= 15) {
        toast({
          title: "Atenção",
          description: `Seu veículo tem ${age} anos. Ele será bloqueado automaticamente quando completar 15 anos.`,
          variant: "destructive"
        });
      }
    }
  }, [watchVehicleYear, toast]);

  const nextStep = async () => {
    const isStepValid = await trigger();
    if (isStepValid) {
      if (currentStep === 0 && isVehicleTooOld) {
        toast({
          title: "Veículo não permitido",
          description: `Seu veículo tem ${vehicleAge} anos, o que excede o limite de 15 anos permitidos em nossa plataforma.`,
          variant: "destructive"
        });
        return;
      }
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para cadastrar um veículo",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("drivers")
        .update({
          vehicle_make: data.vehicleMake,
          vehicle_model: data.vehicleModel,
          vehicle_year: data.vehicleYear,
          vehicle_plate: data.plate,
          updated_at: new Date().toISOString()
        })
        .eq("user_id", user.id);

      if (error) throw error;
      
      if (refreshDriverProfile) {
        await refreshDriverProfile();
      }
      
      toast({
        title: "Veículo cadastrado",
        description: "Seu veículo foi cadastrado com sucesso!",
      });
    } catch (error: any) {
      console.error("Erro ao cadastrar veículo:", error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Não foi possível cadastrar o veículo",
        variant: "destructive"
      });
    }
  };

  return {
    methods,
    currentStep,
    vehicleAge,
    isVehicleTooOld,
    nextStep,
    prevStep,
    onSubmit: handleSubmit(onSubmit)
  };
};

