
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
}
