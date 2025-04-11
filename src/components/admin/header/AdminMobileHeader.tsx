
import React from 'react';
import { SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface AdminMobileHeaderProps {
  openMobileMenu: () => void;
}

const AdminMobileHeader: React.FC<AdminMobileHeaderProps> = ({ openMobileMenu }) => {
  return (
    <header className="md:hidden bg-white p-4 flex items-center justify-between border-b border-gray-200">
      <div className="flex items-center">
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2" onClick={openMobileMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </SheetTrigger>
        <h1 className="text-lg font-bold">Admin Sistema</h1>
      </div>
    </header>
  );
};

export default AdminMobileHeader;
