import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';
import type { Database } from '../../types/supabase';

type Booking = Database['public']['Tables']['bookings']['Row'] & {
  ride: Database['public']['Tables']['rides']['Row'];
};

export default function RideHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadBookings();
    }
  }, [user]);

  const loadBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        ride:rides(*)
      `)
      .eq('rider_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) {
      setBookings(data);
    }
    setIsLoading(false);
  };

  if (isLoading) return <div>Loading ride history...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Ride History</h2>

      {bookings.length > 0 ? (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div
              key={booking.id}
              className="border rounded-lg p-4"
            >
              <div className="flex justify-between">
                <div>
                  <p className="font-medium">
                    {booking.ride.departure_location} → {booking.ride.destination}
                  </p>
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
        </div>
      ) : (
        <p className="text-gray-600">No ride history yet.</p>
      )}
    </div>
  );
}