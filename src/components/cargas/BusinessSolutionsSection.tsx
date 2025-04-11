
import React from 'react';
import { Button } from "@/components/ui/button";
import { Info } from 'lucide-react';

const BusinessSolutionsSection: React.FC = () => {
  return (
    <div className="py-16 bg-white" id="empresas">
      <div className="container-custom">
        <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Soluções para empresas</h2>
              <p className="text-gray-600 mb-6">
                Oferecemos planos especiais para empresas com necessidades de logística frequentes.
                Obtenha preços personalizados, relatórios detalhados e suporte prioritário.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                    <Info size={16} className="text-white" />
                  </div>
                  <p>Preços diferenciados para alto volume de entregas</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                    <Info size={16} className="text-white" />
                  </div>
                  <p>API de integração para seu sistema</p>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-primary rounded-full p-1 mr-3">
                    <Info size={16} className="text-white" />
                  </div>
                  <p>Gerenciamento centralizado de envios</p>
                </div>
              </div>
              
              <Button className="mt-6 bg-primary hover:bg-primary/90">
                Solicitar proposta comercial
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-lg transform -translate-x-4 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                alt="Business solutions" 
                className="rounded-lg shadow-lg relative z-10 w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSolutionsSection;
