// Extend existing types
export interface MapOptions extends google.maps.MapOptions {
  styles?: google.maps.MapTypeStyle[];
}

export interface MapMarker {
  position: google.maps.LatLngLiteral;
  title?: string;
  icon?: string;
}

export interface MapLocation {
  lat: number;
  lng: number;
  address?: string;
}