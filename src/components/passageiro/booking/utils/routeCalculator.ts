
export const calculateRoute = (
  pickup: string,
  destination: string,
  onSuccess: (distanceInKm: number, durationInMinutes: number) => void,
  onError: (error: string | null) => void
) => {
  if (!pickup || !destination || !window.google?.maps) {
    onError('Endereços ou serviço de mapas indisponível');
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();
  
  directionsService.route(
    {
      origin: pickup,
      destination,
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result) {
        const distanceValue = result.routes[0]?.legs[0]?.distance?.value || 0;
        const distanceInKm = distanceValue / 1000;
        
        const durationValue = result.routes[0]?.legs[0]?.duration?.value || 0;
        const durationInMinutes = Math.round(durationValue / 60);
        
        onSuccess(distanceInKm, durationInMinutes);
      } else {
        onError('Erro ao calcular rota. Verifique os endereços informados.');
      }
    }
  );
};
