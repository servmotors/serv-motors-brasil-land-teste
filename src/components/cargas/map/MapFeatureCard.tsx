
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from 'lucide-react';

interface MapFeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const MapFeatureCard: React.FC<MapFeatureCardProps> = ({
  icon: Icon,
  title,
  description
}) => {
  return (
    <Card className="bg-primary/5 border-0">
      <CardContent className="p-4 flex flex-col items-center text-center">
        <Icon className="text-primary h-8 w-8 mb-2" />
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MapFeatureCard;
