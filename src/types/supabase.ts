export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          avatar_url: string | null;
          user_type: 'rider' | 'driver';
          phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          avatar_url?: string | null;
          user_type: 'rider' | 'driver';
          phone?: string | null;
        };
        Update: {
          username?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          user_type?: 'rider' | 'driver';
          phone?: string | null;
        };
      };
      vehicles: {
        Row: {
          id: string;
          owner_id: string;
          make: string;
          model: string;
          year: number;
          license_plate: string;
          capacity: number;
          vehicle_type: 'sedan' | 'suv' | 'hatchback' | 'wagon' | 'van' | 'pickup' | 'motorcycle' | 'scooter' | 'luxury_sedan' | 'sports_car' | 'ev_sedan' | 'ev_suv';
          fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
          transmission: 'manual' | 'automatic';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          owner_id: string;
          make: string;
          model: string;
          year: number;
          license_plate: string;
          capacity: number;
          vehicle_type: 'sedan' | 'suv' | 'hatchback' | 'wagon' | 'van' | 'pickup' | 'motorcycle' | 'scooter' | 'luxury_sedan' | 'sports_car' | 'ev_sedan' | 'ev_suv';
          fuel_type: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
          transmission: 'manual' | 'automatic';
        };
        Update: {
          make?: string;
          model?: string;
          year?: number;
          license_plate?: string;
          capacity?: number;
          vehicle_type?: 'sedan' | 'suv' | 'hatchback' | 'wagon' | 'van' | 'pickup' | 'motorcycle' | 'scooter' | 'luxury_sedan' | 'sports_car' | 'ev_sedan' | 'ev_suv';
          fuel_type?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
          transmission?: 'manual' | 'automatic';
        };
      };
      // ... rest of the types remain the same
    };
  };
}