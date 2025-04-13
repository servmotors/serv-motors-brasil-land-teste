
import React from 'react';
import { DollarSign } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import PaymentMethodCard from '../PaymentMethodCard';

const CashPaymentMethod: React.FC = () => {
  return (
    <PaymentMethodCard value="cash">
      <DollarSign className="h-5 w-5 mr-2 text-primary" />
      <div>
        <Label htmlFor="cash" className="font-medium">Dinheiro</Label>
        <p className="text-xs text-gray-500">Pague diretamente ao motorista</p>
      </div>
      <RadioGroupItem value="cash" id="cash" className="ml-auto" />
    </PaymentMethodCard>
  );
};

export default CashPaymentMethod;
