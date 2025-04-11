
import React from 'react';
import { Users, Truck, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AdminOverview: React.FC = () => {
  const stats = [
    { 
      title: 'Motoristas Cadastrados', 
      value: '42', 
      change: '+12%', 
      isPositive: true,
      icon: <Users className="h-8 w-8 text-blue-500" />
    },
    { 
      title: 'Aprovações Pendentes', 
      value: '7', 
      change: '-3', 
      isPositive: false,
      icon: <Calendar className="h-8 w-8 text-amber-500" />
    },
    { 
      title: 'Corridas Realizadas', 
      value: '156', 
      change: '+23%', 
      isPositive: true,
      icon: <Truck className="h-8 w-8 text-green-500" />
    },
    { 
      title: 'Receita Total', 
      value: 'R$ 12.450', 
      change: '+18%', 
      isPositive: true,
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
                  <div className={`flex items-center mt-1 text-sm ${
                    stat.isPositive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <span>{stat.change}</span>
                    <span className="ml-1 text-xs">em 30 dias</span>
                  </div>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">{stat.icon}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
            <div className="space-y-4">
              {[
                { user: 'Carlos Silva', action: 'se cadastrou como motorista', time: '2 horas atrás' },
                { user: 'Ana Oliveira', action: 'atualizou documentação', time: '5 horas atrás' },
                { user: 'Roberto Santos', action: 'foi aprovado como motorista', time: '1 dia atrás' },
                { user: 'Juliana Costa', action: 'completou 10 corridas', time: '2 dias atrás' }
              ].map((activity, index) => (
                <div key={index} className="flex items-start">
                  <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-3">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Motoristas</h3>
            <div className="space-y-4">
              {[
                { name: 'Roberto Santos', rides: 45, rating: 4.9 },
                { name: 'Juliana Costa', rides: 38, rating: 4.8 },
                { name: 'Mateus Almeida', rides: 32, rating: 4.7 },
                { name: 'Luciana Ferreira', rides: 29, rating: 4.9 }
              ].map((driver, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {driver.name.charAt(0)}
                      </div>
                      <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary rounded-full flex items-center justify-center text-xs text-primary-foreground font-bold">
                        {index + 1}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{driver.name}</p>
                      <p className="text-xs text-gray-500">{driver.rides} corridas</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-green-50 text-green-700 px-2 py-1 rounded text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {driver.rating}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;
