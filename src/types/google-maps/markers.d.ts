
// Google Maps Marker related types

declare namespace google.maps {
  class Marker {
    constructor(opts?: MarkerOptions);
    setMap(map: Map | null): void;
    getPosition(): LatLng;
    setPosition(latLng: LatLng | LatLngLiteral): void;
    addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
    setIcon(icon: string | Icon | Symbol): void;
    getIcon(): string | Icon | Symbol | undefined;
    setLabel(label: string | MarkerLabel): void;
    getLabel(): string | MarkerLabel | undefined;
    setTitle(title: string): void;
    getTitle(): string | undefined;
    setVisible(visible: boolean): void;
    getVisible(): boolean;
    setZIndex(zIndex: number): void;
    getZIndex(): number;
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
    icon?: string | Icon | Symbol;
    label?: string | MarkerLabel;
    draggable?: boolean;
    clickable?: boolean;
    visible?: boolean;
    zIndex?: number;
    animation?: Animation;
    optimized?: boolean;
  }

  interface Icon {
    url: string;
    size?: Size;
    origin?: Point;
    anchor?: Point;
    scaledSize?: Size;
    labelOrigin?: Point;
  }

  interface MarkerLabel {
    text: string;
    color?: string;
    fontFamily?: string;
    fontSize?: string;
    fontWeight?: string;
  }

  class Size {
    constructor(width: number, height: number, widthUnit?: string, heightUnit?: string);
    width: number;
    height: number;
    equals(other: Size): boolean;
    toString(): string;
  }

  interface InfoWindowOptions {
    content?: string | Node;
    position?: LatLng | LatLngLiteral;
    maxWidth?: number;
    pixelOffset?: Size;
    zIndex?: number;
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

  enum Animation {
    BOUNCE,
    DROP
  }

  interface Place {
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    query?: string;
  }
}
