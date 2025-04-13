
import React from 'react';
import { QrCode } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import PaymentMethodCard from '../PaymentMethodCard';

const PixPaymentMethod: React.FC = () => {
  return (
    <PaymentMethodCard value="pix">
      <QrCode className="h-5 w-5 mr-2 text-primary" />
      <div>
        <Label htmlFor="pix" className="font-medium">Pix</Label>
        <p className="text-xs text-gray-500">Integração com Inter</p>
      </div>
      <RadioGroupItem value="pix" id="pix" className="ml-auto" />
    </PaymentMethodCard>
  );
};

export default PixPaymentMethod;
