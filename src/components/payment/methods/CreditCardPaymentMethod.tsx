
import React from 'react';
import { CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import PaymentMethodCard from '../PaymentMethodCard';

const CreditCardPaymentMethod: React.FC = () => {
  return (
    <PaymentMethodCard value="credit">
      <CreditCard className="h-5 w-5 mr-2 text-primary" />
      <div>
        <Label htmlFor="credit" className="font-medium">Cartão de Crédito</Label>
        <p className="text-xs text-gray-500">Integração com Asaas</p>
      </div>
      <RadioGroupItem value="credit" id="credit" className="ml-auto" />
    </PaymentMethodCard>
  );
};

export default CreditCardPaymentMethod;
