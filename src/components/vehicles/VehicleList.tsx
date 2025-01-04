import { Car } from 'lucide-react';
import type { Database } from '../../types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehicleListProps {
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
  selectedId?: string;
}

export default function VehicleList({ vehicles, onSelect, selectedId }: VehicleListProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Your Vehicles</h2>
      </div>
      <div className="divide-y">
        {vehicles.map(vehicle => (
          <button
            key={vehicle.id}
            onClick={() => onSelect(vehicle)}
            className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
              vehicle.id === selectedId ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center">
              <Car className="h-5 w-5 text-gray-400 mr-3" />
              <div>
                <h3 className="font-medium">
                  {vehicle.make} {vehicle.model}
                </h3>
                <p className="text-sm text-gray-600">
                  {vehicle.year} • {vehicle.capacity} seats
                </p>
              </div>
            </div>
          </button>
        ))}
        {vehicles.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No vehicles registered yet
          </div>
        )}
      </div>
    </div>
  );
}