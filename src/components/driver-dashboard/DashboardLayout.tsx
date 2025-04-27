
import React, { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useDriverAvailability } from '@/hooks/useDriverAvailability';
import { SidebarProvider } from '@/components/ui/sidebar';
import { MenuItem } from '@/types/dashboard';
import MobileHeader from '@/components/driver-dashboard/MobileHeader';
import DesktopSidebar from '@/components/driver-dashboard/DesktopSidebar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { user, signOut, profile, driverProfile } = useAuth();
  const { isAvailable, toggleAvailability } = useDriverAvailability(false);
  const [showVehicleSelector, setShowVehicleSelector] = useState(false);
  const { toast } = useToast();
  const [balance, setBalance] = useState("R$ 0,00");
  
  // Verificar se o motorista tem mais de um veículo cadastrado
  // Por enquanto, estamos apenas simulando com uma verificação básica
  const hasMultipleVehicles = false;
  const vehicles = [{id: 1, name: 'Veículo Principal'}];
  
  useEffect(() => {
    // Aqui seria onde buscaríamos o saldo real do motorista
    // Por enquanto, estamos apenas usando um valor padrão
    if (driverProfile) {
      setBalance("R$ 0,00");
    }
  }, [driverProfile]);
  
  const handleAvailabilityToggle = () => {
    if (!isAvailable && hasMultipleVehicles) {
      // Se o motorista está ficando disponível e tem mais de um veículo,
      // mostrar o seletor de veículo
      setShowVehicleSelector(true);
    } else {
      // Caso contrário, apenas alternar disponibilidade
      toggleAvailability();
    }
  };
  
  const handleVehicleSelect = (vehicleId: number) => {
    // Aqui definiríamos o veículo selecionado
    // Por enquanto, apenas fechamos o diálogo e tornamos disponível
    setShowVehicleSelector(false);
    toggleAvailability();
    toast({
      title: "Veículo selecionado",
      description: "Você está agora disponível para corridas."
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
        <DesktopSidebar
          isAvailable={isAvailable}
          toggleAvailability={handleAvailabilityToggle}
          menuItems={menuItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          signOut={signOut}
          balance={balance}
        />

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
          <MobileHeader
            isAvailable={isAvailable}
            toggleAvailability={handleAvailabilityToggle}
            menuItems={menuItems}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            signOut={signOut}
            balance={balance}
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
      
      {/* Diálogo de Seleção de Veículo */}
      <Dialog open={showVehicleSelector} onOpenChange={setShowVehicleSelector}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione o veículo para corridas</DialogTitle>
            <DialogDescription>
              Escolha qual veículo você usará para aceitar corridas.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            {vehicles.map(vehicle => (
              <Button 
                key={vehicle.id} 
                className="w-full justify-start" 
                onClick={() => handleVehicleSelect(vehicle.id)}
              >
                {vehicle.name}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default DashboardLayout;
