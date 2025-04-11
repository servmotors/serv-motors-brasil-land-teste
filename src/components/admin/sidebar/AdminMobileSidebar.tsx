
import React from 'react';
import { Users, Truck, ClipboardList, Home, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';

type TabType = 'overview' | 'drivers' | 'rides';

interface AdminMobileSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  handleSignOut: () => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AdminMobileSidebar: React.FC<AdminMobileSidebarProps> = ({
  activeTab,
  setActiveTab,
  handleSignOut,
  isOpen,
  onOpenChange,
}) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: <Home size={20} /> },
    { id: 'drivers', label: 'Motoristas', icon: <Users size={20} /> },
    { id: 'rides', label: 'Corridas', icon: <Truck size={20} /> },
  ];

  const closeMobileMenu = () => onOpenChange(false);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <h1 className="ml-3 text-xl font-bold">Admin Sistema</h1>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id as TabType);
                    closeMobileMenu();
                  }}
                  className={`w-full flex items-center px-4 py-2 rounded-md transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleSignOut}
          >
            <LogOut size={18} className="mr-2" />
            Sair
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default AdminMobileSidebar;
