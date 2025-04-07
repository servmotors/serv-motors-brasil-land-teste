
import React from 'react';
import { Building2, Users, Receipt, TrendingUp } from 'lucide-react';

const EmpresasSection: React.FC = () => {
  const solucoes = [
    {
      icon: <Building2 size={36} className="text-primary" />,
      titulo: 'Serv Business',
      descricao: 'Solução corporativa para transporte de funcionários com gestão centralizada e relatórios detalhados.'
    },
    {
      icon: <Users size={36} className="text-primary" />,
      titulo: 'Serv Eventos',
      descricao: 'Transporte para eventos corporativos com veículos personalizados e coordenação logística completa.'
    },
    {
      icon: <Receipt size={36} className="text-primary" />,
      titulo: 'Faturamento Centralizado',
      descricao: 'Controle todas as despesas de mobilidade da sua empresa em uma única fatura mensal.'
    },
    {
      icon: <TrendingUp size={36} className="text-primary" />,
      titulo: 'Dashboard Empresarial',
      descricao: 'Análise de dados, relatórios personalizados e gestão de custos em tempo real.'
    }
  ];

  return (
    <section id="empresas" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <h3 className="text-primary font-semibold">Para Empresas</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Soluções corporativas de mobilidade</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Otimize a gestão de transporte da sua empresa com as soluções personalizadas da Serv Motors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="order-2 md:order-1">
            <div className="bg-gray-900 text-white rounded-3xl overflow-hidden shadow-xl">
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">Serv Motors para Empresas</h3>
                <p className="mb-6 text-gray-300">
                  Reduza custos, aumente a produtividade e ofereça uma experiência premium de mobilidade para sua equipe e clientes.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Controle centralizado de gastos com transporte</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Centro administrativo para gerenciar usuários e permissões</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>Relatórios detalhados e exportáveis</span>
                  </li>
                  <li className="flex items-start">
                    <div className="mr-3 mt-1 bg-primary rounded-full p-1">
                      <svg className="w-4 h-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span>API para integração com sistemas internos</span>
                  </li>
                </ul>
                <button className="bg-primary text-primary-foreground hover:bg-primary-dark transition-colors w-full py-3 rounded-full font-semibold">
                  Fale com um consultor
                </button>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center items-center">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
              alt="Empresas Serv Motors"
              className="rounded-3xl shadow-xl max-h-96 object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {solucoes.map((solucao, index) => (
            <div 
              key={index} 
              className="bg-gray-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{solucao.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{solucao.titulo}</h3>
              <p className="text-gray-600">{solucao.descricao}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmpresasSection;
