
import React from 'react';
import { Check } from 'lucide-react';

const MotoristasSection: React.FC = () => {
  const beneficios = [
    'Ganhos atrativos com tarifas justas',
    'Flexibilidade para trabalhar quando quiser',
    'Pagamentos rápidos e seguros',
    'Suporte 24 horas por dia',
    'Promoções exclusivas para motoristas',
    'App intuitivo e fácil de usar'
  ];

  return (
    <section id="motoristas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <h3 className="text-primary font-semibold">Para Motoristas</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Dirija com a Serv Motors</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Seja dono do seu tempo e aumente sua renda como motorista parceiro. Temos as melhores condições do mercado.
          </p>
        </div>

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
                  <h4 className="text-xl font-semibold mb-2">Cadastre-se como motorista</h4>
                  <p className="text-gray-600 mb-4">Comece a dirigir em poucos passos</p>
                  <button className="btn-primary w-full">Seja motorista parceiro</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MotoristasSection;
