
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';

export const useDriverAvailability = (initialState = false) => {
  const [isAvailable, setIsAvailable] = useState(initialState);
  const { toast } = useToast();

  const toggleAvailability = (newState?: boolean) => {
    const newAvailability = newState !== undefined ? newState : !isAvailable;
    
    setIsAvailable(newAvailability);
    
    toast({
      title: newAvailability ? 'Você está disponível' : 'Você está indisponível',
      description: newAvailability 
        ? 'Agora você pode receber solicitações de corrida.' 
        : 'Você não receberá solicitações de corrida.',
      variant: newAvailability ? 'default' : 'destructive',
    });
    
    // Aqui seria o local para enviar o status para a API
    // Exemplo: api.updateDriverStatus(userId, newAvailability);
  };

  return {
    isAvailable,
    toggleAvailability
  };
};
