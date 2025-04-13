
import React from 'react';
import { Button } from "@/components/ui/button";

interface BookingButtonProps {
  shouldShowFindDriverButton: boolean;
  shouldShowPaymentButton: boolean;
  handleFindDriver: () => void;
  saveRideDataAndGoToPayment: () => void;
  getButtonText: () => string;
}

const BookingButton: React.FC<BookingButtonProps> = ({
  shouldShowFindDriverButton,
  shouldShowPaymentButton,
  handleFindDriver,
  saveRideDataAndGoToPayment,
  getButtonText
}) => {
  if (shouldShowFindDriverButton) {
    return (
      <Button 
        onClick={handleFindDriver}
        className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
      >
        Buscar Motorista
      </Button>
    );
  } 
  
  if (shouldShowPaymentButton) {
    return (
      <Button 
        onClick={saveRideDataAndGoToPayment}
        className="w-full bg-primary hover:bg-primary/90 text-black font-semibold"
      >
        {getButtonText()}
      </Button>
    );
  }
  
  return null;
};

export default BookingButton;
