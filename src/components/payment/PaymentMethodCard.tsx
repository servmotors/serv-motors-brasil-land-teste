
import React from 'react';

interface PaymentMethodCardProps {
  children: React.ReactNode;
  value: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({ 
  children, 
  value 
}) => {
  return (
    <label 
      htmlFor={value}
      className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      {children}
    </label>
  );
};

export default PaymentMethodCard;
