
/**
 * Utility functions for geolocation calculations
 */

/**
 * Calculate distance between two coordinates in kilometers using the Haversine formula
 */
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const d = R * c; // Distance in km
  return d;
};

/**
 * Convert degrees to radians
 */
export const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

/**
 * Check if position has changed significantly enough to update
 * Returns true if the new position is more than minDistance away from the previous position
 */
export const hasPositionChangedSignificantly = (
  prevPosition: { lat: number, lng: number } | null,
  newLat: number,
  newLng: number,
  minDistance: number = 0.01 // 10 meters default
): boolean => {
  if (!prevPosition) return true;
  return calculateDistance(prevPosition.lat, prevPosition.lng, newLat, newLng) > minDistance;
};
