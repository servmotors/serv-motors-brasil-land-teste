
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import DriverSearchFilters from './DriverSearchFilters';
import DriversList from './DriversList';
import DriverDetails from './DriverDetails';
import type { DriverWithProfile, FilterStatus } from './types';

const AdminDrivers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<DriverWithProfile | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const { toast } = useToast();

  const { data: drivers = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-drivers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('drivers')
        .select(`
          *,
          profiles: user_id (
            email,
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data as unknown as DriverWithProfile[];
    },
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (driver.transport_type && driver.transport_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (driver.vehicle_plate && driver.vehicle_plate.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (driver.profiles?.email && driver.profiles.email.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filterStatus === 'all') return matchesSearch;
    if (filterStatus === 'pending') return !driver.is_approved && matchesSearch;
    if (filterStatus === 'approved') return driver.is_approved && matchesSearch;
    
    return matchesSearch;
  });

  const handleApproveDriver = async (driverId: string) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({ is_approved: true })
        .eq('id', driverId);

      if (error) throw error;

      toast({
        title: "Motorista aprovado",
        description: "O motorista foi aprovado com sucesso.",
      });

      refetch();
      setIsViewDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao aprovar motorista",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleRejectDriver = async (driverId: string) => {
    try {
      const { error } = await supabase
        .from('drivers')
        .update({ is_approved: false })
        .eq('id', driverId);

      if (error) throw error;

      toast({
        title: "Motorista rejeitado",
        description: "O motorista foi rejeitado com sucesso.",
      });

      refetch();
      setIsViewDialogOpen(false);
    } catch (error: any) {
      toast({
        title: "Erro ao rejeitar motorista",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const viewDriverDetails = (driver: DriverWithProfile) => {
    setSelectedDriver(driver);
    setIsViewDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <DriverSearchFilters 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />

      <DriversList
        isLoading={isLoading}
        filteredDrivers={filteredDrivers}
        viewDriverDetails={viewDriverDetails}
      />

      <DriverDetails
        selectedDriver={selectedDriver}
        isViewDialogOpen={isViewDialogOpen}
        setIsViewDialogOpen={setIsViewDialogOpen}
        handleApproveDriver={handleApproveDriver}
        handleRejectDriver={handleRejectDriver}
      />
    </div>
  );
};

export default AdminDrivers;
