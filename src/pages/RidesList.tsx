import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRides, useBookRide } from '../hooks/useRides';
import { useFilteredRides } from '../hooks/useFilteredRides';
import { useAuth } from '../hooks/useAuth';
import RideCard from '../components/rides/RideCard';
import RideFilters, { type RideFilterOptions } from '../components/rides/RideFilters';

export default function RidesList() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: rides, isLoading, error } = useRides();
  const bookRide = useBookRide();
  const [filters, setFilters] = useState<RideFilterOptions>({});
  
  const filteredRides = useFilteredRides(rides, filters);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) return <div>Loading rides...</div>;
  if (error) return <div>Error loading rides: {error.message}</div>;

  const handleBookRide = async (rideId: string, seats: number) => {
    try {
      await bookRide.mutateAsync({ rideId, seats });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error booking ride:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Rides</h1>
        <span className="text-gray-600">
          {filteredRides.length} {filteredRides.length === 1 ? 'ride' : 'rides'} found
        </span>
      </div>

      <RideFilters onFilterChange={setFilters} />

      <div className="space-y-6">
        {filteredRides.map((ride) => (
          <RideCard
            key={ride.id}
            ride={ride}
            onBook={(seats) => handleBookRide(ride.id, seats)}
          />
        ))}
        
        {filteredRides.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 mb-2">
              {rides?.length ? 'No rides match your search criteria.' : 'No upcoming rides available.'}
            </p>
            <p className="text-sm text-gray-500">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}