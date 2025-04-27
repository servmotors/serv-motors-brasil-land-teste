
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

const WelcomeHeader = () => {
  const { profile } = useAuth();
  
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-bold">
        Bem vindo, {profile?.full_name || 'Motorista'}
      </h1>
      <p className="text-gray-500">
        Painel do motorista
      </p>
    </div>
  );
};

export default WelcomeHeader;
