
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-sm">
      <div className="container max-w-4xl mx-auto p-4 flex items-center">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 rounded-full hover:bg-gray-100"
          aria-label="Voltar"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="ml-4 text-lg font-semibold">Pagamento</h1>
      </div>
    </div>
  );
};

export default PaymentHeader;
