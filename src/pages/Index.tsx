
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MainHeroSection from '@/components/index/MainHeroSection';
import PassageirosSection from '@/components/PassageirosSection';
import EmpresasSection from '@/components/EmpresasSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import DownloadSection from '@/components/DownloadSection';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <MainHeroSection />
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
