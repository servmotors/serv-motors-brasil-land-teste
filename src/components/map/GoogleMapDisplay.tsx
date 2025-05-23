
import React, { useRef, useEffect, useState, memo } from 'react';
import { MapProps, Marker } from '@/types/map';
import { useToast } from '@/hooks/use-toast';

interface GoogleMapDisplayProps extends MapProps {
  withDirections?: boolean;
}

const GoogleMapDisplay: React.FC<GoogleMapDisplayProps> = memo(({ 
  className, 
  center,
  markers = [],
  zoom = 13,
  withDirections = false
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const markerRefs = useRef<google.maps.Marker[]>([]);
  const [routeSet, setRouteSet] = useState(false);
  const { toast } = useToast();
  const mapInitializedRef = useRef(false);

  // Initialize map only once
  useEffect(() => {
    if (!center || !mapRef.current || !window.google?.maps || mapInitializedRef.current) return;
    
    // Create new map
    googleMapRef.current = new window.google.maps.Map(mapRef.current, {
      center,
      zoom,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
    });
    
    // If directions rendering is enabled, initialize the DirectionsRenderer
    if (withDirections) {
      directionsRendererRef.current = new window.google.maps.DirectionsRenderer({
        suppressMarkers: false,
        preserveViewport: false,
        polylineOptions: {
          strokeColor: '#2563eb', // Blue color for the route
          strokeWeight: 5,
          strokeOpacity: 0.7
        }
      });
      
      directionsRendererRef.current.setMap(googleMapRef.current);
    }
    
    mapInitializedRef.current = true;
  }, [center, zoom, withDirections]);

  // Update center when it changes
  useEffect(() => {
    if (!googleMapRef.current || !center) return;
    googleMapRef.current.setCenter(center);
  }, [center]);

  // Add or update markers
  useEffect(() => {
    if (!googleMapRef.current || !markers.length || !mapInitializedRef.current) return;
    
    // Clear existing markers
    markerRefs.current.forEach(marker => marker.setMap(null));
    markerRefs.current = [];
    
    // Add all markers if no directions are being shown or if we're still waiting for route
    if (!withDirections || !routeSet) {
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
        
        markerRefs.current.push(newMarker);
      });
    }
  }, [markers, withDirections, routeSet]);

  // Listen for route calculation requests
  useEffect(() => {
    if (!withDirections || !googleMapRef.current || !directionsRendererRef.current || !mapInitializedRef.current) return;
    
    // Setup an event listener for route calculation
    const handleRouteCalculation = (event: CustomEvent) => {
      const { origin, destination } = event.detail;
      
      if (!origin || !destination) {
        toast({
          title: "Dados insuficientes",
          description: "Origem e destino são necessários para calcular a rota",
          variant: "destructive"
        });
        return;
      }
      
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin,
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRendererRef.current?.setDirections(result);
            setRouteSet(true);
            
            // Calculate and dispatch route data
            const distance = result.routes[0]?.legs[0]?.distance?.value || 0;
            const duration = result.routes[0]?.legs[0]?.duration?.value || 0;
            
            // Dispatch route details event
            window.dispatchEvent(new CustomEvent('routeCalculated', {
              detail: {
                distance: distance / 1000, // convert to km
                duration: Math.round(duration / 60), // convert to minutes
                route: result
              }
            }));
          } else {
            toast({
              title: "Erro ao calcular rota",
              description: "Não foi possível calcular a rota entre os pontos informados",
              variant: "destructive"
            });
          }
        }
      );
    };
    
    // Add event listener
    window.addEventListener('calculateRoute', handleRouteCalculation as EventListener);
    
    // Cleanup
    return () => {
      window.removeEventListener('calculateRoute', handleRouteCalculation as EventListener);
    };
  }, [withDirections, toast]);

  return (
    <div 
      ref={mapRef} 
      className={`w-full h-64 rounded-md border overflow-hidden bg-gray-100 ${className || ''}`}
    />
  );
});

export default GoogleMapDisplay;
