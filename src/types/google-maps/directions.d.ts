
// Google Maps Directions API types

declare namespace google.maps {
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
}
