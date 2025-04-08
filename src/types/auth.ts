import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

export const registerSchema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  email: z.string().email('E-mail inválido'),
  repeatEmail: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  phone: z.string().min(10, 'Telefone inválido'),
  profileImage: z.instanceof(File, { message: "Foto do motorista é obrigatória" }),
}).refine((data) => data.email === data.repeatEmail, {
  message: "Os e-mails não coincidem",
  path: ["repeatEmail"],
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export const driverIdentitySchema = z.object({
  birthDate: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  cpf: z.string().min(11, 'CPF inválido'),
  cpfDocument: z.instanceof(File, { message: "Documento do CPF é obrigatório" }),
  cnh: z.string().min(11, 'CNH inválida'),
  cnhDocument: z.instanceof(File, { message: "Documento da CNH é obrigatório" }),
  cnhExpiry: z.date({
    required_error: "Data de vencimento da CNH é obrigatória",
  }),
  hasRemuneratedActivity: z.boolean(),
});

export const driverAddressSchema = z.object({
  cep: z.string().min(8, 'CEP inválido'),
  street: z.string().min(3, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(2, 'Bairro é obrigatório'),
  city: z.string().min(2, 'Cidade é obrigatória'),
  state: z.string().length(2, 'UF deve ter 2 caracteres'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type DriverIdentityValues = z.infer<typeof driverIdentitySchema>;
export type DriverAddressValues = z.infer<typeof driverAddressSchema>;
