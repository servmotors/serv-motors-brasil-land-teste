
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UsePaymentDialogsProps {
  walletBalance: number;
  rideAmount: number;
}

export const usePaymentDialogs = ({ walletBalance, rideAmount }: UsePaymentDialogsProps) => {
  const [showForm, setShowForm] = useState(false);
  const [showCashDialog, setShowCashDialog] = useState(false);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showAddBalanceDialog, setShowAddBalanceDialog] = useState(false);
  const { toast } = useToast();

  const handleProceedPayment = (paymentMethod: string, onPaymentComplete: (method: string) => void) => {
    switch (paymentMethod) {
      case 'credit':
        setShowForm(true);
        break;
      case 'pix':
        setShowForm(true);
        break;
      case 'cash':
        setShowCashDialog(true);
        break;
      case 'wallet':
        if (walletBalance >= rideAmount) {
          setShowBalanceDialog(true);
        } else {
          toast({
            title: "Saldo insuficiente",
            description: "Seu saldo em carteira é insuficiente para esta corrida.",
            variant: "destructive"
          });
        }
        break;
      default:
        break;
    }
  };

  const handleAddBalance = () => {
    setShowAddBalanceDialog(true);
  };

  return {
    showForm,
    setShowForm,
    showCashDialog,
    setShowCashDialog,
    showBalanceDialog,
    setShowBalanceDialog,
    showAddBalanceDialog,
    setShowAddBalanceDialog,
    handleProceedPayment,
    handleAddBalance
  };
};
