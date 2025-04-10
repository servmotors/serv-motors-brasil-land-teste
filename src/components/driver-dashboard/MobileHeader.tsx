
import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import DashboardMenuItem from './DashboardMenuItem';
import { LogOut } from 'lucide-react';
import { MenuItem } from '@/types/dashboard';

interface MobileHeaderProps {
  isAvailable: boolean;
  toggleAvailability: () => void;
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  signOut: () => void;
}

const MobileHeader = ({
  isAvailable,
  toggleAvailability,
  menuItems,
  activeSection,
  setActiveSection,
  signOut
}: MobileHeaderProps) => {
  return (
    <header className="bg-white shadow-sm py-4 md:hidden">
      <div className="container-custom flex justify-between items-center">
        <span className="text-2xl font-display font-bold text-primary">
          Serv<span className="text-black">Motors</span>
        </span>
        
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 mr-2">
            <span className="text-sm text-gray-500">Disponível:</span>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={toggleAvailability} 
              aria-label="Toggle disponibilidade"
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <div className="py-4 px-5 border-b">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-display font-bold text-primary">
                    Serv<span className="text-black">Motors</span>
                  </span>
                </div>
              </div>
              
              <div className="px-2 py-4">
                {menuItems.map((item) => (
                  <DashboardMenuItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    color={item.color}
                    value={item.value}
                    isActive={activeSection === item.id}
                    onClick={setActiveSection}
                  />
                ))}
                
                <div className="pt-4 mt-4 border-t">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start text-red-500 hover:text-red-600" 
                    onClick={signOut}
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
