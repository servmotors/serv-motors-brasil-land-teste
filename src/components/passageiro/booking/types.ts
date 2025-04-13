
/**
 * Type definition for ride data that will be stored in sessionStorage
 */
export interface RideData {
  pickup: string;
  destination: string;
  carType: string;
  passengers: number;
  distance: number | null;
  duration: number | null;
  fare: string | null;
}
