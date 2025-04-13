
import React, { useState } from 'react';
import { QrCode, Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PixPaymentFormProps {
  onCancel: () => void;
  onComplete: () => void;
}

const PixPaymentForm: React.FC<PixPaymentFormProps> = ({ onCancel, onComplete }) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  // Simulação de código PIX
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136a629533e-7693-4846-b028-f33a8794f70d5204000053039865802BR5925APLICATIVO EXEMPLO SA6009SAO PAULO62070503***6304E2CA";
  
  const handleCopyCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast({
      title: "Código copiado",
      description: "O código PIX foi copiado para a área de transferência.",
    });
    
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePaymentVerification = () => {
    // Simulação de verificação de pagamento
    toast({
      title: "Verificando pagamento",
      description: "Estamos verificando seu pagamento PIX.",
    });

    // Simular confirmação após 2 segundos
    setTimeout(() => {
      toast({
        title: "Pagamento confirmado",
        description: "Seu pagamento via PIX foi aprovado!",
      });
      onComplete();
    }, 2000);
  };
  
  return (
    <div className="border-t mt-6 pt-6">
      <div className="flex items-center mb-4">
        <QrCode className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Pagamento via PIX</h3>
      </div>
      
      <div className="flex flex-col items-center justify-center p-4 mb-4">
        <div className="bg-white p-4 rounded-lg border mb-4">
          {/* QR Code placeholder - em produção, gerar QR code real */}
          <div className="w-48 h-48 bg-gray-100 flex items-center justify-center">
            <QrCode size={120} className="text-gray-800" />
          </div>
        </div>
        
        <div className="w-full">
          <p className="text-sm text-gray-600 mb-2">Ou copie o código PIX abaixo:</p>
          <div className="relative">
            <div className="bg-gray-100 p-3 rounded text-xs overflow-hidden overflow-ellipsis whitespace-nowrap">
              {pixCode}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1/2 -translate-y-1/2"
              onClick={handleCopyCode}
            >
              {copied ? (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-1">Valor a pagar:</p>
          <p className="text-xl font-bold">R$ 35,50</p>
          <p className="text-xs text-gray-500 mt-1">
            Após o pagamento, aguarde alguns instantes para a confirmação
          </p>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="button" onClick={handlePaymentVerification}>
          Já paguei
        </Button>
      </div>
    </div>
  );
};

export default PixPaymentForm;
