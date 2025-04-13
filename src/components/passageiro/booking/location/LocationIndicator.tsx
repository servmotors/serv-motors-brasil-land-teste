
import React from 'react';

const LocationIndicator: React.FC = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-primary"></div>
      <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
      <div className="w-3 h-3 rounded-full bg-gray-800"></div>
    </div>
  );
};

export default LocationIndicator;
