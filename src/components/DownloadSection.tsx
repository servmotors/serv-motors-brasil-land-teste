
import React from 'react';
import { Button } from "@/components/ui/button";
import { AppleIcon, AndroidIcon } from './Icons';

const DownloadSection: React.FC = () => {
  return (
    <section id="download" className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Baixe o aplicativo <span className="text-primary">Serv Motors</span> agora
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Disponível para iOS e Android. Baixe agora e comece a usar a melhor experiência de transporte urbano do Brasil.
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:flex sm:space-x-4">
              <Button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 transition-colors duration-300">
                <AppleIcon className="h-6 w-6" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Baixar na</span>
                  <span className="text-sm font-semibold">App Store</span>
                </div>
              </Button>
              
              <Button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-200 transition-colors duration-300">
                <AndroidIcon className="h-6 w-6" />
                <div className="flex flex-col items-start">
                  <span className="text-xs">Disponível no</span>
                  <span className="text-sm font-semibold">Google Play</span>
                </div>
              </Button>
            </div>
            
            <div className="mt-8 md:mt-12 bg-gray-800 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Escaneie o QR Code</h3>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="bg-white p-3 rounded-lg mb-4 sm:mb-0 sm:mr-6">
                  <div className="w-32 h-32 bg-gray-200 rounded"></div>
                </div>
                <p className="text-gray-300">
                  Escaneie o código QR com a câmera do seu celular para baixar o aplicativo Serv Motors diretamente.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center relative">
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="transform rotate-3">
                  <img
                    src="https://images.unsplash.com/photo-1656268164012-119304af0c69?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="App screenshot 1"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="transform -translate-y-8 -rotate-3">
                  <img
                    src="https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="App screenshot 2"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="transform -translate-y-4 rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="App screenshot 3"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
                <div className="transform translate-y-4 -rotate-6">
                  <img
                    src="https://images.unsplash.com/photo-1621330396173-420a9aa1a91e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
                    alt="App screenshot 4"
                    className="rounded-2xl shadow-2xl"
                  />
                </div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-xl">
                <span className="text-2xl font-display font-bold text-black">
                  Serv
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;
