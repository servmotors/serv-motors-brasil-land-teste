
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import DriverConfirmationDialog from './DriverConfirmationDialog';

interface CashPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rideAmount: number;
  onConfirm: () => void;
}

const CashPaymentDialog: React.FC<CashPaymentDialogProps> = ({
  open,
  onOpenChange,
  rideAmount,
  onConfirm
}) => {
  const [cashAmount, setCashAmount] = useState('');
  const [showDriverDialog, setShowDriverDialog] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers and one decimal point
    const value = e.target.value.replace(/[^0-9.]/g, '');
    const parts = value.split('.');
    if (parts.length > 1) {
      setCashAmount(`${parts[0]}.${parts[1].slice(0, 2)}`);
    } else {
      setCashAmount(value);
    }
  };
  
  const handleConfirm = () => {
    if (!cashAmount || parseFloat(cashAmount) < rideAmount) {
      toast({
        title: "Valor insuficiente",
        description: `O valor em dinheiro deve ser pelo menos R$ ${rideAmount.toFixed(2)}`,
        variant: "destructive"
      });
      return;
    }
    
    // Show dialog for driver confirmation
    setShowDriverDialog(true);
  };
  
  const handleDriverConfirmation = () => {
    setShowDriverDialog(false);
    onOpenChange(false);
    onConfirm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-primary" />
              Pagamento em Dinheiro
            </DialogTitle>
            <DialogDescription>
              Informe o valor em dinheiro que será entregue ao motorista
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="text-center mb-4">
              <p className="text-sm text-gray-600 mb-1">Valor da corrida:</p>
              <p className="text-2xl font-bold">R$ {rideAmount.toFixed(2)}</p>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cash-amount" className="text-sm font-medium">
                Valor em dinheiro:
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  R$
                </span>
                <Input
                  id="cash-amount"
                  value={cashAmount}
                  onChange={handleInputChange}
                  className="pl-8"
                  placeholder="0.00"
                />
              </div>
              {parseFloat(cashAmount || '0') > rideAmount && (
                <p className="text-sm text-gray-600">
                  Troco: R$ {(parseFloat(cashAmount) - rideAmount).toFixed(2)}
                </p>
              )}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleConfirm} disabled={!cashAmount || parseFloat(cashAmount) < rideAmount}>
              Confirmar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <DriverConfirmationDialog
        open={showDriverDialog}
        onOpenChange={setShowDriverDialog}
        rideAmount={rideAmount}
        cashAmount={parseFloat(cashAmount || '0')}
        onComplete={handleDriverConfirmation}
      />
    </>
  );
};

export default CashPaymentDialog;
