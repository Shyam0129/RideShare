/*
  # Enhance vehicles table with additional fields and constraints

  1. Changes
    - Add new columns to vehicles table:
      - vehicle_type (text): Category of vehicle
      - fuel_type (text): Type of fuel used
      - transmission (text): Manual or automatic
    - Add enum constraints for new columns
    - Create function for adding sample vehicles
*/

-- Create ENUMs for vehicle attributes
DO $$ BEGIN
    CREATE TYPE vehicle_type_enum AS ENUM (
        'sedan', 'suv', 'hatchback', 'wagon',
        'van', 'pickup', 'motorcycle', 'scooter',
        'luxury_sedan', 'sports_car', 'ev_sedan', 'ev_suv'
    );
    CREATE TYPE fuel_type_enum AS ENUM (
        'gasoline', 'diesel', 'electric', 'hybrid'
    );
    CREATE TYPE transmission_enum AS ENUM (
        'manual', 'automatic'
    );
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Add new columns with enum constraints
ALTER TABLE vehicles 
    ADD COLUMN IF NOT EXISTS vehicle_type vehicle_type_enum NOT NULL DEFAULT 'sedan',
    ADD COLUMN IF NOT EXISTS fuel_type fuel_type_enum NOT NULL DEFAULT 'gasoline',
    ADD COLUMN IF NOT EXISTS transmission transmission_enum NOT NULL DEFAULT 'automatic';

-- Create function to add sample vehicles for a new driver
CREATE OR REPLACE FUNCTION add_sample_vehicles_for_driver(driver_id UUID)
RETURNS void AS $$
BEGIN
    -- Only add sample vehicles for drivers
    IF EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = driver_id AND user_type = 'driver'
    ) THEN
        -- Insert sample vehicles
        INSERT INTO vehicles (
            owner_id,
            make,
            model,
            year,
            license_plate,
            capacity,
            vehicle_type,
            fuel_type,
            transmission
        ) VALUES 
            (driver_id, 'Toyota', 'Camry', 2023, 'ABC123', 5, 'sedan', 'gasoline', 'automatic'),
            (driver_id, 'Honda', 'CR-V', 2023, 'XYZ789', 5, 'suv', 'gasoline', 'automatic'),
            (driver_id, 'Tesla', 'Model 3', 2023, 'EV1234', 5, 'ev_sedan', 'electric', 'automatic');
    END IF;
END;
$$ LANGUAGE plpgsql;