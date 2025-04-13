
import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

interface InfoBoxProps { 
  children: React.ReactNode;
  className?: string;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ 
  children,
  className 
}) => (
  <div className={`bg-secondary/40 p-3 rounded-md flex items-start mt-4 ${className || ''}`}>
    <Info size={20} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
    <p className="text-sm">{children}</p>
  </div>
);

interface ErrorAlertProps { 
  message: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ 
  message 
}) => (
  <div className="bg-destructive/10 p-3 rounded-md flex items-start mt-4">
    <AlertCircle size={20} className="text-destructive mr-2 mt-0.5 flex-shrink-0" />
    <p className="text-sm text-destructive">{message}</p>
  </div>
);
