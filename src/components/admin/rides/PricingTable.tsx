
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ui/table';
import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { 
  DollarSign, 
  Clock, 
  PercentSquare,
  Trash2
} from 'lucide-react';

type PricingType = 'perMinute' | 'percentage';

interface PricingRowProps {
  name: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  control: any;
  onDelete?: () => void;
  showDelete?: boolean;
}

const PricingRow: React.FC<PricingRowProps> = ({ 
  name, 
  label, 
  description, 
  icon, 
  control,
  onDelete,
  showDelete = false
}) => {
  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex items-center">
          {icon}
          {label}
        </div>
      </TableCell>
      <TableCell>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormControl>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2">
                    {name.includes('percentage') || name.includes('taxRate') ? '%' : 'R$'}
                  </span>
                  <Input {...field} className="pl-8" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </TableCell>
      <TableCell className="text-gray-500 text-sm">
        {description}
      </TableCell>
      {showDelete && (
        <TableCell className="text-right">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </TableCell>
      )}
    </TableRow>
  );
};

interface PricingTableProps {
  control: any;
  vehicleType: 'car' | 'motorcycle';
  additionalStopPricingType: PricingType;
  onStopPricingTypeChange: (type: PricingType) => void;
  onDeletePrice?: (priceId: string) => void;
}

const PricingTable: React.FC<PricingTableProps> = ({ 
  control, 
  vehicleType,
  additionalStopPricingType,
  onStopPricingTypeChange,
  onDeletePrice
}) => {
  const prefix = vehicleType === 'car' ? 'car' : 'motorcycle';
  
  return (
    <div className="bg-white rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Tipo de Cobrança</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-[300px]">Descrição</TableHead>
            {onDeletePrice && <TableHead className="w-[80px]"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          <PricingRow
            name={`${prefix}MinRidePrice`}
            label="Valor Mínimo"
            description="Valor mínimo cobrado por corridas de até 3km"
            icon={<DollarSign className="h-4 w-4 mr-2 text-primary" />}
            control={control}
            showDelete={!!onDeletePrice}
            onDelete={() => onDeletePrice?.(`${prefix}MinRidePrice`)}
          />

          <PricingRow
            name={`${prefix}PricePerKm`}
            label="Valor por Km"
            description="Valor cobrado por quilômetro percorrido"
            icon={<DollarSign className="h-4 w-4 mr-2 text-primary" />}
            control={control}
            showDelete={!!onDeletePrice}
            onDelete={() => onDeletePrice?.(`${prefix}PricePerKm`)}
          />

          <PricingRow
            name={`${prefix}AdditionalKmPrice`}
            label="Km Adicional"
            description="Valor por quilômetro excedente ao estimado inicialmente"
            icon={<DollarSign className="h-4 w-4 mr-2 text-primary" />}
            control={control}
            showDelete={!!onDeletePrice}
            onDelete={() => onDeletePrice?.(`${prefix}AdditionalKmPrice`)}
          />

          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2 text-primary" />
                Parada Adicional
              </div>
            </TableCell>
            <TableCell>
              <div className="flex space-x-2 items-center">
                <FormField
                  control={control}
                  name={`${prefix}AdditionalStopPrice`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">
                            {additionalStopPricingType === 'percentage' ? '%' : 'R$'}
                          </span>
                          <Input {...field} className="pl-8" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-1">
                  <Button
                    type="button"
                    size="sm"
                    variant={additionalStopPricingType === 'perMinute' ? 'default' : 'outline'}
                    onClick={() => onStopPricingTypeChange('perMinute')}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Por minuto
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={additionalStopPricingType === 'percentage' ? 'default' : 'outline'}
                    onClick={() => onStopPricingTypeChange('percentage')}
                  >
                    <PercentSquare className="h-4 w-4 mr-1" />
                    Percentual
                  </Button>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-gray-500 text-sm">
              {additionalStopPricingType === 'perMinute' 
                ? 'Valor por minuto em paradas solicitadas pelo passageiro' 
                : 'Percentual do valor da corrida para paradas solicitadas'}
            </TableCell>
            {onDeletePrice && (
              <TableCell className="text-right">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onDeletePrice(`${prefix}AdditionalStopPrice`)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default PricingTable;
