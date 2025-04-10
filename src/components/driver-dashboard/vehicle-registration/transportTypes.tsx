
import React from 'react';
import { Users, Truck, Dog, Info, Car } from 'lucide-react';
import { TowTruckIcon } from '@/components/Icons';
import { TransportType } from './types';

// Import MotorcycleIcon directly from lucide-react
import { Motorcycle as MotorcycleIcon } from 'lucide-react';

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
