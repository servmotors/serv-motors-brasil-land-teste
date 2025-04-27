
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Car,
  History,
  LogOut,
  User,
  Wallet,
  Send,
  MapPin
} from 'lucide-react';
import { MenuItem } from '@/types/dashboard';

// Dashboard Components
import DashboardSection from '@/components/driver-dashboard/DashboardSection';
import BalanceSection from '@/components/driver-dashboard/BalanceSection';
import HistorySection from '@/components/driver-dashboard/HistorySection';
import VehicleRegistrationSection from '@/components/driver-dashboard/vehicle-registration';
import WithdrawSection from '@/components/driver-dashboard/WithdrawSection';
import DashboardLayout from '@/components/driver-dashboard/DashboardLayout';

const DriverDashboard = () => {
  const { user, profile, driverProfile } = useAuth();
  const [activeSection, setActiveSection] = useState('vehicle'); // Iniciar no cadastro de veículos
  
  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/motorista/auth" />;
  }

  // Menu items for both desktop and mobile
  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Painel Principal',
      icon: <User className="h-5 w-5" />,
      color: 'text-blue-500'
    },
    {
      id: 'balance',
      label: 'Saldo',
      icon: <Wallet className="h-5 w-5" />,
      color: 'text-green-500'
    },
    {
      id: 'history',
      label: 'Histórico',
      icon: <History className="h-5 w-5" />,
      color: 'text-amber-500'
    },
    {
      id: 'vehicle',
      label: 'Cadastrar Veículo',
      icon: <Car className="h-5 w-5" />,
      color: 'text-purple-500'
    },
    {
      id: 'withdraw',
      label: 'Solicitar Resgate',
      icon: <Send className="h-5 w-5" />,
      color: 'text-indigo-500'
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection profile={profile} driverProfile={driverProfile} />;
      case 'balance':
        return <BalanceSection />;
      case 'history':
        return <HistorySection />;
      case 'vehicle':
        return <VehicleRegistrationSection />;
      case 'withdraw':
        return <WithdrawSection />;
      default:
        return <DashboardSection profile={profile} driverProfile={driverProfile} />;
    }
  };

  return (
    <DashboardLayout 
      activeSection={activeSection} 
      setActiveSection={setActiveSection} 
      menuItems={menuItems}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default DriverDashboard;
