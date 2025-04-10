
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Truck, Check, PackageOpen, Box, Car, Info } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { transportTypes } from '@/components/driver-dashboard/vehicle-registration/transportTypes';

// Custom motorcycle icon component for better representation
const MotorcycleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Motorcycle body */}
      <path d="M4 16v-3h4l5-5h5" />
      <path d="M9.5 9l1.5 2" />
      <path d="M17 6c-.8 0-1.5-.2-2-1c-.5-.8-1-1-2-1h-4" />
      
      {/* Wheels */}
      <circle cx="5" cy="16" r="3" />
      <circle cx="19" cy="16" r="3" />
      
      {/* Handlebars */}
      <path d="M15 16h-3" />
      <path d="M6 9l3 3" />
    </svg>
  );
};

// Custom van icon component
const VanIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M3 17h1V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v11h1" />
      <path d="M16 17H3" />
      <path d="M21 17h-5" />
      <path d="M21 9h-5a2 2 0 0 0-2 2v6" />
      <circle cx="6" cy="17" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  );
};

// Small utility vehicle icon
const UtilityVehicleIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 17h4V6a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v11z" />
      <path d="M2 17h8" />
      <path d="M14 17h8" />
      <path d="M22 13v4h-6a2 2 0 0 1-2 2v-6h-3" />
      <path d="M7 14v3" />
      <path d="M2 13v4h1.5a1.5 1.5 0 1 0 3 0H8v-4H5" />
      <circle cx="5" cy="17" r="1" />
      <circle cx="19" cy="17" r="1" />
    </svg>
  );
};

const Cargas: React.FC = () => {
  const beneficios = [
    'Entregas rápidas e seguras',
    'Opções diversas de veículos para cargas',
    'Rastreamento em tempo real',
    'Preços competitivos e transparentes',
    'Seguro para cargas',
    'Suporte dedicado para logística'
  ];

  const vehicleOptions = [
    {
      title: "Carro Hatch",
      description: "Para pequenos volumes e entregas rápidas na cidade",
      icon: <Car className="h-10 w-10 text-primary" />,
      tooltip: "Ideal para documentos e pequenos pacotes urbanos"
    },
    {
      title: "Carro Sedan",
      description: "Maior espaço para bagagens e pacotes médios",
      icon: <Car className="h-10 w-10 text-primary" />,
      tooltip: "Capacidade ampliada em relação ao hatch"
    },
    {
      title: "Moto Baú / Bag",
      description: "Entregas expressas com agilidade no trânsito",
      icon: <MotorcycleIcon className="h-10 w-10 text-primary" />,
      tooltip: "Rápido para documentos e pequenos volumes"
    },
    {
      title: "Utilitário (Fiorino, Kangoo)",
      description: "Volume médio com custo-benefício",
      icon: <UtilityVehicleIcon className="h-10 w-10 text-primary" />,
      tooltip: "Equilibra espaço e custo para entregas comerciais"
    },
    {
      title: "Van",
      description: "Capacidade para móveis e volumes maiores",
      icon: <VanIcon className="h-10 w-10 text-primary" />,
      tooltip: "Ideal para mudanças pequenas e entregas volumosas"
    },
    {
      title: "Carga Pequena",
      description: "Caminhonetes e veículos para cargas específicas",
      icon: <Truck className="h-10 w-10 text-primary" />,
      tooltip: "Para materiais de construção e itens pesados"
    },
    {
      title: "Guincho",
      description: "Transporte de veículos avariados",
      icon: <transportTypes.find(t => t.id === "tow")?.icon || null} className="h-10 w-10 text-primary" />,
      tooltip: "Remoção de veículos com problemas mecânicos"
    },
    {
      title: "Pet",
      description: "Transporte especializado para animais",
      icon: <transportTypes.find(t => t.id === "pet")?.icon || null} className="h-10 w-10 text-primary" />,
      tooltip: "Veículos adaptados para o conforto e segurança dos animais"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary/5 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <h3 className="text-primary font-semibold">Cargas / Pacotes</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Logística Simplificada com a Serv Motors</h1>
              <p className="text-lg text-gray-600 mb-8">
                Transporte suas cargas e pacotes com segurança e eficiência. 
                Tenha acesso à frota diversificada e motoristas qualificados.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-lg" size="lg" asChild>
                <Link to="/motorista/auth">Solicitar transporte de carga</Link>
              </Button>
            </div>
          </div>
        </section>

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

        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-12">Opções de transporte disponíveis</h2>
            
            <TooltipProvider>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {vehicleOptions.map((option, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-2 border-transparent hover:border-primary/20">
                        <div className="mb-4">
                          {option.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
                        <p className="text-gray-600 mb-3">{option.description}</p>
                        <div className="flex items-center text-primary/80 text-sm">
                          <Info size={14} className="mr-1" />
                          <span>Saiba mais</span>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{option.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Pronto para simplificar sua logística?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Solicite seu transporte de carga e tenha acesso a uma plataforma completa para suas necessidades logísticas. 
                Para empresas, temos planos especiais com valores diferenciados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary hover:bg-primary/90 text-lg" size="lg" asChild>
                  <Link to="/motorista/auth">Solicitar transporte agora</Link>
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/5 text-lg" size="lg" asChild>
                  <a href="#empresas">Planos para empresas</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Cargas;
