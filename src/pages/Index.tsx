
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MotoristasSection from '@/components/MotoristasSection';
import PassageirosSection from '@/components/PassageirosSection';
import EmpresasSection from '@/components/EmpresasSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <MotoristasSection />
        <PassageirosSection />
        <EmpresasSection />
        <TestimonialsSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
