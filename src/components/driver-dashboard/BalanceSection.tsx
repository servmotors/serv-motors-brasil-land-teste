
import React from 'react';
import { Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const BalanceSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Saldo Disponível</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center py-6">
        <div className="text-4xl font-bold text-green-600">R$ 0,00</div>
        <p className="text-gray-500 mt-2">Saldo disponível para resgate</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Resumo de Ganhos</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Este mês:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Último mês:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total de sempre:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
        </div>
      </div>
      
      <Button className="w-full mt-4">
        <Send className="h-4 w-4 mr-2" />
        Solicitar Resgate
      </Button>
    </CardContent>
  </Card>
);

export default BalanceSection;
