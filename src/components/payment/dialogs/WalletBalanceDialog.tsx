
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Wallet, CheckCircle2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface WalletBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideAmount: number;
  currentBalance: number;
}

const WalletBalanceDialog: React.FC<WalletBalanceDialogProps> = ({
  open,
  onOpenChange,
  rideAmount,
  currentBalance
}) => {
  const remainingBalance = currentBalance - rideAmount;
  
  const handleConfirm = () => {
    // Aqui seria a lógica para debitar o valor da carteira
    toast({
      title: "Pagamento realizado",
      description: `R$ ${rideAmount.toFixed(2)} foi debitado do seu saldo em carteira.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Wallet className="h-5 w-5 mr-2 text-primary" />
            Pagar com Saldo em Carteira
          </DialogTitle>
          <DialogDescription>
            Confirme o pagamento usando seu saldo disponível
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <Wallet className="h-12 w-12 text-primary" />
            </div>
            
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Saldo atual:</p>
              <p className="text-2xl font-bold">R$ {currentBalance.toFixed(2)}</p>
            </div>
            
            <div className="w-full space-y-3">
              <div className="flex justify-between">
                <span>Valor da corrida:</span>
                <span className="font-medium">R$ {rideAmount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between">
                <span>Saldo após pagamento:</span>
                <span className="font-medium">R$ {remainingBalance.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleConfirm} className="flex items-center">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Confirmar Pagamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletBalanceDialog;
