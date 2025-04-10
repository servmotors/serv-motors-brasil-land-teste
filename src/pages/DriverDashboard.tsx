
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useDriverAvailability } from '@/hooks/useDriverAvailability';
import {
  Car,
  History,
  LogOut,
  User,
  Wallet,
  Send,
  MapPin
} from 'lucide-react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MenuItem } from '@/types/dashboard';

// Dashboard Components
import DashboardSection from '@/components/driver-dashboard/DashboardSection';
import BalanceSection from '@/components/driver-dashboard/BalanceSection';
import HistorySection from '@/components/driver-dashboard/HistorySection';
import VehicleRegistrationSection from '@/components/driver-dashboard/vehicle-registration';
import WithdrawSection from '@/components/driver-dashboard/WithdrawSection';
import MobileHeader from '@/components/driver-dashboard/MobileHeader';
import DesktopSidebar from '@/components/driver-dashboard/DesktopSidebar';

const DriverDashboard = () => {
  const { user, profile, driverProfile, signOut } = useAuth();
  const { isAvailable, toggleAvailability } = useDriverAvailability(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
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
      value: 'R$ 0,00',
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
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <DesktopSidebar
          isAvailable={isAvailable}
          toggleAvailability={toggleAvailability}
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          signOut={signOut}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
          <MobileHeader
            isAvailable={isAvailable}
            toggleAvailability={toggleAvailability}
            menuItems={menuItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            signOut={signOut}
          />
          
          {/* Content Area */}
          <main className="container-custom py-8">
            <h1 className="text-3xl font-bold mb-8 md:hidden">
              {menuItems.find(item => item.id === activeSection)?.label || 'Painel do Motorista'}
            </h1>
            
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DriverDashboard;
