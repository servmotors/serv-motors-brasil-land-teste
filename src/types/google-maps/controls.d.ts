
// Google Maps controls and options types

declare namespace google.maps {
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
}
