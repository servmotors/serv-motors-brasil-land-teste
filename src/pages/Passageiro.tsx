
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { ChevronRight } from 'lucide-react';
import PassageirosSection from '@/components/PassageirosSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
import { useToast } from '@/hooks/use-toast';
import MobileHeader from '@/components/passageiro/MobileHeader';
import MapArea from '@/components/passageiro/MapArea';
import BookingPanel from '@/components/passageiro/BookingPanel';

const Passageiro = () => {
  const [showBookingPanel, setShowBookingPanel] = useState(true);
  const [showFullContent, setShowFullContent] = useState(false);
  
  const { toast } = useToast();
  const { 
    googleApiKey, 
    setGoogleApiKey, 
    currentAddress, 
    loadGoogleMapsApi 
  } = useGoogleMaps();

  const handleInitMap = () => {
    if (googleApiKey) {
      // São Paulo coordinates
      loadGoogleMapsApi({ lat: -23.5505, lng: -46.6333 });
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

        {/* Map and booking interface - Swapped order */}
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] md:h-[600px]">
          {/* Booking panel - Now comes first */}
          <BookingPanel 
            onBookRide={handleBookRide}
            showBookingPanel={showBookingPanel}
            toggleBookingPanel={toggleBookingPanel}
          />
          
          {/* Map area - Now comes second */}
          <MapArea handleInitMap={handleInitMap} />
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
