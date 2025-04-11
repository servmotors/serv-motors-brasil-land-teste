
import React from 'react';
import { Button } from "@/components/ui/button";
import { X, Menu } from 'lucide-react';

interface MobileHeaderProps {
  showBookingPanel: boolean;
  toggleBookingPanel: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ 
  showBookingPanel, 
  toggleBookingPanel 
}) => {
  return (
    <div className="md:hidden bg-white py-3 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <button 
          onClick={toggleBookingPanel}
          className="bg-white p-2 rounded-full shadow"
        >
          {showBookingPanel ? <X size={20} /> : <Menu size={20} />}
        </button>
        <Button variant="outline" size="sm" className="text-xs" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>
          Use o aplicativo
        </Button>
      </div>
    </div>
  );
};

export default MobileHeader;
