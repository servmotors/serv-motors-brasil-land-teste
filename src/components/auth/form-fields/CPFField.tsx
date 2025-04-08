
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import { formatCPF } from '@/utils/cpfValidator';

interface CPFFieldProps {
  id: string;
  label: string;
  register: any;
  error?: string;
  setValue: any;
  watch: any;
}

const CPFField = ({ 
  id, 
  label, 
  register,
  error,
  setValue,
  watch
}: CPFFieldProps) => {
  const cpfValue = watch(id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCPF(e.target.value);
    setValue(id, formattedValue, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          type="text"
          placeholder="000.000.000-00"
          className="pl-9"
          {...register(id)}
          value={cpfValue || ''}
          onChange={handleChange}
          maxLength={14}
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default CPFField;
