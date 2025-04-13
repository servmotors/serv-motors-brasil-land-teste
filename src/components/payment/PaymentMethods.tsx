
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RideData } from '@/components/passageiro/booking/types';
import CreditCardPaymentForm from './methods/CreditCardPaymentForm';
import PixPaymentForm from './methods/PixPaymentForm';
import CashPaymentDialog from './dialogs/CashPaymentDialog';
import WalletBalanceDialog from './dialogs/WalletBalanceDialog';
import AddBalanceDialog from './dialogs/AddBalanceDialog';
import RideSummary from './RideSummary';
import PaymentMethodSelector from './PaymentMethodSelector';
import { usePaymentDialogs } from '@/hooks/usePaymentDialogs';

interface PaymentMethodsProps {
  rideData?: RideData;
  onPaymentComplete: (method: string) => void;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ 
  rideData,
  onPaymentComplete
}) => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const walletBalance = 50.75; // Exemplo - será obtido da API
  const rideAmount = rideData?.fare ? parseFloat(rideData.fare.replace('R$ ', '')) : 35.50;

  const { 
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
  } = usePaymentDialogs({
    walletBalance,
    rideAmount
  });

  const handlePaymentSelection = (value: string) => {
    setPaymentMethod(value);
    setShowForm(false);
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
          onClick={() => handleProceedPayment(paymentMethod, handlePaymentCompleted)}
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
