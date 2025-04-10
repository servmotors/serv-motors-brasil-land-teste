
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const HeroSection: React.FC = () => {
  return (
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
  );
};

export default HeroSection;
