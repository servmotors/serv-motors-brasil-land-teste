
// Google Maps Marker related types

declare namespace google.maps {
  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
  }

  class InfoWindow {
    constructor(opts?: InfoWindowOptions);
    open(map?: Map, anchor?: Marker): void;
    close(): void;
    setContent(content: string | Node): void;
    getContent(): string | Node;
  }

  interface MarkerOptions {
    position: LatLng | LatLngLiteral;
    map?: Map;
    title?: string;
    icon?: string;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    position?: LatLng | LatLngLiteral;
  }

  interface Symbol {
    anchor?: Point;
    fillColor?: string;
    fillOpacity?: number;
    labelOrigin?: Point;
    path?: string | SymbolPath;
    rotation?: number;
    scale?: number;
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
  }

  interface Place {
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    query?: string;
  }
}
