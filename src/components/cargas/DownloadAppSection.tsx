
import React from 'react';
import { Button } from "@/components/ui/button";
import { AppleIcon, AndroidIcon } from '@/components/Icons';

const DownloadAppSection: React.FC = () => {
  return (
    <div className="py-16 bg-primary/5" id="download">
      <div className="container-custom text-center">
        <h2 className="text-3xl font-bold mb-4">Baixe nosso aplicativo</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Acompanhe suas entregas em tempo real, salve endereços favoritos e tenha acesso a ofertas exclusivas com nosso aplicativo.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-black hover:bg-black/90 text-white" size="lg">
            <AppleIcon className="h-5 w-5 mr-2" />
            App Store
          </Button>
          <Button className="bg-black hover:bg-black/90 text-white" size="lg">
            <AndroidIcon className="h-5 w-5 mr-2" />
            Google Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DownloadAppSection;
