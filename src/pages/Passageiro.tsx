
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PassageirosSection from '@/components/PassageirosSection';
import DownloadSection from '@/components/DownloadSection';
import TestimonialsSection from '@/components/TestimonialsSection';

const Passageiro = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="bg-primary/5 py-16 md:py-24">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Viaje com conforto e segurança</h1>
              <p className="text-lg text-gray-600">
                Encontre motoristas confiáveis para suas viagens diárias ou ocasionais.
                A Serv Motors conecta você aos melhores motoristas próximos à sua localização.
              </p>
            </div>
          </div>
        </div>
        <PassageirosSection />
        <TestimonialsSection />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
};

export default Passageiro;
