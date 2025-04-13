
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';

interface AddressInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: React.ReactNode;
  isLoading?: boolean;
  actionButton?: React.ReactNode;
}

const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  placeholder,
  icon,
  isLoading = false,
  actionButton
}) => {
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-3 pr-10 py-2"
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
        {isLoading ? (
          <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
        ) : (
          <>
            {actionButton}
            {icon}
          </>
        )}
      </div>
    </div>
  );
};

export default AddressInput;
