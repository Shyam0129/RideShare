import { useState } from 'react';
import { MapPin } from 'lucide-react';
import type { MapLocation } from '../../types/maps';

interface LocationSearchProps {
  placeholder?: string;
  onSelect: (location: MapLocation) => void;
  className?: string;
}

export default function LocationSearch({ 
  placeholder = 'Search location...', 
  onSelect,
  className = ''
}: LocationSearchProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({ address: searchValue });
      
      if (result.results[0]) {
        const location = result.results[0].geometry.location;
        onSelect({
          lat: location.lat(),
          lng: location.lng(),
          address: result.results[0].formatted_address
        });
      }
    } catch (error) {
      console.error('Geocoding error:', error);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </form>
  );
}