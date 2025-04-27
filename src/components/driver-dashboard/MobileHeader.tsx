
import React from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import DashboardMenuItem from './DashboardMenuItem';
import { LogOut } from 'lucide-react';
import { MenuItem } from '@/types/dashboard';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';

interface MobileHeaderProps {
  isAvailable: boolean;
  toggleAvailability: () => void;
  menuItems: MenuItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  signOut: () => void;
  balance: string;
}

const MobileHeader = ({
  isAvailable,
  toggleAvailability,
  menuItems,
  activeSection,
  setActiveSection,
  signOut,
  balance
}: MobileHeaderProps) => {
  const { toast } = useToast();
  
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
  
  const menuItemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

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
              onCheckedChange={handleToggleAvailability} 
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
                  <SheetClose asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <X className="h-4 w-4" />
                    </Button>
                  </SheetClose>
                </div>
              </div>
              
              <div className="px-2 py-4">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <SheetClose asChild>
                      <div>
                        <DashboardMenuItem
                          id={item.id}
                          label={item.label}
                          icon={item.icon}
                          color={item.color}
                          value={item.id === 'balance' ? balance : item.value}
                          isActive={activeSection === item.id}
                          onClick={(id) => {
                            setActiveSection(id);
                          }}
                        />
                      </div>
                    </SheetClose>
                  </motion.div>
                ))}
                
                <motion.div 
                  className="pt-4 mt-4 border-t"
                  variants={menuItemVariants}
                  custom={menuItems.length}
                  initial="hidden"
                  animate="visible"
                >
                  <SheetClose asChild>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-red-500 hover:text-red-600" 
                      onClick={signOut}
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Sair
                    </Button>
                  </SheetClose>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
