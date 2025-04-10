
import React, { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDriverAvailability } from '@/hooks/useDriverAvailability';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MenuItem } from '@/types/dashboard';
import MobileHeader from '@/components/driver-dashboard/MobileHeader';
import DesktopSidebar from '@/components/driver-dashboard/DesktopSidebar';

interface DashboardLayoutProps {
  children: ReactNode;
  activeSection: string;
  setActiveSection: (id: string) => void;
  menuItems: MenuItem[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  activeSection, 
  setActiveSection,
  menuItems 
}) => {
  const { signOut } = useAuth();
  const { isAvailable, toggleAvailability } = useDriverAvailability(false);

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
            
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
