
import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface GoogleApiKeyFormProps {
  googleApiKey: string;
  setGoogleApiKey: (key: string) => void;
}

const GoogleApiKeyForm: React.FC<GoogleApiKeyFormProps> = ({ 
  googleApiKey, 
  setGoogleApiKey 
}) => {
  const { toast } = useToast();

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoogleApiKey(e.target.value);
  };

  const handleApiKeySubmit = () => {
    if (!googleApiKey) {
      toast({
        variant: "destructive",
        title: "Chave API inválida",
        description: "Por favor, insira uma chave API do Google válida."
      });
      return;
    }
    
    toast({
      title: "Chave API Google Atualizada",
      description: "A chave foi configurada com sucesso."
    });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-500 mb-2">
        Para visualizar o mapa, insira sua chave API do Google Maps:
      </p>
      <div className="flex gap-2">
        <input 
          type="text" 
          value={googleApiKey}
          onChange={handleApiKeyChange}
          placeholder="Insira a chave API Google Maps"
          className="flex-1 p-2 text-sm border rounded-md"
        />
        <Button 
          onClick={handleApiKeySubmit}
          size="sm"
        >
          Aplicar
        </Button>
      </div>
      <p className="text-xs text-gray-400">
        Obtenha sua chave API em <a href="https://console.cloud.google.com/google/maps-apis" className="text-blue-500 underline" target="_blank" rel="noreferrer">console.cloud.google.com</a>
      </p>
    </div>
  );
};

export default GoogleApiKeyForm;
