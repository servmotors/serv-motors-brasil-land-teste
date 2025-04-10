
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const WithdrawSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Solicitar Resgate de Saldo</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-green-600">R$ 0,00</div>
          <p className="text-gray-500 mt-2">Saldo disponível</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border">
          <h3 className="font-medium mb-2">Informações para resgate</h3>
          <p className="text-sm text-gray-600">
            O valor mínimo para resgate é de R$ 50,00. O processamento leva até 3 dias úteis.
          </p>
        </div>
        
        <div className="grid gap-3">
          <label className="text-sm font-medium">Valor para resgate</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="R$ 0,00"
            disabled
          />
        </div>
        
        <Button className="w-full" disabled>
          Solicitar Resgate
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default WithdrawSection;
