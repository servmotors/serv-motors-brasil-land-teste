
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const VehicleRegistrationSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cadastro de Veículo</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500 mb-4">
        Preencha as informações sobre seu veículo para começar a aceitar corridas.
      </p>
      <form className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Marca</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: Toyota"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Modelo</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: Corolla"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Ano</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: 2020"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Placa</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: ABC-1234"
          />
        </div>
        <Button className="w-full mt-4">Salvar Informações</Button>
      </form>
    </CardContent>
  </Card>
);

export default VehicleRegistrationSection;
