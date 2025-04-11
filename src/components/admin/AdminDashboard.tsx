
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Truck, ClipboardList, Home, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useToast } from '@/hooks/use-toast';
import AdminDrivers from './AdminDrivers';
import AdminOverview from './AdminOverview';

type TabType = 'overview' | 'drivers' | 'rides';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { signOut, user } = useAuth();
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview />;
      case 'drivers':
        return <AdminDrivers />;
      case 'rides':
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <ClipboardList className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-600">Gerenciamento de Corridas</h3>
            <p className="text-gray-500 mt-2">Esta funcionalidade será implementada em breve.</p>
          </div>
        );
      default:
        return <AdminOverview />;
    }
  };

  const menuItems = [
    { id: 'overview', label: 'Visão Geral', icon: <Home size={20} /> },
    { id: 'drivers', label: 'Motoristas', icon: <Users size={20} /> },
    { id: 'rides', label: 'Corridas', icon: <Truck size={20} /> },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold">A</span>
            </div>
            <h1 className="ml-3 text-xl font-bold">Admin Panel</h1>
          </div>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id as TabType)}
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
      </aside>

      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="p-0">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="bg-primary h-8 w-8 rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">A</span>
              </div>
              <h1 className="ml-3 text-xl font-bold">Admin Panel</h1>
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

      {/* Main Content */}
      <div className="flex-1">
        {/* Mobile Header */}
        <header className="md:hidden bg-white p-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center">
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2" onClick={() => setIsMobileMenuOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </Button>
            </SheetTrigger>
            <h1 className="text-lg font-bold">Admin Panel</h1>
          </div>
        </header>

        <main className="p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold">{menuItems.find(item => item.id === activeTab)?.label}</h2>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            {renderTabContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
