
import { z } from 'zod';

export interface DeliveryFormValues {
  pickupAddress: string;
  deliveryAddress: string;
  cargoDescription: string;
  quantity: number;
  height: number;
  width: number;
  length: number;
  weight: number;
  pickupDate?: string;
  contactName?: string;
  contactPhone?: string;
}

// Zod validation schema for standard delivery
export const standardDeliverySchema = z.object({
  pickupAddress: z.string().min(5, "Endereço de coleta é obrigatório (mínimo 5 caracteres)"),
  deliveryAddress: z.string().min(5, "Endereço de entrega é obrigatório (mínimo 5 caracteres)"),
  cargoDescription: z.string().min(3, "Descrição da carga é obrigatória (mínimo 3 caracteres)"),
  quantity: z.number().min(1, "Quantidade deve ser pelo menos 1"),
  height: z.number().min(1, "Altura deve ser pelo menos 1 cm"),
  width: z.number().min(1, "Largura deve ser pelo menos 1 cm"),
  length: z.number().min(1, "Comprimento deve ser pelo menos 1 cm"),
  weight: z.number().min(0.1, "Peso deve ser pelo menos 0.1 kg"),
  contactName: z.string().min(3, "Nome para contato é obrigatório").optional(),
  contactPhone: z.string().min(10, "Telefone é obrigatório").optional(),
});

// Zod validation schema for scheduled delivery
export const scheduledDeliverySchema = standardDeliverySchema.extend({
  pickupDate: z.string().min(1, "Data e hora de coleta são obrigatórias"),
});

export type StandardDeliveryFormValues = z.infer<typeof standardDeliverySchema>;
export type ScheduledDeliveryFormValues = z.infer<typeof scheduledDeliverySchema>;
