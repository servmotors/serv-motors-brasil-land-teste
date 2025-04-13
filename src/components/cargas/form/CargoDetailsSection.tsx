
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { 
  CargoNameField, 
  QuantityField, 
  WeightField, 
  DimensionFields 
} from './fields';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

interface CargoDetailsSectionProps {
  control: any;
}

const CargoDetailsSection: React.FC<CargoDetailsSectionProps> = ({
  control
}) => {
  return (
    <>
      <FormField
        control={control}
        name="cargoDescription"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Descrição da carga</FormLabel>
            <div className="flex flex-col">
              <CargoNameField control={control} name="cargoDescription" />
              <FormControl>
                <Textarea 
                  placeholder="Detalhes adicionais sobre a carga (opcional)" 
                  className="mt-2 h-20"
                  {...field}
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuantityField control={control} name="quantity" />
        <WeightField control={control} name="weight" />
      </div>

      <DimensionFields control={control} />
    </>
  );
};

export default CargoDetailsSection;
