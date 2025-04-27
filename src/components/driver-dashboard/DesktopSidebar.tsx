
import React, { useState } from 'react';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface DesktopSidebarProps {
  isAvailable: boolean;
  toggleAvailability: () => void;
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  signOut: () => void;
  balance: string;
}

const DesktopSidebar = ({
  isAvailable,
  toggleAvailability,
  menuItems,
  activeSection,
  setActiveSection,
  signOut,
  balance
}: DesktopSidebarProps) => {
  const { toast } = useToast();
  const [collapsed, setCollapsed] = useState(false);
  
  const handleToggleAvailability = () => {
    // Se o motorista estiver ficando disponível, aqui seria o lugar para verificar 
    // se tem mais de um veículo e exibir o popup para seleção
    toggleAvailability();
    
    if (!isAvailable) {
      toast({
        title: 'Você está disponível para corridas',
        description: 'Agora você poderá receber solicitações de corridas.',
      });
    } else {
      toast({
        title: 'Você está indisponível para corridas',
        description: 'Você não receberá solicitações de corridas.',
      });
    }
  };

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
              onCheckedChange={handleToggleAvailability} 
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
                {item.id === 'balance' && (
                  <span className="ml-auto font-medium text-green-600">{balance}</span>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t flex flex-col space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start text-red-500 hover:text-red-600" 
          onClick={signOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? 
            <ChevronRight className="h-4 w-4" /> : 
            <ChevronLeft className="h-4 w-4" />
          }
          <span className="sr-only">
            {collapsed ? 'Expandir' : 'Recolher'} menu
          </span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default DesktopSidebar;
