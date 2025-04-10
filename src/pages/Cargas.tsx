
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/cargas/HeroSection';
import BenefitsSection from '@/components/cargas/BenefitsSection';
import VehicleOptions from '@/components/cargas/VehicleOptions';
import CTASection from '@/components/cargas/CTASection';

const Cargas: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
        <VehicleOptions />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Cargas;
