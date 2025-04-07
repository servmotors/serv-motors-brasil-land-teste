
import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <span className="text-2xl font-display font-bold text-primary">
          Serv<span className="text-black">Motors</span>
        </span>
      </div>
    </header>
  );
};

export default Header;
