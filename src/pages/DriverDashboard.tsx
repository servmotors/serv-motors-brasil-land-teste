
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const DriverDashboard = () => {
  const { user, profile, signOut } = useAuth();
  
  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/motorista/auth" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4">
        <div className="container-custom flex justify-between items-center">
          <span className="text-2xl font-display font-bold text-primary">
            Serv<span className="text-black">Motors</span>
          </span>
          <Button variant="outline" onClick={signOut}>Sair</Button>
        </div>
      </header>
      
      <main className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-8">Painel do Motorista</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Bem-vindo, {profile?.full_name || user.email}!</h2>
          <p className="text-gray-600">
            Este é seu painel de controle como motorista parceiro da Serv Motors.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Status da conta</h2>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-amber-700">
              Sua conta está em análise. Entraremos em contato em breve para confirmar seus dados.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DriverDashboard;
