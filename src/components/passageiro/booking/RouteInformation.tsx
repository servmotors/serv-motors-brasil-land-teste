
import React from 'react';

interface RouteInformationProps {
  distance: number | null;
  duration: number | null;
  fare: string | null;
}

const RouteInformation: React.FC<RouteInformationProps> = ({ distance, duration, fare }) => {
  if (!distance || !duration) {
    return null;
  }

  return (
    <div className="p-3 bg-gray-50 rounded-lg text-sm mb-6">
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">Distância:</span>
        <span>{distance.toFixed(1)} km</span>
      </div>
      <div className="flex justify-between items-center mb-1">
        <span className="font-medium">Tempo estimado:</span>
        <span>{duration} min</span>
      </div>
      {fare && (
        <div className="flex justify-between items-center pt-1 border-t border-gray-200 mt-1">
          <span className="font-semibold">Valor estimado:</span>
          <span className="font-semibold">{fare}</span>
        </div>
      )}
    </div>
  );
};

export default RouteInformation;
