
import React from 'react';
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  const scrollToDownload = () => {
    const element = document.getElementById('download');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 z-0"></div>
      <div className="container-custom relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Sua jornada, <span className="text-primary">nossa missão</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-md">
              Conectamos motoristas, passageiros e empresas para uma experiência de mobilidade urbana mais eficiente, segura e acessível.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Button className="btn-primary" onClick={scrollToDownload}>
                Baixar Aplicativo
              </Button>
              <Button variant="outline" className="btn-outline">
                Saiba Mais
              </Button>
            </div>
          </div>
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-primary/20 rounded-full animate-pulse"></div>
            </div>
            <div className="relative z-10 flex justify-center">
              <div className="w-48 h-96 md:w-64 md:h-[30rem] bg-black/10 rounded-3xl shadow-xl transform -rotate-6 animate-bounce-subtle">
                <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-800 to-gray-900 p-2">
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center">
                    <span className="text-2xl font-display font-bold text-primary">
                      Serv<span className="text-black">Motors</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
