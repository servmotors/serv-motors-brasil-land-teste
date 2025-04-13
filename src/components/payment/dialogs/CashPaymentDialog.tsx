
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { DollarSign } from 'lucide-react';
import DriverConfirmationDialog from './DriverConfirmationDialog';

interface CashPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideAmount: number;
}

const CashPaymentDialog: React.FC<CashPaymentDialogProps> = ({ 
  open, 
  onOpenChange,
  rideAmount
}) => {
  const [cashAmount, setCashAmount] = useState('');
  const [showDriverDialog, setShowDriverDialog] = useState(false);
  
  const handleContinue = () => {
    const amount = parseFloat(cashAmount);
    
    if (isNaN(amount) || amount < rideAmount) {
      toast({
        title: "Valor insuficiente",
        description: `O valor deve ser pelo menos R$ ${rideAmount.toFixed(2)}`,
        variant: "destructive"
      });
      return;
    }
    
    // Só mostrar a confirmação do motorista após valores válidos
    setShowDriverDialog(true);
  };
  
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Pagamento em Dinheiro
            </DialogTitle>
            <DialogDescription>
              Informe quanto você vai pagar em dinheiro ao motorista
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-1">Valor da corrida:</p>
              <p className="text-2xl font-bold">R$ {rideAmount.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Informe o valor em dinheiro:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input
                  type="number"
                  min={rideAmount}
                  step="0.01"
                  className="pl-10"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  placeholder="0,00"
                />
              </div>
              
              {parseFloat(cashAmount) > rideAmount && (
                <p className="text-sm text-gray-600">
                  Troco: R$ {(parseFloat(cashAmount) - rideAmount).toFixed(2)}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleContinue}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <DriverConfirmationDialog
        open={showDriverDialog}
        onOpenChange={setShowDriverDialog}
        rideAmount={rideAmount}
        cashAmount={parseFloat(cashAmount) || 0}
        onComplete={() => {
          onOpenChange(false);
          setShowDriverDialog(false);
        }}
      />
    </>
  );
};

export default CashPaymentDialog;
