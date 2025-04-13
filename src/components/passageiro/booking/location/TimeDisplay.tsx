
import React from 'react';
import { Clock } from 'lucide-react';

const TimeDisplay: React.FC = () => {
  return (
    <div className="flex items-center">
      <Clock className="h-5 w-5 text-gray-500 mr-2" />
      <span className="text-gray-800">Agora</span>
    </div>
  );
};

export default TimeDisplay;
