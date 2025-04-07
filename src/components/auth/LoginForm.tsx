
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Mail, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Update interface to make fields match the useForm implementation
interface LoginFormValues {
  email: string;
  password: string;
}

// Update the form prop to explicitly match what useForm returns
interface LoginFormProps {
  form: UseFormReturn<{
    email: string;
    password: string;
  }, any, undefined>;
  onSubmit: (data: LoginFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const LoginForm = ({ form, onSubmit, isSubmitting }: LoginFormProps) => {
  return (
    <>
      <CardHeader>
        <CardTitle>Área do Motorista</CardTitle>
        <CardDescription>Faça login para acessar sua conta</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
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
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="pl-9"
                {...form.register('password')}
              />
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processando...' : 'Entrar'}
          </Button>
        </CardFooter>
      </form>
    </>
  );
};

export default LoginForm;
