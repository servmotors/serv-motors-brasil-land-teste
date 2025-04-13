
import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  DollarSign, 
  QrCode, 
  Plus 
} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import PaymentMethodCard from './PaymentMethodCard';
import CreditCardPaymentForm from './methods/CreditCardPaymentForm';
import PixPaymentForm from './methods/PixPaymentForm';
import CashPaymentDialog from './dialogs/CashPaymentDialog';
import WalletBalanceDialog from './dialogs/WalletBalanceDialog';
import AddBalanceDialog from './dialogs/AddBalanceDialog';

const PaymentMethods = () => {
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [showForm, setShowForm] = useState(false);
  const [showCashDialog, setShowCashDialog] = useState(false);
  const [showBalanceDialog, setShowBalanceDialog] = useState(false);
  const [showAddBalanceDialog, setShowAddBalanceDialog] = useState(false);
  const { toast } = useToast();

  const walletBalance = 50.75; // Exemplo - será obtido da API

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
        if (walletBalance >= 35.50) {
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

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Resumo da corrida</h2>
          <span className="text-xl font-bold">R$ 35,50</span>
        </div>
        <div className="flex justify-between text-gray-600 text-sm">
          <span>De: Av. Paulista, 1000</span>
          <span>Distância: 5.7 km</span>
        </div>
        <div className="text-gray-600 text-sm">
          <span>Para: Rua Augusta, 500</span>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Escolha como pagar</h2>
          {paymentMethod === 'wallet' && (
            <div className="flex items-center">
              <span className="text-sm font-medium mr-2">
                Saldo: R$ {walletBalance.toFixed(2)}
              </span>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleAddBalance}
                className="flex items-center"
              >
                <Plus className="h-4 w-4 mr-1" /> Adicionar
              </Button>
            </div>
          )}
        </div>

        <RadioGroup 
          value={paymentMethod} 
          onValueChange={handlePaymentSelection}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <PaymentMethodCard value="wallet">
            <Wallet className="h-5 w-5 mr-2 text-primary" />
            <div>
              <Label htmlFor="wallet" className="font-medium">Saldo em Carteira</Label>
              <p className="text-xs text-gray-500">Use seu saldo disponível</p>
            </div>
            <RadioGroupItem value="wallet" id="wallet" className="ml-auto" />
          </PaymentMethodCard>

          <PaymentMethodCard value="credit">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            <div>
              <Label htmlFor="credit" className="font-medium">Cartão de Crédito</Label>
              <p className="text-xs text-gray-500">Integração com Asaas</p>
            </div>
            <RadioGroupItem value="credit" id="credit" className="ml-auto" />
          </PaymentMethodCard>

          <PaymentMethodCard value="pix">
            <QrCode className="h-5 w-5 mr-2 text-primary" />
            <div>
              <Label htmlFor="pix" className="font-medium">Pix</Label>
              <p className="text-xs text-gray-500">Integração com Inter</p>
            </div>
            <RadioGroupItem value="pix" id="pix" className="ml-auto" />
          </PaymentMethodCard>

          <PaymentMethodCard value="cash">
            <DollarSign className="h-5 w-5 mr-2 text-primary" />
            <div>
              <Label htmlFor="cash" className="font-medium">Dinheiro</Label>
              <p className="text-xs text-gray-500">Pague diretamente ao motorista</p>
            </div>
            <RadioGroupItem value="cash" id="cash" className="ml-auto" />
          </PaymentMethodCard>
        </RadioGroup>
      </div>

      {showForm && paymentMethod === 'credit' && (
        <CreditCardPaymentForm onCancel={() => setShowForm(false)} />
      )}

      {showForm && paymentMethod === 'pix' && (
        <PixPaymentForm onCancel={() => setShowForm(false)} />
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
        rideAmount={35.50}
      />

      <WalletBalanceDialog 
        open={showBalanceDialog} 
        onOpenChange={setShowBalanceDialog}
        rideAmount={35.50}
        currentBalance={walletBalance}
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
