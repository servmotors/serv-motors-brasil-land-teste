
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Car, Check } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Motorista: React.FC = () => {
  const beneficios = [
    'Ganhos atrativos com tarifas justas',
    'Flexibilidade para trabalhar quando quiser',
    'Pagamentos rápidos e seguros',
    'Suporte 24 horas por dia',
    'Promoções exclusivas para motoristas',
    'App intuitivo e fácil de usar'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <section className="bg-primary/5 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
                <h3 className="text-primary font-semibold">Para Motoristas</h3>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Dirija com a Serv Motors</h1>
              <p className="text-lg text-gray-600 mb-8">
                Seja dono do seu tempo e aumente sua renda como motorista parceiro. 
                Temos as melhores condições do mercado.
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-lg" size="lg" asChild>
                <Link to="/motorista/auth">Cadastre-se como motorista</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="bg-gray-50 p-8 rounded-3xl shadow-md transform transition-transform hover:scale-105">
                <div className="flex flex-col space-y-4">
                  <h3 className="text-2xl font-semibold mb-4">Benefícios para motoristas</h3>
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
                      src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                      alt="Motorista Serv Motors"
                      className="w-full h-96 object-cover"
                    />
                    <div className="p-6">
                      <h4 className="text-xl font-semibold mb-2">Como funciona</h4>
                      <p className="text-gray-600 mb-4">Comece a dirigir em poucos passos</p>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Car size={18} className="text-primary" />
                        </div>
                        <span>Cadastre-se e envie seus documentos</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Car size={18} className="text-primary" />
                        </div>
                        <span>Aguarde a aprovação do seu perfil</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="bg-primary/10 rounded-full p-2">
                          <Car size={18} className="text-primary" />
                        </div>
                        <span>Comece a dirigir e a ganhar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Motorista;
