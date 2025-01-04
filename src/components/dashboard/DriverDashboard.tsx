import { useDriverRides } from '../../hooks/useRides';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import type { Database } from '../../types/supabase';
import { useAuth } from '../../hooks/useAuth';

type RideWithBookings = Database['public']['Tables']['rides']['Row'] & {
  bookings: Database['public']['Tables']['bookings']['Row'][];
};

export default function DriverDashboard() {
  const { user } = useAuth();
  const { data: rides, isLoading } = useDriverRides(user?.id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Rides</h2>
        <Link
          to="/rides/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create New Ride
        </Link>
      </div>

      <div className="grid gap-6">
        {rides?.map((ride) => (
          <div key={ride.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between mb-4">
              <div>
                <h3 className="font-medium">
                  {ride.departure_location} → {ride.destination}
                </h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(ride.departure_time), 'PPp')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">
                  {ride.available_seats} seats available
                </p>
                <p className="text-sm text-gray-600">
                  ${ride.price_per_seat} per seat
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium mb-2">Bookings</h4>
              {ride.bookings.length > 0 ? (
                <div className="space-y-2">
                  {ride.bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="flex justify-between text-sm"
                    >
                      <span>{booking.seats_booked} seats</span>
                      <span className="capitalize">{booking.status}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No bookings yet</p>
              )}
            </div>
          </div>
        ))}

        {rides?.length === 0 && (
          <div className="text-center text-gray-600 py-8">
            <p>You haven't created any rides yet.</p>
            <Link
              to="/rides/create"
              className="text-blue-600 hover:text-blue-700"
            >
              Create your first ride
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}