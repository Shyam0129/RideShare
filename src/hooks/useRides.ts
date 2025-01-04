import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Ride = Database['public']['Tables']['rides']['Row'] & {
  driver: Database['public']['Tables']['profiles']['Row'];
  vehicle: Database['public']['Tables']['vehicles']['Row'];
};

// Get all available rides
export function useRides() {
  return useQuery({
    queryKey: ['rides'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('rides')
        .select(`
          *,
          driver:profiles(*),
          vehicle:vehicles(*)
        `)
        .eq('status', 'scheduled')
        .gt('departure_time', new Date().toISOString())
        .order('departure_time', { ascending: true });

      if (error) throw error;
      return data as Ride[];
    },
  });
}

// Get rides for a specific driver
export function useDriverRides(driverId: string | undefined) {
  return useQuery({
    queryKey: ['rides', 'driver', driverId],
    queryFn: async () => {
      if (!driverId) return [];

      const { data, error } = await supabase
        .from('rides')
        .select(`
          *,
          bookings (*)
        `)
        .eq('driver_id', driverId)
        .order('departure_time', { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!driverId,
  });
}

// Get rides for a specific rider
export function useRiderBookings(riderId: string | undefined) {
  return useQuery({
    queryKey: ['bookings', 'rider', riderId],
    queryFn: async () => {
      if (!riderId) return [];

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          ride:rides(*)
        `)
        .eq('rider_id', riderId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!riderId,
  });
}

// Book a ride
export function useBookRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ rideId, seats }: { rideId: string; seats: number }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('bookings')
        .insert({
          ride_id: rideId,
          rider_id: user.id,
          seats_booked: seats,
          status: 'pending',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rides'] });
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}

// Create a new ride
export function useCreateRide() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ride: Omit<Ride, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('rides')
        .insert(ride)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rides'] });
    },
  });
}