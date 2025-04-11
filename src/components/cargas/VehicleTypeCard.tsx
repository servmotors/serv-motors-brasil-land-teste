
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

export interface VehicleType {
  id: number;
  name: string;
  description: string;
  capacity: string;
  maxDistance: string;
  price: string;
  image: string;
}

interface VehicleTypeCardProps {
  vehicle: VehicleType;
}

const VehicleTypeCard: React.FC<VehicleTypeCardProps> = ({ vehicle }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow border-2 border-transparent hover:border-primary/20 h-full flex flex-col">
      <CardContent className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <img src={vehicle.image} alt={vehicle.name} className="h-16 w-16 text-primary" />
        </div>
        <h3 className="text-xl font-semibold mb-2">{vehicle.name}</h3>
        <p className="text-gray-600 mb-3 flex-grow">{vehicle.description}</p>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>Capacidade:</span>
            <span className="font-medium">{vehicle.capacity}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Distância máx:</span>
            <span className="font-medium">{vehicle.maxDistance}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Preço estimado:</span>
            <span className="font-medium text-primary">{vehicle.price}</span>
          </div>
        </div>
        
        <Button variant="outline" className="mt-auto w-full">
          <span>Selecionar</span>
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeCard;
