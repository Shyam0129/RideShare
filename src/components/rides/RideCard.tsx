import { format } from 'date-fns';
import { MapPin, Calendar, Users, DollarSign, Car, Star } from 'lucide-react';
import type { Database } from '../../types/supabase';
import VehicleTypeIcon from '../vehicles/VehicleTypeIcon';

type Ride = Database['public']['Tables']['rides']['Row'] & {
  driver: Database['public']['Tables']['profiles']['Row'];
  vehicle: Database['public']['Tables']['vehicles']['Row'];
};

interface RideCardProps {
  ride: Ride;
  onBook: (seats: number) => void;
}

export default function RideCard({ ride, onBook }: RideCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            {ride.driver.avatar_url ? (
              <img
                src={ride.driver.avatar_url}
                alt={ride.driver.full_name || ''}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-xl font-semibold text-blue-600">
                {(ride.driver.full_name || 'U')[0].toUpperCase()}
              </span>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{ride.driver.full_name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span>4.8 (42 rides)</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-gray-600 mb-1">
            <Users className="w-4 h-4 mr-2" />
            <span>{ride.available_seats} seats available</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>${ride.price_per_seat} per seat</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="w-5 h-5 mr-3" />
          <div>
            <p className="font-medium">{ride.departure_location}</p>
            <p className="mt-1 font-medium text-blue-600">↓</p>
            <p className="font-medium">{ride.destination}</p>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600">
          <Calendar className="w-5 h-5 mr-3" />
          <span>{format(new Date(ride.departure_time), 'PPp')}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Car className="w-5 h-5 mr-3" />
          <div>
            <span className="font-medium">
              {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.year})
            </span>
            <div className="flex items-center gap-2 mt-1 text-sm">
              <VehicleTypeIcon type={ride.vehicle.vehicle_type} className="w-4 h-4" />
              <span className="capitalize">{ride.vehicle.vehicle_type.replace('_', ' ')}</span>
              <span>•</span>
              <span className="capitalize">{ride.vehicle.fuel_type}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between items-center">
          <select
            className="border rounded-md px-3 py-2"
            onChange={(e) => onBook(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>Select seats</option>
            {[...Array(ride.available_seats)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} seat{i + 1 > 1 ? 's' : ''}
              </option>
            ))}
          </select>
          <button
            onClick={() => onBook(1)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Quick Book
          </button>
        </div>
      </div>
    </div>
  );
}