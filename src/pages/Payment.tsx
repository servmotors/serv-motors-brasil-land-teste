
import React from 'react';
import PaymentMethods from '@/components/payment/PaymentMethods';
import PaymentHeader from '@/components/payment/PaymentHeader';

const Payment = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PaymentHeader />
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Forma de Pagamento</h1>
        <PaymentMethods />
      </div>
    </div>
  );
};

export default Payment;
