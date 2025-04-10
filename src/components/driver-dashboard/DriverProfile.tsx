
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DriverProfileProps {
  profile: any;
}

const DriverProfile = ({ profile }: DriverProfileProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Motorista</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">Nome Completo</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.full_name || 'Não informado'}
          </div>
        </div>
        
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">E-mail</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.email || 'Não informado'}
          </div>
        </div>
        
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">Telefone</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.phone || 'Não informado'}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-amber-700">
            Sua conta está em análise. Entraremos em contato em breve para confirmar seus dados.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DriverProfile;
