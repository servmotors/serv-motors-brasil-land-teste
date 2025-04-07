
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Carlos Silva',
      role: 'Motorista',
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      testimonial: 'Desde que comecei a trabalhar com a Serv Motors, minha renda aumentou significativamente. O app é muito fácil de usar e o suporte está sempre disponível quando preciso.',
      rating: 5
    },
    {
      name: 'Ana Luiza',
      role: 'Passageira',
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      testimonial: 'Uso o Serv Motors todos os dias para ir ao trabalho. Os motoristas são sempre educados e os carros limpos. Os preços são melhores que a concorrência!',
      rating: 5
    },
    {
      name: 'Ricardo Mendes',
      role: 'Gerente de RH',
      image: 'https://randomuser.me/api/portraits/men/62.jpg',
      testimonial: 'Implementamos o Serv Business na nossa empresa e conseguimos reduzir os custos com transporte em 30%. O dashboard de gestão é completo e intuitivo.',
      rating: 4
    },
  ];

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block bg-primary/10 px-4 py-2 rounded-full mb-4">
            <h3 className="text-primary font-semibold">Depoimentos</h3>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem sobre nós</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Veja o que nossos motoristas, passageiros e empresas parceiras estão falando sobre a Serv Motors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-primary"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-primary fill-primary" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i + testimonial.rating} size={16} className="text-gray-300" />
                  ))}
                </div>
              </div>
              <blockquote className="italic text-gray-600">
                "{testimonial.testimonial}"
              </blockquote>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button className="btn-outline">Ver mais depoimentos</button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
