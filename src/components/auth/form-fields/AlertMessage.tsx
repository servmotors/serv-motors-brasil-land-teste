
import React from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface AlertMessageProps {
  message: string;
  variant: 'default' | 'destructive';
}

const AlertMessage = ({ message, variant }: AlertMessageProps) => {
  return (
    <Alert variant={variant} className="mb-4">
      <AlertCircle className="h-4 w-4 mr-2" />
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};

export default AlertMessage;
