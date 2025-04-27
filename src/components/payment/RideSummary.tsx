import React from 'react';
import { RideData } from '@/types/ride';

interface RideSummaryProps {
  rideData: RideData | undefined;
  rideAmount: number;
}

const RideSummary: React.FC<RideSummaryProps> = ({ rideData, rideAmount }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resumo da corrida</h2>
        <span className="text-xl font-bold">{rideData?.fare || `R$ ${rideAmount.toFixed(2)}`}</span>
      </div>
      <div className="flex justify-between text-gray-600 text-sm">
        <span>De: {rideData?.pickup || 'Localização atual'}</span>
        <span>Distância: {rideData?.distance?.toFixed(1) || '5.7'} km</span>
      </div>
      <div className="text-gray-600 text-sm">
        <span>Para: {rideData?.destination || 'Destino selecionado'}</span>
      </div>
    </div>
  );
};

export default RideSummary;
