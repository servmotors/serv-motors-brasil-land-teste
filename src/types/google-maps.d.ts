
// Type definitions for Google Maps JavaScript API 3.0
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions);
    setCenter(latLng: LatLng | LatLngLiteral): void;
    setZoom(zoom: number): void;
    getCenter(): LatLng;
    getZoom(): number;
  }

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

  class DirectionsService {
    constructor();
    route(request: DirectionsRequest, callback: (result: DirectionsResult | null, status: DirectionsStatus) => void): void;
  }

  class DirectionsRenderer {
    constructor(opts?: DirectionsRendererOptions);
    setMap(map: Map | null): void;
    setDirections(directions: DirectionsResult): void;
    getDirections(): DirectionsResult | null;
  }

  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void;
  }

  class LatLng {
    constructor(lat: number, lng: number);
    lat(): number;
    lng(): number;
    toString(): string;
    toJSON(): LatLngLiteral;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }

  interface MapOptions {
    center?: LatLng | LatLngLiteral;
    zoom?: number;
    mapTypeId?: string;
    mapTypeControl?: boolean;
    fullscreenControl?: boolean;
    streetViewControl?: boolean;
    zoomControl?: boolean;
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

  interface DirectionsRequest {
    origin: string | LatLng | LatLngLiteral | Place;
    destination: string | LatLng | LatLngLiteral | Place;
    travelMode: TravelMode;
    transitOptions?: TransitOptions;
    drivingOptions?: DrivingOptions;
    unitSystem?: UnitSystem;
    waypoints?: DirectionsWaypoint[];
    optimizeWaypoints?: boolean;
    provideRouteAlternatives?: boolean;
    avoidFerries?: boolean;
    avoidHighways?: boolean;
    avoidTolls?: boolean;
    region?: string;
  }

  interface DirectionsRendererOptions {
    directions?: DirectionsResult;
    map?: Map;
    panel?: Element;
    draggable?: boolean;
    hideRouteList?: boolean;
    suppressBicyclingLayer?: boolean;
    suppressInfoWindows?: boolean;
    suppressMarkers?: boolean;
    suppressPolylines?: boolean;
    preserveViewport?: boolean;
    routeIndex?: number;
    polylineOptions?: PolylineOptions;
    markerOptions?: MarkerOptions;
    infoWindow?: InfoWindow;
  }

  interface DirectionsResult {
    routes: DirectionsRoute[];
  }

  interface DirectionsRoute {
    bounds: LatLngBounds;
    copyrights: string;
    legs: DirectionsLeg[];
    overview_path: LatLng[];
    overview_polyline: string;
    warnings: string[];
    waypoint_order: number[];
  }

  interface DirectionsLeg {
    arrival_time?: Time;
    departure_time?: Time;
    distance?: Distance;
    duration?: Duration;
    duration_in_traffic?: Duration;
    end_address: string;
    end_location: LatLng;
    start_address: string;
    start_location: LatLng;
    steps: DirectionsStep[];
    via_waypoints: LatLng[];
  }

  interface DirectionsStep {
    distance: Distance;
    duration: Duration;
    end_location: LatLng;
    instructions: string;
    path: LatLng[];
    start_location: LatLng;
    travel_mode: TravelMode;
    transit?: TransitDetails;
  }

  interface Distance {
    text: string;
    value: number;
  }

  interface Duration {
    text: string;
    value: number;
  }

  interface Time {
    text: string;
    time_zone: string;
    value: Date;
  }

  interface TransitDetails {
    arrival_stop: TransitStop;
    arrival_time: Time;
    departure_stop: TransitStop;
    departure_time: Time;
    headsign: string;
    headway: number;
    line: TransitLine;
    num_stops: number;
  }

  interface TransitStop {
    location: LatLng;
    name: string;
  }

  interface TransitLine {
    agencies: TransitAgency[];
    color: string;
    icon: string;
    name: string;
    short_name: string;
    text_color: string;
    url: string;
    vehicle: TransitVehicle;
  }

  interface TransitAgency {
    name: string;
    phone: string;
    url: string;
  }

  interface TransitVehicle {
    icon: string;
    local_icon: string;
    name: string;
    type: VehicleType;
  }

  type VehicleType = 'BUS' | 'CABLE_CAR' | 'COMMUTER_TRAIN' | 'FERRY' | 'FUNICULAR' | 'GONDOLA_LIFT' | 'HEAVY_RAIL' | 'HIGH_SPEED_TRAIN' | 'INTERCITY_BUS' | 'METRO_RAIL' | 'MONORAIL' | 'OTHER' | 'RAIL' | 'SHARE_TAXI' | 'SUBWAY' | 'TRAM' | 'TROLLEYBUS';

  // Definição dos tipos que estavam causando os erros
  enum TravelMode {
    BICYCLING = "BICYCLING",
    DRIVING = "DRIVING",
    TRANSIT = "TRANSIT",
    WALKING = "WALKING"
  }

  enum DirectionsStatus {
    INVALID_REQUEST = "INVALID_REQUEST",
    MAX_WAYPOINTS_EXCEEDED = "MAX_WAYPOINTS_EXCEEDED",
    NOT_FOUND = "NOT_FOUND",
    OK = "OK",
    OVER_QUERY_LIMIT = "OVER_QUERY_LIMIT",
    REQUEST_DENIED = "REQUEST_DENIED",
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    ZERO_RESULTS = "ZERO_RESULTS"
  }

  interface TransitOptions {
    arrivalTime?: Date;
    departureTime?: Date;
    modes?: TransitMode[];
    routingPreference?: TransitRoutePreference;
  }

  type TransitMode = 'BUS' | 'RAIL' | 'SUBWAY' | 'TRAIN' | 'TRAM';

  type TransitRoutePreference = 'FEWER_TRANSFERS' | 'LESS_WALKING';

  interface DrivingOptions {
    departureTime: Date;
    trafficModel?: TrafficModel;
  }

  type TrafficModel = 'BEST_GUESS' | 'OPTIMISTIC' | 'PESSIMISTIC';

  type UnitSystem = 'IMPERIAL' | 'METRIC';

  interface DirectionsWaypoint {
    location: LatLng | LatLngLiteral | string;
    stopover: boolean;
  }

  interface PolylineOptions {
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    icons?: IconSequence[];
    path?: LatLng[] | LatLngLiteral[];
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    visible?: boolean;
    zIndex?: number;
  }

  interface IconSequence {
    fixedRotation?: boolean;
    icon: Symbol;
    offset?: string;
    repeat?: string;
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

  class Point {
    constructor(x: number, y: number);
    x: number;
    y: number;
    equals(other: Point): boolean;
    toString(): string;
  }

  enum SymbolPath {
    BACKWARD_CLOSED_ARROW,
    BACKWARD_OPEN_ARROW,
    CIRCLE,
    FORWARD_CLOSED_ARROW,
    FORWARD_OPEN_ARROW
  }

  interface Place {
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    query?: string;
  }

  // Fix for rideOptions error in BookingPanel.tsx
  interface GeocoderRequest {
    address?: string;
    location?: LatLng | LatLngLiteral;
    placeId?: string;
    bounds?: LatLngBounds | LatLngBoundsLiteral;
    componentRestrictions?: GeocoderComponentRestrictions;
    region?: string;
  }

  interface GeocoderComponentRestrictions {
    country: string | string[];
  }

  interface GeocoderResult {
    types: string[];
    formatted_address: string;
    address_components: GeocoderAddressComponent[];
    geometry: {
      location: LatLng;
      location_type: GeocoderLocationType;
      viewport: LatLngBounds;
      bounds?: LatLngBounds;
    };
    partial_match: boolean;
    place_id: string;
    postcode_localities?: string[];
  }

  interface GeocoderAddressComponent {
    long_name: string;
    short_name: string;
    types: string[];
  }

  type GeocoderLocationType = 'APPROXIMATE' | 'GEOMETRIC_CENTER' | 'RANGE_INTERPOLATED' | 'ROOFTOP';
  type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

  interface LatLngBounds {
    contains(latLng: LatLng | LatLngLiteral): boolean;
    equals(other: LatLngBounds | LatLngBoundsLiteral): boolean;
    extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
    getCenter(): LatLng;
    getNorthEast(): LatLng;
    getSouthWest(): LatLng;
    isEmpty(): boolean;
    toJSON(): LatLngBoundsLiteral;
    toSpan(): LatLng;
    toString(): string;
  }

  interface LatLngBoundsLiteral {
    east: number;
    north: number;
    south: number;
    west: number;
  }

  interface MapsEventListener {
    remove(): void;
  }
}

