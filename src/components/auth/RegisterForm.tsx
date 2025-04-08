
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { User, Mail, Key, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Update interface to match what zod schema produces
interface RegisterFormValues {
  fullName: string;
  email: string;
  repeatEmail: string;
  password: string;
  phone: string;
}

// Update the form prop to explicitly match what useForm returns
interface RegisterFormProps {
  form: UseFormReturn<{
    fullName: string;
    email: string;
    repeatEmail: string;
    password: string;
    phone: string;
  }, any, undefined>;
  onSubmit: (data: RegisterFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const RegisterForm = ({ form, onSubmit, isSubmitting }: RegisterFormProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Cadastro de Motorista</CardTitle>
        <CardDescription>Crie sua conta para dirigir com a Serv Motors</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome completo</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="fullName"
                placeholder="Seu nome completo"
                className="pl-9"
                {...form.register('fullName')}
              />
            </div>
            {form.formState.errors.fullName && (
              <p className="text-sm text-red-500">{form.formState.errors.fullName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                placeholder="seu@email.com"
                className="pl-9"
                {...form.register('email')}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="repeatEmail">Confirmar E-mail</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="repeatEmail"
                placeholder="seu@email.com"
                className="pl-9"
                {...form.register('repeatEmail')}
              />
            </div>
            {form.formState.errors.repeatEmail && (
              <p className="text-sm text-red-500">{form.formState.errors.repeatEmail.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="Senha (mínimo 6 caracteres)"
                className="pl-9"
                {...form.register('password')}
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="(99) 99999-9999"
                className="pl-9"
                {...form.register('phone')}
              />
            </div>
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Cadastrar como motorista'}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default RegisterForm;
