
import { ReactNode } from 'react';

export interface RideOption {
  id: string;
  name: string;
  icon: ReactNode;
  description: string;
  price: string;
  time: string;
  image: string;
}
