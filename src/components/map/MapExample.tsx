import { useState } from 'react';
import GoogleMap from './GoogleMap';
import LocationSearch from './LocationSearch';
import type { MapLocation } from '../../types/maps';

export default function MapExample() {
  const [location, setLocation] = useState<MapLocation>({
    lat: 40.7128,
    lng: -74.0060 // Default to New York City
  });

  return (
    <div className="space-y-4">
      <LocationSearch
        placeholder="Enter a location..."
        onSelect={setLocation}
        className="mb-4"
      />
      
      <GoogleMap
        center={{ lat: location.lat, lng: location.lng }}
        markers={[{ position: { lat: location.lat, lng: location.lng } }]}
        zoom={13}
      />
      
      {location.address && (
        <p className="text-sm text-gray-600">
          Selected location: {location.address}
        </p>
      )}
    </div>
  );
}