
import React from 'react';
import { Wallet } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroupItem } from '@/components/ui/radio-group';
import PaymentMethodCard from '../PaymentMethodCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface WalletPaymentMethodProps {
  value: string;
  walletBalance: number;
  onAddBalance: () => void;
}

const WalletPaymentMethod: React.FC<WalletPaymentMethodProps> = ({ 
  value, 
  walletBalance,
  onAddBalance
}) => {
  return (
    <PaymentMethodCard value="wallet">
      <Wallet className="h-5 w-5 mr-2 text-primary" />
      <div>
        <Label htmlFor="wallet" className="font-medium">Saldo em Carteira</Label>
        <p className="text-xs text-gray-500">Use seu saldo disponível</p>
      </div>
      <div className="flex items-center ml-auto">
        <span className="text-sm font-medium mr-2">
          R$ {walletBalance.toFixed(2)}
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={(e) => {
            e.preventDefault();
            onAddBalance();
          }}
          className="flex items-center"
        >
          <Plus className="h-4 w-4 mr-1" /> Adicionar
        </Button>
        <RadioGroupItem value="wallet" id="wallet" className="ml-2" />
      </div>
    </PaymentMethodCard>
  );
};

export default WalletPaymentMethod;
