import { useState } from 'react';
import { Calendar, MapPin } from 'lucide-react';

interface RideFiltersProps {
  onFilterChange: (filters: RideFilterOptions) => void;
}

export interface RideFilterOptions {
  date?: string;
  fromLocation?: string;
  toLocation?: string;
}

export default function RideFilters({ onFilterChange }: RideFiltersProps) {
  const [filters, setFilters] = useState<RideFilterOptions>({});

  const handleFilterChange = (key: keyof RideFilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            Date
          </label>
          <input
            type="date"
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            From
          </label>
          <input
            type="text"
            placeholder="Departure location"
            onChange={(e) => handleFilterChange('fromLocation', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block w-4 h-4 mr-2" />
            To
          </label>
          <input
            type="text"
            placeholder="Destination"
            onChange={(e) => handleFilterChange('toLocation', e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}