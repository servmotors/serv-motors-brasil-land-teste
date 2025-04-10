
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const CTASection: React.FC = () => {
  return (
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
  );
};

export default CTASection;
