
/**
 * Calculates the fare for a specific vehicle type based on distance
 */
export const calculateFare = (vehicleType: string, distanceInKm: number): number => {
  let baseFare = 0;
  let ratePerKm = 0;
  
  switch (vehicleType) {
    case 'serv-x':
      baseFare = 5;
      ratePerKm = 2;
      break;
    case 'serv-comfort':
      baseFare = 7;
      ratePerKm = 2.5;
      break;
    case 'serv-black':
      baseFare = 10;
      ratePerKm = 3.5;
      break;
    default:
      baseFare = 5;
      ratePerKm = 2;
  }
  
  return baseFare + (distanceInKm * ratePerKm);
};

/**
 * Calculates a fare range (min-max) for display purposes
 */
export const calculateFareRange = (vehicleType: string, distanceInKm: number): { 
  min: number; 
  max: number;
  formatted: string;
} => {
  const baseFare = calculateFare(vehicleType, distanceInKm);
  const minFare = baseFare * 0.9;
  const maxFare = baseFare * 1.1;
  
  return {
    min: minFare,
    max: maxFare,
    formatted: `R$ ${minFare.toFixed(0)}-${maxFare.toFixed(0)}`
  };
};
