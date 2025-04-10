
import React from 'react';
import { Users, Truck, Dog, Info, Car } from 'lucide-react';
import { TowTruckIcon } from '@/components/Icons';
import { TransportType } from './types';

// Custom motorcycle icon component for better motorcycle representation
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

export const transportTypes: TransportType[] = [
  {
    id: 'passengers',
    name: 'Passageiros',
    icon: <Users className="h-6 w-6" />,
    tooltip: 'Transporte de passageiros para corridas urbanas',
    hintText: 'Essa opção é para quem deseja transportar passageiros de carro ou moto.',
    subtypes: [
      {
        id: 'car',
        name: 'Carro',
        icon: <Car className="h-5 w-5" />
      },
      {
        id: 'motorcycle',
        name: 'Moto táxi',
        icon: <MotorcycleIcon className="h-5 w-5" />
      }
    ]
  },
  {
    id: 'packages',
    name: 'Cargas / Pacotes',
    icon: <Truck className="h-6 w-6" />,
    tooltip: 'Entrega de pacotes e pequenas cargas',
    hintText: 'Escolha essa opção para transportar somente pacotes ou cargas de pequeno porte com veículo hatch ou sedan, utilitário, van ou caminhão pequeno.'
  },
  {
    id: 'tow',
    name: 'Guincho',
    icon: <TowTruckIcon className="h-6 w-6" />,
    tooltip: 'Serviço de reboque para veículos',
    hintText: 'Escolher essa opção especificamente se você tem um caminhão guincho preparado para essa modalidade de acordo com a legislação vigente.'
  },
  {
    id: 'pet',
    name: 'Pet',
    icon: <Dog className="h-6 w-6" />,
    tooltip: 'Transporte especializado para animais de estimação',
    hintText: 'Essa opção é indicada para quem tem veículo preparado para transporte de animais como lojas Pets, clínicas Pets ou no mínimo a caixinha para transportar pequenos animais.'
  }
];
