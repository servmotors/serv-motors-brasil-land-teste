
import React from 'react';
import AdminOverview from '../AdminOverview';
import AdminDrivers from '../drivers/AdminDrivers';
import { ClipboardList } from 'lucide-react';

type TabType = 'overview' | 'drivers' | 'rides';

interface AdminMainContentProps {
  activeTab: TabType;
}

const AdminMainContent: React.FC<AdminMainContentProps> = ({ activeTab }) => {
  const menuItems = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'drivers', label: 'Motoristas' },
    { id: 'rides', label: 'Corridas' },
  ];

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

  return (
    <main className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{menuItems.find(item => item.id === activeTab)?.label}</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        {renderTabContent()}
      </div>
    </main>
  );
};

export default AdminMainContent;
