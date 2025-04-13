
import React from 'react';
import MapContainer from './map/MapContainer';
import MapFeatureCards from './map/MapFeatureCards';
import LocationDisplay from '@/components/map/LocationDisplay';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useGeolocation } from '@/hooks/useGeolocation';

const MapSection: React.FC = () => {
  const { currentAddress, isLoadingAddress } = useGoogleMaps();
  const { currentLocation } = useGeolocation();

  return (
    <div className="lg:col-span-3">
      <MapContainer />
      <div className="mt-3 p-3 bg-white rounded-md shadow-sm">
        <LocationDisplay 
          currentLocation={currentLocation}
          currentAddress={currentAddress}
          isLoadingAddress={isLoadingAddress}
        />
      </div>
      <MapFeatureCards />
    </div>
  );
};

export default MapSection;
