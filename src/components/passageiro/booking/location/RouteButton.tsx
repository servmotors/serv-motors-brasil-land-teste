
import React from 'react';
import { Button } from "@/components/ui/button";
import { Navigation, Loader2 } from 'lucide-react';

interface RouteButtonProps {
  onCalculateRoute: () => void;
  isDisabled: boolean;
  isLoading: boolean;
}

const RouteButton: React.FC<RouteButtonProps> = ({
  onCalculateRoute,
  isDisabled,
  isLoading
}) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onCalculateRoute}
      disabled={isDisabled}
      className="text-xs"
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
      ) : (
        <Navigation className="h-4 w-4 mr-1" />
      )}
      Calcular
    </Button>
  );
};

export default RouteButton;
