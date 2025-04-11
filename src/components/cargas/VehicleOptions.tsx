
import React from 'react';
import { Info, Truck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { transportTypes } from '@/components/driver-dashboard/vehicle-registration/transportTypes';

// Custom Hatch Car Icon using the uploaded image
const HatchCarIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      className={className}
      fill="currentColor"
    >
      <path d="M20 8.69V4a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v4.69a4 4 0 0 0-2 3.31v6a1 1 0 0 0 1 1h1v1a1 1 0 0 0 2 0v-1h12v1a1 1 0 0 0 2 0v-1h1a1 1 0 0 0 1-1v-6a4 4 0 0 0-2-3.31zM7 5h10v3H7V5zm13 9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4z" />
    </svg>
  );
};

// Custom motorcycle icon component for better representation
const MotorcycleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motorcycle body */}
      <path d="M4 16v-3h4l5-5h5" />
      <path d="M9.5 9l1.5 2" />
      <path d="M17 6c-.8 0-1.5-.2-2-1c-.5-.8-1-1-2-1h-4" />
      
      {/* Wheels */}
      <circle cx="5" cy="16" r="3" />
      <circle cx="19" cy="16" r="3" />
      
      {/* Handlebars */}
      <path d="M15 16h-3" />
      <path d="M6 9l3 3" />
    </svg>
  );
};

// Custom van icon component
const VanIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 17h1V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11h1" />
      <path d="M16 17H3" />
      <path d="M21 17h-5" />
      <path d="M21 9h-5a2 2 0 0 0-2 2v6" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  );
};

// Small utility vehicle icon
const UtilityVehicleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 17h4V6a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v11z" />
      <path d="M2 17h8" />
      <path d="M14 17h8" />
      <path d="M22 13v4h-6a2 2 0 0 1-2 2v-6h-3" />
      <path d="M7 14v3" />
      <path d="M2 13v4h1.5a1.5 1.5 0 1 0 3 0H8v-4H5" />
      <circle cx="5" cy="17" r="1" />
      <circle cx="19" cy="17" r="1" />
    </svg>
  );
};

interface VehicleOption {
  title: string;
  description: string;
  icon: React.ReactNode;
  tooltip: string;
}

const VehicleOptions: React.FC = () => {
  const vehicleOptions: VehicleOption[] = [
    {
      title: "Carro Hatch",
      description: "Para pequenos volumes e entregas rápidas na cidade",
      icon: <img src="/lovable-uploads/6ff72bb6-f463-4814-84e0-f8d35140a32b.png" alt="Hatch Car" className="h-10 w-10 text-primary" />,
      tooltip: "Ideal para documentos e pequenos pacotes urbanos"
    },
    {
      title: "Carro Sedan",
      description: "Maior espaço para bagagens e pacotes médios",
      icon: <img src="/lovable-uploads/522bc4a1-767c-4dc2-a971-df05a5242d45.png" alt="Sedan Car" className="h-10 w-10 text-primary" />,
      tooltip: "Capacidade ampliada em relação ao hatch"
    },
    {
      title: "Moto entrega",
      description: "Entregas expressas com agilidade no trânsito",
      icon: <img src="/lovable-uploads/7b5cfcb6-0bfd-4abd-ba39-ccec9ae9e915.png" alt="Delivery Motorcycle" className="h-10 w-10 text-primary" />,
      tooltip: "Rápido para documentos e pequenos volumes"
    },
    {
      title: "Utilitário (Fiorino, Kangoo)",
      description: "Volume médio com custo-benefício",
      icon: <img src="/lovable-uploads/05b4b0e6-4d1e-4ab7-a689-e2e907ec89d0.png" alt="Utility Vehicle" className="h-10 w-10 text-primary" />,
      tooltip: "Equilibra espaço e custo para entregas comerciais"
    },
    {
      title: "Van",
      description: "Capacidade para móveis e volumes maiores",
      icon: <VanIcon className="h-10 w-10 text-primary" />,
      tooltip: "Ideal para mudanças pequenas e entregas volumosas"
    },
    {
      title: "Carga Pequena",
      description: "Caminhonetes e veículos para cargas específicas",
      icon: <Truck className="h-10 w-10 text-primary" />,
      tooltip: "Para materiais de construção e itens pesados"
    },
    {
      title: "Guincho",
      description: "Transporte de veículos avariados",
      icon: transportTypes.find(t => t.id === "tow")?.icon,
      tooltip: "Remoção de veículos com problemas mecânicos"
    },
    {
      title: "Pet",
      description: "Transporte especializado para animais",
      icon: transportTypes.find(t => t.id === "pet")?.icon,
      tooltip: "Veículos adaptados para o conforto e segurança dos animais"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-12">Opções de transporte disponíveis</h2>
        
        <TooltipProvider>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {vehicleOptions.map((option, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary/20">
                    <div className="mb-4">
                      {option.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                    <p className="text-gray-600 mb-3">{option.description}</p>
                    <div className="flex items-center text-primary/80 text-sm">
                      <Info size={14} className="mr-1" />
                      <span>Saiba mais</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">{option.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>
    </section>
  );
};

export default VehicleOptions;
