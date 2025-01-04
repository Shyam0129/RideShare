import { useMemo } from 'react';
import { type RideFilterOptions } from '../components/rides/RideFilters';
import { isUpcoming } from '../utils/dateUtils';
import type { Database } from '../types/supabase';

type Ride = Database['public']['Tables']['rides']['Row'] & {
  driver: Database['public']['Tables']['profiles']['Row'];
  vehicle: Database['public']['Tables']['vehicles']['Row'];
};

export function useFilteredRides(rides: Ride[] | undefined, filters: RideFilterOptions) {
  return useMemo(() => {
    if (!rides) return [];

    return rides.filter(ride => {
      // Filter upcoming rides within 7 days by default
      if (!isUpcoming(ride.departure_time)) return false;

      // Apply date filter if specified
      if (filters.date && !ride.departure_time.startsWith(filters.date)) return false;

      // Apply location filters
      if (filters.fromLocation && 
          !ride.departure_location.toLowerCase().includes(filters.fromLocation.toLowerCase())) {
        return false;
      }
      
      if (filters.toLocation && 
          !ride.destination.toLowerCase().includes(filters.toLocation.toLowerCase())) {
        return false;
      }

      return true;
    }).sort((a, b) => new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime());
  }, [rides, filters]);
}