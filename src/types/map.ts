
import { ReactNode } from 'react';

export interface Marker {
  position: { lat: number, lng: number };
  title: string;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  label?: string | google.maps.MarkerLabel;
  draggable?: boolean;
  visible?: boolean;
  zIndex?: number;
  animation?: google.maps.Animation;
  onClick?: () => void;
}

export interface MapProps {
  className?: string;
  center?: { lat: number, lng: number };
  markers?: Marker[];
  zoom?: number;
  withDirections?: boolean;
}

export interface DriverMapProps {
  className?: string;
}

export interface RouteDetails {
  distance: number; // in kilometers
  duration: number; // in minutes
  fare: number; // calculated fare
  origin: string;
  destination: string;
  cargoInfo?: {
    weight: number;
    dimensions: {
      height: number;
      width: number;
      length: number;
    };
    quantity: number;
    description: string;
  };
}
