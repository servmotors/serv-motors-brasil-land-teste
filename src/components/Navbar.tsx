
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="container-custom flex justify-between items-center py-4">
        <div className="flex items-center">
          <span className="text-2xl font-display font-bold text-primary">
            Serv<span className="text-black">Motors</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <button 
            onClick={() => scrollToSection('motoristas')} 
            className="font-medium hover:text-primary transition-colors"
          >
            Motoristas
          </button>
          <button 
            onClick={() => scrollToSection('passageiros')} 
            className="font-medium hover:text-primary transition-colors"
          >
            Passageiros
          </button>
          <button 
            onClick={() => scrollToSection('empresas')} 
            className="font-medium hover:text-primary transition-colors"
          >
            Empresas
          </button>
          <Button className="btn-primary" onClick={() => scrollToSection('download')}>
            Baixar App
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black focus:outline-none">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="container-custom flex flex-col space-y-4 py-4">
            <button 
              onClick={() => scrollToSection('motoristas')} 
              className="font-medium py-2 hover:text-primary transition-colors"
            >
              Motoristas
            </button>
            <button 
              onClick={() => scrollToSection('passageiros')} 
              className="font-medium py-2 hover:text-primary transition-colors"
            >
              Passageiros
            </button>
            <button 
              onClick={() => scrollToSection('empresas')} 
              className="font-medium py-2 hover:text-primary transition-colors"
            >
              Empresas
            </button>
            <Button className="btn-primary" onClick={() => scrollToSection('download')}>
              Baixar App
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
