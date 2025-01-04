import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];
type VehicleInsert = Omit<Vehicle, 'id' | 'owner_id' | 'created_at' | 'updated_at'>;

export function useVehicles(ownerId: string | undefined) {
  return useQuery({
    queryKey: ['vehicles', ownerId],
    queryFn: async () => {
      if (!ownerId) return [];

      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('owner_id', ownerId);

      if (error) throw error;
      return data;
    },
    enabled: !!ownerId,
  });
}

export function useAddVehicle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (vehicle: VehicleInsert) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.id) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          ...vehicle,
          owner_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vehicles'] });
    },
  });
}