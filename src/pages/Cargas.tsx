
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingForm from '@/components/cargas/BookingForm';
import MapSection from '@/components/cargas/MapSection';
import VehicleTypesSection from '@/components/cargas/VehicleTypesSection';
import VehicleOptions from '@/components/cargas/VehicleOptions';
import HowItWorksSection from '@/components/cargas/HowItWorksSection';
import BusinessSolutionsSection from '@/components/cargas/BusinessSolutionsSection';
import DownloadAppSection from '@/components/cargas/DownloadAppSection';
import { vehicleTypes, steps } from '@/components/cargas/utils/vehicleData';

const Cargas: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<'standard' | 'scheduled'>('standard');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-gradient-to-b from-primary/5 to-primary/10 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left side - Booking Form */}
              <BookingForm 
                deliveryType={deliveryType} 
                setDeliveryType={setDeliveryType} 
              />
              
              {/* Right side - Map and Info */}
              <MapSection />
            </div>
          </div>
        </div>
        
        {/* Vehicle Types - Updated to include new vehicle types */}
        <VehicleTypesSection vehicleTypes={vehicleTypes} />
        
        {/* Vehicle Options with more details */}
        <VehicleOptions />
        
        {/* How It Works */}
        <HowItWorksSection steps={steps} />
        
        {/* Business Solutions */}
        <BusinessSolutionsSection />
        
        {/* Download App */}
        <DownloadAppSection />
      </main>
      <Footer />
    </div>
  );
};

export default Cargas;
