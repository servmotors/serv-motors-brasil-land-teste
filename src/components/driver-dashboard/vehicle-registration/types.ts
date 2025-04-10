
import React from 'react';

export interface TransportType {
  id: string;
  name: string;
  icon: React.ReactNode;
  tooltip: string;
  hintText?: string;
  subtypes?: TransportSubtype[];
}

export interface TransportSubtype {
  id: string;
  name: string;
  icon: React.ReactNode;
}
