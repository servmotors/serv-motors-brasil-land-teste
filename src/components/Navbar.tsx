import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/92dee777-99ea-4a9a-be34-544d4c04fdaf.png" 
              alt="ServMotors Logo" 
              className="h-12 md:h-14 object-contain transition-transform hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link 
            to="/motorista" 
            className="font-medium hover:text-primary transition-colors"
          >
            Motoristas
          </Link>
          <Link 
            to="/cargas" 
            className="font-medium hover:text-primary transition-colors"
          >
            Cargas / Pacotes
          </Link>
          <Link 
            to="/passageiro" 
            className="font-medium hover:text-primary transition-colors"
          >
            Passageiros
          </Link>
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
            <Link 
              to="/motorista" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Motoristas
            </Link>
            <Link 
              to="/cargas" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cargas / Pacotes
            </Link>
            <Link 
              to="/passageiro" 
              className="font-medium py-2 hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Passageiros
            </Link>
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
