
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Truck, Package } from 'lucide-react';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

const MapSection: React.FC = () => {
  const { googleApiKey, setGoogleApiKey, loadGoogleMapsApi } = useGoogleMaps();
  const [center] = useState({ lat: -23.55052, lng: -46.633309 }); // São Paulo

  // Load map when API key is available
  React.useEffect(() => {
    if (googleApiKey) {
      loadGoogleMapsApi(center);
    }
  }, [googleApiKey, center, loadGoogleMapsApi]);

  return (
    <div className="lg:col-span-3">
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-primary/5 border-0">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Clock className="text-primary h-8 w-8 mb-2" />
            <h3 className="font-semibold">Rápido & Pontual</h3>
            <p className="text-sm text-gray-600">Entregas no mesmo dia</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-0">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Truck className="text-primary h-8 w-8 mb-2" />
            <h3 className="font-semibold">Diversos Veículos</h3>
            <p className="text-sm text-gray-600">Para qualquer tamanho de carga</p>
          </CardContent>
        </Card>
        
        <Card className="bg-primary/5 border-0">
          <CardContent className="p-4 flex flex-col items-center text-center">
            <Package className="text-primary h-8 w-8 mb-2" />
            <h3 className="font-semibold">Carga Segura</h3>
            <p className="text-sm text-gray-600">Com seguro incluso</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapSection;
