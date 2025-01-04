import { format } from 'date-fns';
import { MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import type { Database } from '../types/supabase';

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
        <div>
          <h3 className="text-lg font-semibold mb-2">{ride.driver.full_name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{ride.departure_location} → {ride.destination}</span>
          </div>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{format(new Date(ride.departure_time), 'PPp')}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-gray-600 mb-2">
            <Users className="w-4 h-4 mr-2" />
            <span>{ride.available_seats} seats available</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            <span>${ride.price_per_seat} per seat</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="text-sm text-gray-600 mb-4">
          Vehicle: {ride.vehicle.make} {ride.vehicle.model} ({ride.vehicle.year})
        </div>
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