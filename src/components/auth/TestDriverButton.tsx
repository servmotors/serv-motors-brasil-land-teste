
import React from 'react';
import { Button } from '@/components/ui/button';

interface TestDriverButtonProps {
  onClick: () => Promise<void>;
  isLoading: boolean;
}

const TestDriverButton: React.FC<TestDriverButtonProps> = ({ onClick, isLoading }) => {
  return (
    <Button 
      variant="outline" 
      className="w-full mb-4 border-dashed border-primary text-primary hover:bg-primary/5"
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading ? 'Processando...' : 'Entrar como Motorista Teste'}
    </Button>
  );
};

export default TestDriverButton;
