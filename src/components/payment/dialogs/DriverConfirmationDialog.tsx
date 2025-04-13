
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DriverConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideAmount: number;
  cashAmount: number;
  onComplete: () => void;
}

const DriverConfirmationDialog: React.FC<DriverConfirmationDialogProps> = ({
  open,
  onOpenChange,
  rideAmount,
  cashAmount,
  onComplete
}) => {
  const [changeOption, setChangeOption] = useState('cash');
  const changeAmount = cashAmount > rideAmount ? cashAmount - rideAmount : 0;
  
  const handleConfirm = () => {
    if (changeOption === 'wallet') {
      // Aqui seria a lógica para adicionar o troco na carteira do passageiro
      // E reduzir do saldo do motorista
      toast({
        title: "Troco adicionado à carteira",
        description: `R$ ${changeAmount.toFixed(2)} foi adicionado à carteira do passageiro.`,
      });
    } else {
      toast({
        title: "Pagamento confirmado",
        description: "O troco em dinheiro deve ser devolvido ao passageiro.",
      });
    }
    
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Check className="h-5 w-5 mr-2 text-primary" />
            Confirmação do Motorista
          </DialogTitle>
          <DialogDescription>
            O passageiro informou que vai pagar R$ {cashAmount.toFixed(2)}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex justify-between items-center mb-4 border-b pb-4">
            <div>
              <p className="text-sm text-gray-600">Valor da corrida:</p>
              <p className="text-lg font-bold">R$ {rideAmount.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Valor recebido:</p>
              <p className="text-lg font-bold">R$ {cashAmount.toFixed(2)}</p>
            </div>
          </div>
          
          {changeAmount > 0 && (
            <div>
              <p className="font-medium mb-2">
                Troco: R$ {changeAmount.toFixed(2)}
              </p>
              
              <RadioGroup 
                value={changeOption} 
                onValueChange={setChangeOption}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="font-medium cursor-pointer">
                    Devolver troco em dinheiro
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="wallet" id="wallet" />
                  <Label htmlFor="wallet" className="font-medium cursor-pointer">
                    Devolver como crédito na carteira do passageiro
                  </Label>
                </div>
              </RadioGroup>
              
              {changeOption === 'wallet' && (
                <p className="text-sm text-gray-600 mt-2">
                  O valor do troco será descontado do seu saldo, já que você recebeu o valor total em dinheiro.
                </p>
              )}
            </div>
          )}
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleConfirm}>
            Confirmar Recebimento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DriverConfirmationDialog;
