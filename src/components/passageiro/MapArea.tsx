
import React from 'react';
import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from 'lucide-react';

interface MapAreaProps {
  handleInitMap: () => void;
}

const MapArea: React.FC<MapAreaProps> = ({ handleInitMap }) => {
  return (
    <div className="w-full h-full bg-gray-200 rounded-lg shadow-md overflow-hidden flex items-center justify-center">
      <div 
        className="w-full h-full bg-cover bg-center relative flex items-center justify-center"
        style={{backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')"}}
      >
        {/* Map placeholder */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <Button 
            onClick={handleInitMap}
            className="bg-white text-black hover:bg-gray-200 shadow-lg"
          >
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            Carregar Mapa
          </Button>
        </div>
        
        {/* Current location button */}
        <div className="absolute bottom-4 right-4 z-10">
          <button className="bg-white p-2 rounded-full shadow-lg">
            <Navigation className="h-5 w-5 text-primary" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapArea;
