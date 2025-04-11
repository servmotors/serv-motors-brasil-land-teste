
import React from 'react';
import { Check, Clock, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import type { DriverWithProfile } from './types';

interface DriversListProps {
  isLoading: boolean;
  filteredDrivers: DriverWithProfile[];
  viewDriverDetails: (driver: DriverWithProfile) => void;
}

const DriversList: React.FC<DriversListProps> = ({
  isLoading,
  filteredDrivers,
  viewDriverDetails
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (filteredDrivers.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <UserCheck className="mx-auto h-12 w-12 text-gray-300" />
        <h3 className="mt-2 text-lg font-medium text-gray-600">Nenhum motorista encontrado</h3>
        <p className="text-gray-500 mt-1">Tente ajustar seus filtros ou buscar por outro termo.</p>
      </div>
    );
  }

  return (
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
                    <div className="text-sm text-gray-500">{driver.profiles?.email || "Email não disponível"}</div>
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
  );
};

export default DriversList;
