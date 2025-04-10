
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Car,
  History,
  LogOut,
  User,
  Wallet,
  Menu,
  X,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toggle } from '@/components/ui/toggle';
import { Switch } from '@/components/ui/switch';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter
} from '@/components/ui/sidebar';

const DriverDashboard = () => {
  const { user, profile, signOut } = useAuth();
  const [isAvailable, setIsAvailable] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // If not logged in, redirect to auth page
  if (!user) {
    return <Navigate to="/motorista/auth" />;
  }

  // Menu items for both desktop and mobile
  const menuItems = [
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
        return <DriverProfile profile={profile} />;
      case 'balance':
        return <BalanceSection />;
      case 'history':
        return <HistorySection />;
      case 'vehicle':
        return <VehicleRegistrationSection />;
      case 'withdraw':
        return <WithdrawSection />;
      default:
        return <DriverProfile profile={profile} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Desktop Sidebar */}
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
                  onCheckedChange={setIsAvailable} 
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

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
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
                    onCheckedChange={setIsAvailable} 
                    aria-label="Toggle disponibilidade"
                    size="sm"
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
                        <Button
                          key={item.id}
                          variant={activeSection === item.id ? "secondary" : "ghost"}
                          className="w-full justify-start mb-1"
                          onClick={() => setActiveSection(item.id)}
                        >
                          <span className={`${item.color} mr-2`}>{item.icon}</span>
                          <span>{item.label}</span>
                          {item.value && (
                            <span className="ml-auto font-medium text-green-600">{item.value}</span>
                          )}
                        </Button>
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

// Profile Component
const DriverProfile = ({ profile }: { profile: any }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Perfil do Motorista</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">Nome Completo</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.full_name || 'Não informado'}
          </div>
        </div>
        
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">E-mail</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.email || 'Não informado'}
          </div>
        </div>
        
        <div className="grid gap-2">
          <label className="text-sm font-medium text-gray-500">Telefone</label>
          <div className="p-3 bg-gray-50 rounded-md border">
            {profile?.phone || 'Não informado'}
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-amber-700">
            Sua conta está em análise. Entraremos em contato em breve para confirmar seus dados.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

// Balance Section
const BalanceSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Saldo Disponível</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="text-center py-6">
        <div className="text-4xl font-bold text-green-600">R$ 0,00</div>
        <p className="text-gray-500 mt-2">Saldo disponível para resgate</p>
      </div>

      <div className="border-t pt-4 mt-4">
        <h3 className="font-semibold mb-2">Resumo de Ganhos</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Este mês:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Último mês:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total de sempre:</span>
            <span className="font-medium">R$ 0,00</span>
          </div>
        </div>
      </div>
      
      <Button className="w-full mt-4">
        <Send className="h-4 w-4 mr-2" />
        Solicitar Resgate
      </Button>
    </CardContent>
  </Card>
);

// History Section
const HistorySection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Histórico de Corridas</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center py-10">
        <p className="text-gray-500">Você ainda não realizou nenhuma corrida.</p>
      </div>
    </CardContent>
  </Card>
);

// Vehicle Registration Section
const VehicleRegistrationSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Cadastro de Veículo</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-gray-500 mb-4">
        Preencha as informações sobre seu veículo para começar a aceitar corridas.
      </p>
      <form className="space-y-4">
        <div className="grid gap-2">
          <label className="text-sm font-medium">Marca</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: Toyota"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Modelo</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: Corolla"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Ano</label>
          <input 
            type="number" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: 2020"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium">Placa</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="Ex: ABC-1234"
          />
        </div>
        <Button className="w-full mt-4">Salvar Informações</Button>
      </form>
    </CardContent>
  </Card>
);

// Withdraw Section
const WithdrawSection = () => (
  <Card>
    <CardHeader>
      <CardTitle>Solicitar Resgate de Saldo</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        <div className="text-center py-4">
          <div className="text-3xl font-bold text-green-600">R$ 0,00</div>
          <p className="text-gray-500 mt-2">Saldo disponível</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md border">
          <h3 className="font-medium mb-2">Informações para resgate</h3>
          <p className="text-sm text-gray-600">
            O valor mínimo para resgate é de R$ 50,00. O processamento leva até 3 dias úteis.
          </p>
        </div>
        
        <div className="grid gap-3">
          <label className="text-sm font-medium">Valor para resgate</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded-md"
            placeholder="R$ 0,00"
            disabled
          />
        </div>
        
        <Button className="w-full" disabled>
          Solicitar Resgate
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default DriverDashboard;
