
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import LoginForm from '@/components/auth/LoginForm';

interface LoginTabProps {
  form: UseFormReturn<{
    email: string;
    password: string;
  }, any, undefined>;
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  isSubmitting: boolean;
}

const LoginTab = ({ form, onSubmit, isSubmitting }: LoginTabProps) => {
  return (
    <Card>
      <LoginForm 
        form={form} 
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
    </Card>
  );
};

export default LoginTab;
