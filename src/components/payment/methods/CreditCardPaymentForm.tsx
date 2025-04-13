
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';

interface CreditCardPaymentFormProps {
  onCancel: () => void;
}

const formSchema = z.object({
  cardNumber: z.string().min(16, 'Número do cartão inválido').max(19),
  cardHolder: z.string().min(3, 'Nome inválido'),
  expiryDate: z.string().min(5, 'Data inválida'),
  cvv: z.string().min(3, 'CVV inválido').max(4),
});

const CreditCardPaymentForm: React.FC<CreditCardPaymentFormProps> = ({ onCancel }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Aqui seria a integração com Asaas
    console.log('Processando pagamento com cartão:', values);
    
    // Simulando processamento bem-sucedido
    toast({
      title: "Pagamento Processado",
      description: "Seu pagamento com cartão foi aprovado!",
    });
  };

  return (
    <div className="border-t mt-6 pt-6">
      <div className="flex items-center mb-4">
        <CreditCard className="h-5 w-5 mr-2 text-primary" />
        <h3 className="text-lg font-medium">Dados do Cartão</h3>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número do Cartão</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="0000 0000 0000 0000" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardHolder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome no Cartão</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Nome como está no cartão" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data de Validade</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="MM/AA" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="000" 
                      type="password"
                      maxLength={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit">
              Pagar
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreditCardPaymentForm;
