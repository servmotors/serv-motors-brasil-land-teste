
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import PassageirosSection from '@/components/PassageirosSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useToast } from '@/hooks/use-toast';
import MobileHeader from '@/components/passageiro/MobileHeader';
import MapArea from '@/components/passageiro/MapArea';
import { BookingPanel } from '@/components/passageiro/booking';
import GoogleMapDisplay from '@/components/map/GoogleMapDisplay';
import GoogleApiKeyForm from '@/components/map/GoogleApiKeyForm';
import LocationDisplay from '@/components/map/LocationDisplay';

const Passageiro = () => {
  const [showBookingPanel, setShowBookingPanel] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInitializedRef = useRef(false);
  
  const { toast } = useToast();
  const { 
    googleApiKey, 
    setGoogleApiKey, 
    currentAddress, 
    loadGoogleMapsApi,
    markers,
    isLoadingAddress
  } = useGoogleMaps();
  
  const {
    currentLocation,
    error: locationError,
    isLoading: isLoadingLocation,
    getCurrentPosition,
    startWatchingPosition,
    stopWatchingPosition
  } = useGeolocation();

  // Start watching position when component mounts
  useEffect(() => {
    if (googleApiKey && !mapInitializedRef.current) {
      startWatchingPosition();
      mapInitializedRef.current = true;
    }
    
    // Clean up when component unmounts
    return () => {
      stopWatchingPosition();
    };
  }, [googleApiKey, startWatchingPosition, stopWatchingPosition]);

  // Initialize map when component mounts if API key and location exist
  useEffect(() => {
    if (googleApiKey && currentLocation && !mapLoaded) {
      loadGoogleMapsApi(currentLocation);
      setMapLoaded(true);
    }
  }, [googleApiKey, currentLocation, loadGoogleMapsApi, mapLoaded]);

  const handleInitMap = () => {
    if (googleApiKey) {
      if (currentLocation) {
        loadGoogleMapsApi(currentLocation);
      } else {
        // If we don't have the user's location yet, use default coordinates (São Paulo)
        loadGoogleMapsApi({ lat: -23.5505, lng: -46.6333 });
      }
      setMapLoaded(true);
      // Start tracking user location
      startWatchingPosition();
    } else {
      toast({
        title: "API Key Missing",
        description: "Please enter a Google Maps API key in the settings",
        variant: "destructive"
      });
    }
  };

  const toggleBookingPanel = () => {
    setShowBookingPanel(!showBookingPanel);
  };

  const handleBookRide = () => {
    toast({
      title: "Viagem solicitada!",
      description: "Procurando motoristas próximos...",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 relative">
        {/* Mobile header */}
        <MobileHeader 
          showBookingPanel={showBookingPanel} 
          toggleBookingPanel={toggleBookingPanel} 
        />

        {/* Map and booking interface - correct ordering for desktop */}
        <div className="flex flex-col-reverse md:flex-row h-[calc(100vh-64px)] md:h-[500px]">
          {/* Booking panel - left side on desktop */}
          <div className="md:w-96 w-full">
            <BookingPanel 
              onBookRide={handleBookRide}
              showBookingPanel={showBookingPanel}
              toggleBookingPanel={toggleBookingPanel}
            />
          </div>
          
          {/* Map area - right side on desktop */}
          <div className="flex-1 bg-gray-100 flex flex-col items-center justify-center p-4">
            {!googleApiKey ? (
              <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
                <GoogleApiKeyForm 
                  googleApiKey={googleApiKey} 
                  setGoogleApiKey={setGoogleApiKey} 
                />
              </div>
            ) : !mapLoaded ? (
              <MapArea handleInitMap={handleInitMap} />
            ) : (
              <div className="w-full h-full flex flex-col">
                <GoogleMapDisplay 
                  center={currentLocation || { lat: -23.5505, lng: -46.6333 }}
                  markers={markers.filter(marker => marker.title === 'Sua localização')}
                  zoom={14}
                  className="w-full h-full rounded-lg shadow-md"
                  withDirections={true}
                />
                <div className="mt-2 p-2 bg-white rounded-md shadow">
                  <LocationDisplay
                    currentLocation={currentLocation}
                    currentAddress={currentAddress}
                    isLoadingAddress={isLoadingAddress}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Toggle button for app info sections (mobile only) */}
        <div className="md:hidden mt-4 px-4">
          <Button 
            variant="outline" 
            className="w-full flex justify-between items-center"
            onClick={() => setShowFullContent(!showFullContent)}
          >
            <span>Saiba mais sobre o Serv Motors</span>
            <ChevronRight className={`h-5 w-5 transition-transform ${showFullContent ? 'rotate-90' : ''}`} />
          </Button>
        </div>
        
        {/* App info sections (visible on desktop or when toggled on mobile) */}
        <div className={`${!showFullContent && 'hidden md:block'}`}>
          <PassageirosSection />
          <TestimonialsSection />
          <DownloadSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Passageiro;
