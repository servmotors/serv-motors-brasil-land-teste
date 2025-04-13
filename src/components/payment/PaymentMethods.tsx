
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import CreditCardPaymentForm from './methods/CreditCardPaymentForm';
import PixPaymentForm from './methods/PixPaymentForm';
import CashPaymentDialog from './dialogs/CashPaymentDialog';
import WalletBalanceDialog from './dialogs/WalletBalanceDialog';
import AddBalanceDialog from './dialogs/AddBalanceDialog';
import { RideData } from '@/components/passageiro/booking/BookingPanel';
import RideSummary from './RideSummary';
import PaymentMethodSelector from './PaymentMethodSelector';

interface PaymentMethodsProps {
  rideData?: RideData;
  onPaymentComplete: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  rideData,
  onPaymentComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [showForm, setShowForm] = useState(false);
  const [showCashDialog, setShowCashDialog] = useState(false);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showAddBalanceDialog, setShowAddBalanceDialog] = useState(false);
  const { toast } = useToast();

  const walletBalance = 50.75; // Exemplo - será obtido da API
  const rideAmount = rideData?.fare ? parseFloat(rideData.fare.replace('R$ ', '')) : 35.50;

  const handlePaymentSelection = (value: string) => {
    setPaymentMethod(value);
    setShowForm(false);
  };

  const handleProceedPayment = () => {
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

  const handlePaymentCompleted = (method: string) => {
    onPaymentComplete(method);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <RideSummary rideData={rideData} rideAmount={rideAmount} />

      <PaymentMethodSelector
        paymentMethod={paymentMethod}
        onPaymentMethodChange={handlePaymentSelection}
        walletBalance={walletBalance}
        onAddBalance={handleAddBalance}
      />

      {showForm && paymentMethod === 'credit' && (
        <CreditCardPaymentForm 
          onCancel={() => setShowForm(false)} 
          onComplete={() => handlePaymentCompleted('credit')}
        />
      )}

      {showForm && paymentMethod === 'pix' && (
        <PixPaymentForm 
          onCancel={() => setShowForm(false)}
          onComplete={() => handlePaymentCompleted('pix')}
        />
      )}

      <div className="mt-6">
        <Button 
          className="w-full" 
          size="lg"
          onClick={handleProceedPayment}
        >
          Continuar
        </Button>
      </div>

      <CashPaymentDialog 
        open={showCashDialog} 
        onOpenChange={setShowCashDialog} 
        rideAmount={rideAmount}
        onConfirm={() => handlePaymentCompleted('cash')}
      />

      <WalletBalanceDialog 
        open={showBalanceDialog} 
        onOpenChange={setShowBalanceDialog}
        rideAmount={rideAmount}
        currentBalance={walletBalance}
        onConfirm={() => handlePaymentCompleted('wallet')}
      />

      <AddBalanceDialog 
        open={showAddBalanceDialog} 
        onOpenChange={setShowAddBalanceDialog}
        currentBalance={walletBalance}
      />
    </div>
  );
};

export default PaymentMethods;
