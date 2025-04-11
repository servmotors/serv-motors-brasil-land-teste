
import React from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import type { DriverWithProfile } from './types';

interface DriverDetailsProps {
  selectedDriver: DriverWithProfile | null;
  isViewDialogOpen: boolean;
  setIsViewDialogOpen: (isOpen: boolean) => void;
  handleApproveDriver: (driverId: string) => Promise<void>;
  handleRejectDriver: (driverId: string) => Promise<void>;
}

const DriverDetails: React.FC<DriverDetailsProps> = ({
  selectedDriver,
  isViewDialogOpen,
  setIsViewDialogOpen,
  handleApproveDriver,
  handleRejectDriver
}) => {
  if (!selectedDriver) return null;

  return (
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
            <p className="text-gray-500">{selectedDriver.profiles?.email || "Email não disponível"}</p>
            
            {selectedDriver.is_approved ? (
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                <Check className="mr-1 h-3 w-3" />
                Aprovado
              </span>
            ) : (
              <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                <Check className="mr-1 h-3 w-3" />
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
  );
};

export default DriverDetails;
