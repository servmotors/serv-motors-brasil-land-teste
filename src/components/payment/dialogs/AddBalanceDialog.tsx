
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, QrCode, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AddBalanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance: number;
}

const AddBalanceDialog: React.FC<AddBalanceDialogProps> = ({
  open,
  onOpenChange,
  currentBalance
}) => {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('pix');
  
  const handleAddBalance = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      toast({
        title: "Valor inválido",
        description: "Por favor, informe um valor válido para adicionar.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulação de processamento
    toast({
      title: "Processando...",
      description: `Estamos processando sua adição de R$ ${numAmount.toFixed(2)}`,
    });
    
    // Aqui seria redirecionado para a forma de pagamento específica
    setTimeout(() => {
      toast({
        title: "Saldo adicionado",
        description: `R$ ${numAmount.toFixed(2)} foi adicionado à sua carteira.`,
      });
      onOpenChange(false);
    }, 2000);
  };
  
  const predefinedAmounts = [15, 25, 50, 100];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Plus className="h-5 w-5 mr-2 text-primary" />
            Adicionar Saldo à Carteira
          </DialogTitle>
          <DialogDescription>
            Escolha o valor e a forma de pagamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Saldo atual:</p>
            <p className="text-xl font-bold">R$ {currentBalance.toFixed(2)}</p>
          </div>
          
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Valor para adicionar:
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <Input
                type="number"
                min="5"
                step="0.01"
                className="pl-10"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0,00"
              />
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {predefinedAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  onClick={() => setAmount(amt.toString())}
                  className="text-sm"
                >
                  R$ {amt}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="pt-4">
            <p className="text-sm font-medium mb-2">
              Forma de pagamento:
            </p>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pix" className="flex items-center">
                  <QrCode className="h-4 w-4 mr-2" />
                  PIX
                </TabsTrigger>
                <TabsTrigger value="credit" className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Cartão
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pix" className="pt-2">
                <p className="text-sm text-gray-600">
                  Você será redirecionado para fazer um PIX do valor selecionado.
                </p>
              </TabsContent>
              <TabsContent value="credit" className="pt-2">
                <p className="text-sm text-gray-600">
                  Você será redirecionado para adicionar dados do seu cartão.
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={handleAddBalance}>
            Adicionar Saldo
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddBalanceDialog;
