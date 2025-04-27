
import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Loader2, AlertCircle, Search } from 'lucide-react';
import { useVehicleLicensePlate } from '@/hooks/useVehicleLicensePlate';

// Opções de tipos de corridas
const rideTypeOptions = [
  { id: 'passengers', label: 'Passageiros' },
  { id: 'deliveries', label: 'Entregas' },
  { id: 'towing', label: 'Guincho' },
  { id: 'pet', label: 'Pet' },
];

const Step3VehiclePlate = () => {
  const { control, setValue, watch, formState } = useFormContext();
  const [isLoadingPlateInfo, setIsLoadingPlateInfo] = useState(false);
  const [plateError, setPlateError] = useState<string | null>(null);
  const watchedPlate = watch('plate');

  // Buscar informações da placa quando o usuário terminar de digitar
  const handlePlateSearch = async () => {
    if (watchedPlate && watchedPlate.length >= 7) {
      setIsLoadingPlateInfo(true);
      setPlateError(null);
      
      try {
        // Simulando uma chamada de API
        // Na implementação real, você faria uma chamada à API Placas
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulando dados de resposta
        const plateData = {
          status: 'Regular',
          city: 'São Paulo',
          state: 'SP',
          make: 'Toyota',
          model: 'Corolla',
          version: 'XEI 2.0',
          color: 'Preto'
        };
        
        // Preencher os campos com as informações recebidas
        setValue('vehicleStatus', plateData.status);
        setValue('vehicleCity', plateData.city);
        setValue('vehicleState', plateData.state);
        setValue('vehicleMake', plateData.make);
        setValue('vehicleModel', plateData.model);
        setValue('vehicleVersion', plateData.version);
        setValue('vehicleColor', plateData.color);
        
      } catch (error) {
        console.error("Erro ao consultar placa:", error);
        setPlateError("Não foi possível consultar as informações da placa");
      } finally {
        setIsLoadingPlateInfo(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Placa do Veículo</h3>
        
        <div className="flex items-end gap-2">
          <FormField
            control={control}
            name="plate"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Placa</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: ABC1234"
                    maxLength={8}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value.toUpperCase();
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="button" 
            variant="outline" 
            onClick={handlePlateSearch}
            disabled={!watchedPlate || watchedPlate.length < 7 || isLoadingPlateInfo}
          >
            {isLoadingPlateInfo ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Search className="h-4 w-4 mr-2" />
            )}
            Consultar
          </Button>
        </div>
        
        {plateError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erro</AlertTitle>
            <AlertDescription>{plateError}</AlertDescription>
          </Alert>
        )}
      </div>
      
      {/* Campos preenchidos com as informações da placa */}
      {watchedPlate && watchedPlate.length >= 7 && !isLoadingPlateInfo && !plateError && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={control}
            name="vehicleStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Situação do Veículo</FormLabel>
                <FormControl>
                  <Input readOnly {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="vehicleCity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Município</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={control}
              name="vehicleState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UF</FormLabel>
                  <FormControl>
                    <Input readOnly {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={control}
            name="vehicleMake"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="vehicleModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Modelo</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="vehicleVersion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Versão</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={control}
            name="vehicleColor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Tipos de Corridas</h3>
        <p className="text-sm text-gray-500">Selecione os tipos de corridas que você deseja realizar:</p>
        
        <FormField
          control={control}
          name="rideTypes"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 gap-4">
                {rideTypeOptions.map((option) => (
                  <FormField
                    key={option.id}
                    control={control}
                    name="rideTypes"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={option.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(option.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, option.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== option.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default Step3VehiclePlate;
