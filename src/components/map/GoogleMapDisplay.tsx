
import React, { useRef, useEffect } from 'react';
import { MapProps, Marker } from '@/types/map';

const GoogleMapDisplay: React.FC<MapProps> = ({ 
  className, 
  center,
  markers = [],
  zoom = 13
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!center || !mapRef.current || !window.google?.maps) return;
    
    // Create new map
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
    });
    
    // Add all markers
    markers.forEach(marker => {
      const newMarker = new window.google.maps.Marker({
        position: marker.position,
        map: googleMapRef.current,
        title: marker.title,
        icon: marker.icon
      });

      // Add info window for each marker
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div style="font-weight: bold;">${marker.title}</div>`
      });

      newMarker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, newMarker);
      });
    });
  }, [center, markers, zoom]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-md border overflow-hidden bg-gray-100 ${className || ''}`}
    />
  );
};

export default GoogleMapDisplay;
