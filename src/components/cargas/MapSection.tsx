
import React from 'react';
import MapContainer from './map/MapContainer';
import MapFeatureCards from './map/MapFeatureCards';

const MapSection: React.FC = () => {
  return (
    <div className="lg:col-span-3">
      <MapContainer />
      <MapFeatureCards />
    </div>
  );
};

export default MapSection;
