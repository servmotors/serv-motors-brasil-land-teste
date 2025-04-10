
import React from 'react';
import DriverProfile from './DriverProfile';
import DriverMap from '@/components/DriverMap';

interface DashboardSectionProps {
  profile: any;
}

const DashboardSection = ({ profile }: DashboardSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DriverProfile profile={profile} />
      <DriverMap className="h-full" />
    </div>
  );
};

export default DashboardSection;
