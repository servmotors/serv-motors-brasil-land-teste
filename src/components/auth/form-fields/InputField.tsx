
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { LucideIcon } from 'lucide-react';

interface InputFieldProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  error?: string;
  icon: LucideIcon;
  register: any;
  registerOptions?: object;
}

const InputField = ({ 
  id, 
  label, 
  placeholder, 
  type = 'text', 
  error, 
  icon: Icon, 
  register,
  registerOptions = {}
}: InputFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          className="pl-9"
          {...register(id, registerOptions)}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default InputField;
