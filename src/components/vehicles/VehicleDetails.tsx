import { Car, Users, Key } from 'lucide-react';
import type { Database } from '../../types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

interface VehicleDetailsProps {
  vehicle: Vehicle;
}

export default function VehicleDetails({ vehicle }: VehicleDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-6">
        <Car className="h-8 w-8 text-blue-600 mr-3" />
        <div>
          <h2 className="text-xl font-semibold">
            {vehicle.make} {vehicle.model}
          </h2>
          <p className="text-gray-600">{vehicle.year}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center">
          <Key className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">License Plate</p>
            <p className="font-medium">{vehicle.license_plate}</p>
          </div>
        </div>

        <div className="flex items-center">
          <Users className="h-5 w-5 text-gray-400 mr-3" />
          <div>
            <p className="text-sm text-gray-600">Seating Capacity</p>
            <p className="font-medium">{vehicle.capacity} passengers</p>
          </div>
        </div>
      </div>
    </div>
  );
}