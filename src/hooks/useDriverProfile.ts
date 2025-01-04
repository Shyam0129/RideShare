import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

export interface DriverStats {
  rating: number;
  totalRides: number;
  reviewCount: number;
  completedRides: number;
}

export function useDriverProfile(driverId: string) {
  return useQuery({
    queryKey: ['driver', driverId],
    queryFn: async () => {
      // Get driver profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', driverId)
        .single();

      if (profileError) throw profileError;

      // Get driver stats
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('reviewed_id', driverId);

      if (reviewsError) throw reviewsError;

      // Calculate stats
      const rating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

      const { count: totalRides } = await supabase
        .from('rides')
        .select('*', { count: 'exact', head: true })
        .eq('driver_id', driverId);

      return {
        profile,
        stats: {
          rating,
          totalRides: totalRides || 0,
          reviewCount: reviews.length,
          completedRides: totalRides || 0
        }
      };
    },
    enabled: !!driverId,
  });
}