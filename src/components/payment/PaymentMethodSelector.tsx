
import React from 'react';
import { RadioGroup } from '@/components/ui/radio-group';
import WalletPaymentMethod from './methods/WalletPaymentMethod';
import CreditCardPaymentMethod from './methods/CreditCardPaymentMethod';
import PixPaymentMethod from './methods/PixPaymentMethod';
import CashPaymentMethod from './methods/CashPaymentMethod';

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  onPaymentMethodChange: (value: string) => void;
  walletBalance: number;
  onAddBalance: () => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  paymentMethod,
  onPaymentMethodChange,
  walletBalance,
  onAddBalance
}) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Escolha como pagar</h2>
      </div>

      <RadioGroup 
        value={paymentMethod} 
        onValueChange={onPaymentMethodChange}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <WalletPaymentMethod 
          value="wallet" 
          walletBalance={walletBalance} 
          onAddBalance={onAddBalance} 
        />
        <CreditCardPaymentMethod />
        <PixPaymentMethod />
        <CashPaymentMethod />
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelector;
