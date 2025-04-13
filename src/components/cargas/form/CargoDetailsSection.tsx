
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { 
  CargoNameField, 
  QuantityField, 
  WeightField, 
  DimensionFields 
} from './FormFields';

interface CargoDetailsSectionProps {
  cargoDescriptionRegister: any;
  quantityRegister: any;
  weightRegister: any;
  heightRegister: any;
  widthRegister: any;
  lengthRegister: any;
}

const CargoDetailsSection: React.FC<CargoDetailsSectionProps> = ({
  cargoDescriptionRegister,
  quantityRegister,
  weightRegister,
  heightRegister,
  widthRegister,
  lengthRegister,
}) => {
  return (
    <>
      <div className="space-y-1">
        <label className="text-sm font-medium">Descrição da carga</label>
        <div className="flex flex-col">
          <CargoNameField register={cargoDescriptionRegister} />
          <Textarea 
            placeholder="Detalhes adicionais sobre a carga (opcional)" 
            className="mt-2 h-20"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <QuantityField register={quantityRegister} />
        <WeightField register={weightRegister} />
      </div>

      <DimensionFields 
        heightRegister={heightRegister}
        widthRegister={widthRegister}
        lengthRegister={lengthRegister}
      />
    </>
  );
};

export default CargoDetailsSection;
