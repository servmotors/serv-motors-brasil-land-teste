
import React, { useState } from 'react';
import { MapPin, Warehouse, Home } from 'lucide-react';
import InputField from '../form-fields/InputField';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface AddressFieldsProps {
  register: any;
  errors: any;
  setValue: any;
  watch: any;
}

const brazilianStates = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

const AddressFields = ({ register, errors, setValue, watch }: AddressFieldsProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const cep = watch('cep');

  const searchAddressByCep = async () => {
    if (!cep || cep.length !== 8) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      
      if (!data.erro) {
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="cep">CEP</Label>
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              id="cep"
              type="text"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
              placeholder="00000-000"
              {...register('cep')}
            />
          </div>
          <Button 
            type="button" 
            onClick={searchAddressByCep}
            disabled={isSearching || !cep || cep.length !== 8}
            className="h-10 whitespace-nowrap"
          >
            {isSearching ? 'Buscando...' : 'Buscar CEP'}
          </Button>
        </div>
        {errors.cep?.message && (
          <p className="text-sm text-red-500">{errors.cep?.message}</p>
        )}
      </div>
      
      <InputField
        id="street"
        label="Rua"
        placeholder="Nome da rua"
        icon={Warehouse}
        register={register}
        error={errors.street?.message}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="number"
          label="Número"
          placeholder="000"
          icon={Home}
          register={register}
          error={errors.number?.message}
        />
        
        <InputField
          id="complement"
          label="Complemento (opcional)"
          placeholder="Apto, bloco, etc."
          icon={Home}
          register={register}
          error={errors.complement?.message}
        />
      </div>
      
      <InputField
        id="neighborhood"
        label="Bairro"
        placeholder="Nome do bairro"
        icon={Home}
        register={register}
        error={errors.neighborhood?.message}
      />
      
      <div className="grid grid-cols-2 gap-4">
        <InputField
          id="city"
          label="Cidade"
          placeholder="Nome da cidade"
          icon={Home}
          register={register}
          error={errors.city?.message}
        />
        
        <div className="space-y-2">
          <Label htmlFor="state">UF</Label>
          <Select 
            onValueChange={(value) => setValue('state', value)} 
            defaultValue={watch('state')}
            value={watch('state')}
          >
            <SelectTrigger id="state" className="w-full">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              {brazilianStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.value} - {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressFields;
