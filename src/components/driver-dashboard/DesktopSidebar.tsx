
import React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';
import { MenuItem } from '@/types/dashboard';

interface DesktopSidebarProps {
  isAvailable: boolean;
  toggleAvailability: () => void;
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  signOut: () => void;
}

const DesktopSidebar = ({
  isAvailable,
  toggleAvailability,
  menuItems,
  activeSection,
  setActiveSection,
  signOut
}: DesktopSidebarProps) => {
  return (
    <Sidebar className="hidden md:flex">
      <SidebarHeader className="p-4 border-b">
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-display font-bold text-primary">
            Serv<span className="text-black">Motors</span>
          </span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Disponível:</span>
            <Switch 
              checked={isAvailable} 
              onCheckedChange={toggleAvailability} 
              aria-label="Toggle disponibilidade"
            />
            <span className="text-sm font-medium">
              {isAvailable ? 'Sim' : 'Não'}
            </span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                onClick={() => setActiveSection(item.id)}
                isActive={activeSection === item.id}
                className="w-full justify-start"
              >
                <span className={`${item.color}`}>{item.icon}</span>
                <span>{item.label}</span>
                {item.value && (
                  <span className="ml-auto font-medium text-green-600">{item.value}</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-600" 
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DesktopSidebar;
