
import React from 'react';
import MapFeatureCard from './MapFeatureCard';
import { Clock, Truck, Package } from 'lucide-react';

const MapFeatureCards: React.FC = () => {
  const features = [
    {
      icon: Clock,
      title: 'Rápido & Pontual',
      description: 'Entregas no mesmo dia'
    },
    {
      icon: Truck,
      title: 'Diversos Veículos',
      description: 'Para qualquer tamanho de carga'
    },
    {
      icon: Package,
      title: 'Carga Segura',
      description: 'Com seguro incluso'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {features.map((feature, index) => (
        <MapFeatureCard 
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default MapFeatureCards;
