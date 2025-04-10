
import React, { useEffect } from 'react';
import DriverProfile from './DriverProfile';
import DriverMap from '@/components/DriverMap';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useToast } from '@/hooks/use-toast';

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
  
  const { currentLocation, startWatchingPosition, stopWatchingPosition } = useGeolocation();
  const { googleApiKey, loadGoogleMapsApi } = useGoogleMaps();
  const { toast } = useToast();
  
  // Iniciar o monitoramento da localização automaticamente quando o componente for montado
  useEffect(() => {
    startWatchingPosition();
    
    // Exibir uma notificação quando a localização for obtida pela primeira vez
    if (currentLocation) {
      toast({
        title: 'Localização ativada',
        description: 'Sua localização está sendo monitorada automaticamente.',
      });
    }
    
    // Parar o monitoramento quando o componente for desmontado
    return () => {
      stopWatchingPosition();
    };
  }, []);
  
  // Carregar o mapa quando tivermos a localização e a API Key
  useEffect(() => {
    if (googleApiKey && currentLocation) {
      loadGoogleMapsApi(currentLocation);
    }
  }, [googleApiKey, currentLocation, loadGoogleMapsApi]);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <DriverProfile profile={combinedProfile} />
      <DriverMap className="h-full" />
    </div>
  );
};

export default DashboardSection;
