import { type Vehicle } from '../../types/supabase';
import VehicleTypeIcon from './VehicleTypeIcon';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
  selected?: boolean;
}

export default function VehicleCard({ vehicle, onClick, selected }: VehicleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        p-4 rounded-lg border transition-colors cursor-pointer
        ${selected ? 'bg-blue-50 border-blue-200' : 'bg-white hover:bg-gray-50 border-gray-200'}
      `}
    >
      <div className="flex items-start gap-4">
        <VehicleTypeIcon type={vehicle.vehicle_type} className="w-6 h-6 text-gray-500" />
        <div className="flex-1">
          <h3 className="font-medium">
            {vehicle.make} {vehicle.model}
          </h3>
          <div className="mt-1 text-sm text-gray-600">
            <p>{vehicle.year} • {vehicle.capacity} seats</p>
            <p className="capitalize">
              {vehicle.fuel_type} • {vehicle.transmission}
            </p>
          </div>
          <div className="mt-2 text-sm">
            <span className="inline-block px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
              {vehicle.vehicle_type.replace('_', ' ')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}