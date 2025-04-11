
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
import { DollarSign, PercentSquare } from 'lucide-react';

interface TaxAndFeeSettingsProps {
  control: any;
}

const TaxAndFeeSettings: React.FC<TaxAndFeeSettingsProps> = ({ control }) => {
  return (
    <div className="bg-white rounded-md shadow-sm mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Configuração</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="w-[300px]">Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <PercentSquare className="h-4 w-4 mr-2 text-primary" />
                Imposto Aproximado
              </div>
            </TableCell>
            <TableCell>
              <FormField
                control={control}
                name="taxRate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">%</span>
                        <Input {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="text-gray-500 text-sm">
              Percentual aproximado de impostos incluídos no valor da corrida
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell className="font-medium">
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2 text-primary" />
                Taxa do Parceiro de Pagamento
              </div>
            </TableCell>
            <TableCell>
              <FormField
                control={control}
                name="paymentPartnerFee"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2">R$</span>
                        <Input {...field} className="pl-8" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TableCell>
            <TableCell className="text-gray-500 text-sm">
              Valor cobrado pelo parceiro de pagamento por transação
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TaxAndFeeSettings;
