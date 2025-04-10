
import React from 'react';
import { Button } from '@/components/ui/button';

interface DashboardMenuItemProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  color: string;
  value?: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const DashboardMenuItem = ({ 
  id, 
  label, 
  icon, 
  color, 
  value, 
  isActive, 
  onClick 
}: DashboardMenuItemProps) => {
  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      className="w-full justify-start mb-1"
      onClick={() => onClick(id)}
    >
      <span className={`${color} mr-2`}>{icon}</span>
      <span>{label}</span>
      {value && (
        <span className="ml-auto font-medium text-green-600">{value}</span>
      )}
    </Button>
  );
};

export default DashboardMenuItem;
