
import React, { useState } from 'react';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

const MapContainer: React.FC = () => {
  const { googleApiKey, setGoogleApiKey, loadGoogleMapsApi } = useGoogleMaps();
  const [center] = useState({ lat: -23.55052, lng: -46.633309 }); // São Paulo

  // Load map when API key is available
  React.useEffect(() => {
    if (googleApiKey) {
      loadGoogleMapsApi(center);
    }
  }, [googleApiKey, center, loadGoogleMapsApi]);

  return (
    <div className="bg-gray-200 rounded-lg h-[400px] mb-6 flex items-center justify-center">
      {googleApiKey ? (
        <GoogleMapDisplay
          center={center}
          zoom={13}
          markers={[
            {
              position: center,
              title: 'Localização de partida',
              icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
            },
          ]}
        />
      ) : (
        <div className="p-4 w-full max-w-md">
          <GoogleApiKeyForm 
            googleApiKey={googleApiKey} 
            setGoogleApiKey={setGoogleApiKey} 
          />
        </div>
      )}
    </div>
  );
};

export default MapContainer;
