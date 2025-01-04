import { useState } from 'react';
import { Vehicle } from '../../types/supabase';
import VehicleCard from './VehicleCard';

interface VehicleGridProps {
  vehicles: Vehicle[];
  onSelect?: (vehicle: Vehicle) => void;
  selectedId?: string;
}

export default function VehicleGrid({ vehicles, onSelect, selectedId }: VehicleGridProps) {
  const [filter, setFilter] = useState('all');

  const filteredVehicles = vehicles.filter(vehicle => {
    if (filter === 'all') return true;
    return vehicle.vehicle_type.includes(filter);
  });

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'sedan', label: 'Sedans' },
    { id: 'suv', label: 'SUVs' },
    { id: 'ev', label: 'Electric' },
    { id: 'luxury', label: 'Luxury' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setFilter(category.id)}
            className={`
              px-4 py-2 rounded-full whitespace-nowrap
              ${filter === category.id
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredVehicles.map(vehicle => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            selected={vehicle.id === selectedId}
            onClick={() => onSelect?.(vehicle)}
          />
        ))}
      </div>

      {filteredVehicles.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          No vehicles found in this category
        </p>
      )}
    </div>
  );
}