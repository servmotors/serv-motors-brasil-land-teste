
import { useState, useCallback } from 'react';

interface AddressLookupResult {
  success: boolean;
  address?: string;
  error?: string;
}

export const useAddressLookup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Look up address by postal code (CEP)
  const lookupAddressByCep = useCallback(async (cep: string): Promise<AddressLookupResult> => {
    setIsLoading(true);
    
    try {
      // Remove any non-digit characters from the CEP
      const cleanedCep = cep.replace(/\D/g, '');
      
      // Validate CEP format (8 digits)
      if (cleanedCep.length !== 8) {
        return { 
          success: false, 
          error: 'CEP inválido. Use o formato 00000-000' 
        };
      }
      
      // Call the ViaCEP API
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();
      
      if (data.erro) {
        return { 
          success: false, 
          error: 'CEP não encontrado' 
        };
      }
      
      // Format the address from the response
      const formattedAddress = `${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}, ${data.cep}`;
      
      return {
        success: true,
        address: formattedAddress
      };
    } catch (error) {
      console.error('Error looking up address by CEP:', error);
      return {
        success: false,
        error: 'Erro ao buscar endereço'
      };
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    lookupAddressByCep,
    isLoading
  };
};
