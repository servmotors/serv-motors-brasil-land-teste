
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useToast } from '@/hooks/use-toast';
import AdminSidebar from './sidebar/AdminSidebar';
import AdminMobileSidebar from './sidebar/AdminMobileSidebar';
import AdminMobileHeader from './header/AdminMobileHeader';
import AdminMainContent from './content/AdminMainContent';

type TabType = 'overview' | 'drivers' | 'rides';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Desconectado",
      description: "Você saiu da sua conta de administrador.",
    });
    navigate('/');
  };

  const openMobileMenu = () => setIsMobileMenuOpen(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <AdminSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleSignOut={handleSignOut} 
      />

      {/* Mobile Sidebar */}
      <AdminMobileSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        handleSignOut={handleSignOut} 
        isOpen={isMobileMenuOpen}
        onOpenChange={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <AdminMobileHeader openMobileMenu={openMobileMenu} />

        {/* Main Content Area */}
        <AdminMainContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default AdminDashboard;
