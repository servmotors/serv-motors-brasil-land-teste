
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import PersonalInfoFields from './form-sections/PersonalInfoFields';
import SecurityFields from './form-sections/SecurityFields';

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
  const { register, formState: { errors } } = form;
  
  return (
    <>
      <CardHeader>
        <CardTitle>Cadastro de Motorista</CardTitle>
        <CardDescription>Crie sua conta para dirigir com a Serv Motors</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <PersonalInfoFields 
            register={register} 
            errors={errors} 
          />
          
          <SecurityFields 
            register={register} 
            errors={errors} 
          />
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
