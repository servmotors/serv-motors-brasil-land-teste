
import * as z from 'zod';

export const step1Schema = z.object({
  vehicleYear: z.coerce
    .number()
    .min(1990, "Ano deve ser após 1990")
    .max(new Date().getFullYear() + 1, "Ano não pode ser no futuro"),
});

export const step2Schema = z.object({
  frontImage: z.instanceof(File, { message: "Foto frontal do veículo é obrigatória" }),
  diagonalImage: z.instanceof(File, { message: "Foto diagonal do veículo é obrigatória" }),
  backImage: z.instanceof(File, { message: "Foto traseira do veículo é obrigatória" }),
  renavam: z.string().length(11, "Renavam deve ter 11 dígitos").regex(/^\d+$/, "Renavam deve conter apenas números"),
  plateImage: z.instanceof(File, { message: "Foto da placa é obrigatória" }),
  crlvDocument: z.instanceof(File, { message: "CRLV do veículo é obrigatório" }),
  crlvYear: z.coerce
    .number()
    .min(2020, "Ano do CRLV deve ser 2020 ou posterior")
    .max(new Date().getFullYear() + 1, "Ano do CRLV não pode ser no futuro"),
  crlvExpirationDate: z.date({
    required_error: "Data de vencimento do CRLV é obrigatória",
  }),
});

export const step3Schema = z.object({
  plate: z
    .string()
    .min(7, "Placa deve ter no mínimo 7 caracteres")
    .max(8, "Placa deve ter no máximo 8 caracteres")
    .regex(/^[A-Z]{3}[0-9][0-9A-Z][0-9]{2}$/, "Placa deve estar no formato ABC1234 ou ABC1D23"),
  vehicleStatus: z.string().optional(),
  vehicleCity: z.string().optional(),
  vehicleState: z.string().optional(),
  vehicleMake: z.string().min(1, "Marca do veículo é obrigatória"),
  vehicleModel: z.string().min(1, "Modelo do veículo é obrigatório"),
  vehicleVersion: z.string().optional(),
  vehicleColor: z.string().optional(),
  rideTypes: z.array(z.string()).min(1, "Selecione pelo menos um tipo de corrida"),
});

export const formSchema = step1Schema.merge(step2Schema).merge(step3Schema);
export type FormValues = z.infer<typeof formSchema>;

