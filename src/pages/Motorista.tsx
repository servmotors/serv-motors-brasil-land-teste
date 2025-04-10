
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/motorista/HeroSection';
import BenefitsSection from '@/components/motorista/BenefitsSection';

const Motorista: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <BenefitsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Motorista;
