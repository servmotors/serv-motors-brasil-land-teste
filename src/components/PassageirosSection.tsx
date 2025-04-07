
import React from 'react';
import { Star } from 'lucide-react';

const PassageirosSection: React.FC = () => {
  const vantagens = [
    {
      titulo: 'Preços Competitivos',
      descricao: 'Economize em suas viagens diárias com nossas tarifas acessíveis.'
    },
    {
      titulo: 'Segurança em Primeiro Lugar',
      descricao: 'Motoristas verificados e monitoramento em tempo real das suas viagens.'
    },
    {
      titulo: 'Rapidez no Atendimento',
      descricao: 'Motoristas disponíveis próximos à sua localização a qualquer momento.'
    },
    {
      titulo: 'Diversas Formas de Pagamento',
      descricao: 'Pague com cartão, dinheiro ou através da carteira digital do aplicativo.'
    }
  ];

  return (
    <section id="passageiros" className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <h3 className="text-primary font-semibold">Para Passageiros</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Viaje com conforto e segurança</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A Serv Motors oferece uma experiência de viagem urbana confortável, segura e ao melhor preço.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-xl transform translate-x-4 -translate-y-4 z-0"></div>
              <div className="relative z-10 bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="p-2">
                  <div className="bg-gray-100 rounded-lg p-4 mb-3">
                    <div className="flex items-center mb-2">
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
                        <span className="font-bold text-black">SM</span>
                      </div>
                      <div>
                        <h4 className="font-semibold">Serv Motors</h4>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={16} className="text-primary fill-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm mb-2">Seu motorista chegará em aproximadamente:</p>
                    <div className="text-3xl font-bold text-center text-primary">3 min</div>
                  </div>
                  <img
                    src="https://images.unsplash.com/photo-1580654842920-9d1e9e891881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Aplicativo Serv Motors"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {vantagens.map((vantagem, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-semibold mb-3 text-primary">{vantagem.titulo}</h3>
                  <p className="text-gray-600">{vantagem.descricao}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-primary/10 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Viaje pela primeira vez com desconto!</h3>
              <p className="mb-4">Use o código promocional <span className="font-bold bg-primary px-2 py-1 rounded text-black">SERVNOVO</span> e ganhe 30% de desconto na sua primeira viagem.</p>
              <button className="btn-primary">Baixar e aproveitar</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PassageirosSection;
