
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentMethods from '@/components/payment/PaymentMethods';
import PaymentHeader from '@/components/payment/PaymentHeader';
import { RideData } from '@/components/passageiro/BookingPanel';
import { useToast } from '@/hooks/use-toast';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [rideData, setRideData] = useState<RideData | null>(null);

  useEffect(() => {
    // Get ride data from sessionStorage
    const storedRideData = sessionStorage.getItem('rideData');
    
    if (!storedRideData) {
      toast({
        title: "Erro",
        description: "Nenhuma viagem encontrada",
        variant: "destructive"
      });
      navigate('/passageiro');
      return;
    }
    
    setRideData(JSON.parse(storedRideData));
  }, [navigate, toast]);

  const handlePaymentComplete = (method: string) => {
    // Save the payment method to sessionStorage
    sessionStorage.setItem('paymentMethod', method);
    
    // For cash payment, navigate back immediately
    if (method === 'cash') {
      navigate('/passageiro');
    } else {
      // For other methods, show confirmation before navigating back
      toast({
        title: "Pagamento confirmado",
        description: "Você será redirecionado para buscar um motorista",
      });
      
      setTimeout(() => {
        navigate('/passageiro');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentHeader />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Forma de Pagamento</h1>
        {rideData && (
          <PaymentMethods 
            rideData={rideData}
            onPaymentComplete={handlePaymentComplete}
          />
        )}
      </div>
    </div>
  );
};

export default Payment;
