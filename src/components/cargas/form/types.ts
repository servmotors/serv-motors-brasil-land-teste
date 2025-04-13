
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
