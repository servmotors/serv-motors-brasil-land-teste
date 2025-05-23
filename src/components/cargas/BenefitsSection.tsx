
import React from 'react';
import { Check, PackageOpen, Truck, Box } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  const beneficios = [
    'Entregas rápidas e seguras',
    'Opções diversas de veículos para cargas',
    'Rastreamento em tempo real',
    'Preços competitivos e transparentes',
    'Seguro para cargas',
    'Suporte dedicado para logística'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-gray-50 p-8 rounded-3xl shadow-md transform transition-transform hover:scale-105">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold mb-4">Benefícios para empresas e pessoas físicas</h3>
              <ul className="space-y-3">
                {beneficios.map((beneficio, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <Check size={16} className="text-black" />
                    </div>
                    <span>{beneficio}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full transform -translate-x-6 translate-y-6"></div>
              <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Entrega de cargas Serv Motors"
                  className="w-full h-96 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-semibold mb-2">Como funciona</h4>
                  <p className="text-gray-600 mb-4">Solicite o transporte da sua carga em poucos passos</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <PackageOpen size={18} className="text-primary" />
                    </div>
                    <span>Informe detalhes da carga e destino</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Truck size={18} className="text-primary" />
                    </div>
                    <span>Selecione o tipo de veículo adequado</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-primary/10 rounded-full p-2">
                      <Box size={18} className="text-primary" />
                    </div>
                    <span>Acompanhe a entrega em tempo real</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
