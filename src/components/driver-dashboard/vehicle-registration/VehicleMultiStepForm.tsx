
import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, useFormContext } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Steps, Step } from '@/components/ui/steps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import Step1VehicleYear from './steps/Step1VehicleYear';
import Step2VehicleImages from './steps/Step2VehicleImages';
import Step3VehiclePlate from './steps/Step3VehiclePlate';
import { format } from 'date-fns';

// Definir o esquema para cada passo
const step1Schema = z.object({
  vehicleYear: z.coerce
    .number()
    .min(1990, "Ano deve ser após 1990")
    .max(new Date().getFullYear() + 1, "Ano não pode ser no futuro"),
});

const step2Schema = z.object({
  frontImage: z.instanceof(File, { message: "Foto frontal do veículo é obrigatória" }),
  diagonalImage: z.instanceof(File, { message: "Foto diagonal do veículo é obrigatória" }),
  backImage: z.instanceof(File, { message: "Foto traseira do veículo é obrigatória" }),
  renavam: z.string().length(11, "Renavam deve ter 11 dígitos").regex(/^\d+$/, "Renavam deve conter apenas números"),
  plateImage: z.instanceof(File, { message: "Foto da placa é obrigatória" }),
  crlvDocument: z.instanceof(File, { message: "CRLV do veículo é obrigatório" }),
  crlvYear: z.coerce
    .number()
    .min(2020, "Ano do CRLV deve ser 2020 ou posterior")
    .max(new Date().getFullYear() + 1, "Ano do CRLV não pode ser no futuro"),
  crlvExpirationDate: z.date({
    required_error: "Data de vencimento do CRLV é obrigatória",
  }),
});

const step3Schema = z.object({
  plate: z
    .string()
    .min(7, "Placa deve ter no mínimo 7 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres")
    .regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa deve estar no formato ABC1234 ou ABC1D23"),
  vehicleStatus: z.string().optional(),
  vehicleCity: z.string().optional(),
  vehicleState: z.string().optional(),
  vehicleMake: z.string().min(1, "Marca do veículo é obrigatória"),
  vehicleModel: z.string().min(1, "Modelo do veículo é obrigatório"),
  vehicleVersion: z.string().optional(),
  vehicleColor: z.string().optional(),
  rideTypes: z.array(z.string()).min(1, "Selecione pelo menos um tipo de corrida"),
});

// Esquema completo combinando todos os passos
const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);

type FormValues = z.infer<typeof formSchema>;

const VehicleMultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const { user, driverProfile, refreshDriverProfile } = useAuth();
  const [isVehicleTooOld, setIsVehicleTooOld] = useState(false);
  const [vehicleAge, setVehicleAge] = useState(0);
  
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

  const { handleSubmit, trigger, watch, formState: { isValid } } = methods;
  const watchVehicleYear = watch("vehicleYear");
  
  // Calcular a idade do veículo quando o ano muda
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
          variant: "warning"
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
      // Aqui seria o local para fazer o upload das imagens para o storage
      // e então salvar os dados do veículo no banco de dados
      
      // Exemplo de atualização do perfil do motorista
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
      
      // Reset do formulário ou redirecionamento
    } catch (error: any) {
      console.error("Erro ao cadastrar veículo:", error);
      toast({
        title: "Erro ao cadastrar",
        description: error.message || "Não foi possível cadastrar o veículo",
        variant: "destructive"
      });
    }
  };

  // Renderizar o passo atual
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Step1VehicleYear vehicleAge={vehicleAge} isVehicleTooOld={isVehicleTooOld} />;
      case 1:
        return <Step2VehicleImages />;
      case 2:
        return <Step3VehiclePlate />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro de Veículo</CardTitle>
        <CardDescription>
          Preencha os dados do seu veículo para começar a usar a plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <Steps activeStep={currentStep} className="mb-8">
              <Step title="Informações Básicas" />
              <Step title="Documentos" />
              <Step title="Placa e Tipo de Serviço" />
            </Steps>
            
            {renderStep()}
            
            <div className="flex justify-between pt-4">
              {currentStep > 0 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              )}
              
              {currentStep < 2 ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!isValid || (currentStep === 0 && isVehicleTooOld)}
                >
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={!isValid}>
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
};

export default VehicleMultiStepForm;
