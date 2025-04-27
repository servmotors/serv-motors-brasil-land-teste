
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  navigateBack: () => void;
}

const Header = ({ navigateBack }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container-custom flex items-center">
        <Button 
          variant="ghost" 
          className="mr-2"
          onClick={navigateBack}
        >
          <ChevronLeft className="mr-2" size={20} />
          Voltar
        </Button>
        <Link to="/">
          <img 
            src="/lovable-uploads/92dee777-99ea-4a9a-be34-544d4c04fdaf.png" 
            alt="ServMotors Logo" 
            className="h-8 object-contain"
          />
        </Link>
      </div>
    </header>
  );
};

export default Header;
