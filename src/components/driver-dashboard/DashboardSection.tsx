
import React from 'react';
import DriverProfile from './DriverProfile';
import DriverMap from '@/components/DriverMap';

interface DashboardSectionProps {
  profile: any;
  driverProfile: any;
}

const DashboardSection = ({ profile, driverProfile }: DashboardSectionProps) => {
  // Merge profile and driverProfile data
  const combinedProfile = {
    ...profile,
    ...driverProfile
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DriverProfile profile={combinedProfile} />
      <DriverMap className="h-full" />
    </div>
  );
};

export default DashboardSection;
