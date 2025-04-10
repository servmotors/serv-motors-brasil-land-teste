
import { ReactNode } from 'react';

export interface Marker {
  position: { lat: number, lng: number };
  title: string;
  icon?: string;
}

export interface MapProps {
  className?: string;
  center?: { lat: number, lng: number };
  markers?: Marker[];
  zoom?: number;
}

export interface DriverMapProps {
  className?: string;
}
