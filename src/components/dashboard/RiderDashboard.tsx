import { useRiderBookings } from '../../hooks/useRides';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import type { Database } from '../../types/supabase';

type BookingWithRide = Database['public']['Tables']['bookings']['Row'] & {
  ride: Database['public']['Tables']['rides']['Row'];
};

export default function RiderDashboard() {
  const { user } = useAuth();
  const { data: bookings, isLoading } = useRiderBookings(user?.id);

  if (isLoading) return <div>Loading...</div>;

  const upcomingBookings = bookings?.filter(
    (booking) => new Date(booking.ride.departure_time) > new Date()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Upcoming Rides</h2>
        <Link
          to="/rides"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Find Rides
        </Link>
      </div>

      <div className="grid gap-6">
        {upcomingBookings?.map((booking) => (
          <div key={booking.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium">
                  {booking.ride.departure_location} → {booking.ride.destination}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(booking.ride.departure_time), 'PPp')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {booking.seats_booked} seat{booking.seats_booked > 1 ? 's' : ''}
                </p>
                <p className="text-sm text-gray-600 capitalize">
                  {booking.status}
                </p>
              </div>
            </div>
          </div>
        ))}

        {upcomingBookings?.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            <p>You don't have any upcoming rides.</p>
            <Link to="/rides" className="text-blue-600 hover:text-blue-700">
              Find available rides
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}