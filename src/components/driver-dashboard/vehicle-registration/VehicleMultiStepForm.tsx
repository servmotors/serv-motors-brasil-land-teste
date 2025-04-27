
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Steps, Step } from '@/components/ui/steps';
import Step1VehicleYear from './steps/Step1VehicleYear';
import Step2VehicleImages from './steps/Step2VehicleImages';
import Step3VehiclePlate from './steps/Step3VehiclePlate';
import { useVehicleForm } from './hooks/useVehicleForm';

const VehicleMultiStepForm = () => {
  const { 
    methods, 
    currentStep, 
    vehicleAge, 
    isVehicleTooOld, 
    nextStep, 
    prevStep, 
    onSubmit 
  } = useVehicleForm();

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
          <form onSubmit={onSubmit} className="space-y-8">
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
                  disabled={!methods.formState.isValid || (currentStep === 0 && isVehicleTooOld)}
                >
                  Próximo
                </Button>
              ) : (
                <Button type="submit" disabled={!methods.formState.isValid}>
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

