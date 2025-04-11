
import React from 'react';
import AdminOverview from '../AdminOverview';
import AdminDrivers from '../drivers/AdminDrivers';
import AdminRides from '../rides/AdminRides';
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
        return <AdminRides />;
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
