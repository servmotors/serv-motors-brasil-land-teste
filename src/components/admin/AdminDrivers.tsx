
import React, { useState, useEffect } from 'react';
import { Check, X, Search, UserCheck, Clock, Filter, ChevronDown } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { DriverType } from '@/contexts/auth/types';

type DriverWithProfile = DriverType & {
  profiles: {
    email: string;
    full_name: string;
    avatar_url: string | null;
  } | null;
};

type FilterStatus = 'all' | 'pending' | 'approved';

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

      return data as DriverWithProfile[];
    },
  });

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = 
      driver.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.transport_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.vehicle_plate?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.profiles?.email.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar motoristas..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Status
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={filterStatus} onValueChange={(value) => setFilterStatus(value as FilterStatus)}>
                <DropdownMenuRadioItem value="all">Todos</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pending">Pendentes</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="approved">Aprovados</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      ) : filteredDrivers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <UserCheck className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-2 text-lg font-medium text-gray-600">Nenhum motorista encontrado</h3>
          <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou buscar por outro termo.</p>
        </div>
      ) : (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Motorista</TableHead>
                <TableHead>Veículo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data de Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDrivers.map((driver) => (
                <TableRow key={driver.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                        {driver.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{driver.full_name}</div>
                        <div className="text-sm text-gray-500">{driver.profiles?.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{driver.transport_type || "Não informado"}</div>
                      <div className="text-sm text-gray-500">
                        {driver.vehicle_make && driver.vehicle_model
                          ? `${driver.vehicle_make} ${driver.vehicle_model}`
                          : "Veículo não informado"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {driver.is_approved ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" />
                        Aprovado
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        <Clock className="mr-1 h-3 w-3" />
                        Pendente
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(driver.created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewDriverDetails(driver)}
                    >
                      Ver detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedDriver && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Detalhes do Motorista</DialogTitle>
              <DialogDescription>
                Informações completas do motorista selecionado.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex flex-col items-center mb-4">
                <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-3xl font-medium mb-2">
                  {selectedDriver.full_name.charAt(0)}
                </div>
                <h3 className="text-lg font-semibold">{selectedDriver.full_name}</h3>
                <p className="text-gray-500">{selectedDriver.profiles?.email}</p>
                
                {selectedDriver.is_approved ? (
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Check className="mr-1 h-3 w-3" />
                    Aprovado
                  </span>
                ) : (
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    <Clock className="mr-1 h-3 w-3" />
                    Aprovação Pendente
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">CPF</p>
                    <p>{selectedDriver.cpf}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone</p>
                    <p>{selectedDriver.phone}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">CNH</p>
                    <p>{selectedDriver.cnh}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Categoria</p>
                    <p>{selectedDriver.cnh_category}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Tipo de Transporte</p>
                  <p>{selectedDriver.transport_type || "Não informado"}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Veículo</p>
                    <p>
                      {selectedDriver.vehicle_make && selectedDriver.vehicle_model
                        ? `${selectedDriver.vehicle_make} ${selectedDriver.vehicle_model}`
                        : "Não informado"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Placa</p>
                    <p>{selectedDriver.vehicle_plate || "Não informada"}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Data de Cadastro</p>
                  <p>{new Date(selectedDriver.created_at).toLocaleDateString('pt-BR', { 
                    day: '2-digit', 
                    month: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</p>
                </div>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              {!selectedDriver.is_approved ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectDriver(selectedDriver.id)}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                  >
                    <X className="h-4 w-4" />
                    Rejeitar
                  </Button>
                  <Button
                    onClick={() => handleApproveDriver(selectedDriver.id)}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-4 w-4" />
                    Aprovar
                  </Button>
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleRejectDriver(selectedDriver.id)}
                  className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                >
                  <X className="h-4 w-4" />
                  Revogar Aprovação
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Fechar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AdminDrivers;
