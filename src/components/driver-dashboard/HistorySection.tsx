
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

export default HistorySection;
