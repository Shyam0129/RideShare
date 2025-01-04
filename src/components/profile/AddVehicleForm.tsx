import { useState } from 'react';
import { useAddVehicle } from '../../hooks/useVehicles';
import type { Database } from '../../types/supabase';

type VehicleType = Database['public']['Tables']['vehicles']['Row']['vehicle_type'];
type FuelType = Database['public']['Tables']['vehicles']['Row']['fuel_type'];
type Transmission = Database['public']['Tables']['vehicles']['Row']['transmission'];

const VEHICLE_TYPES: { value: VehicleType; label: string }[] = [
  { value: 'sedan', label: 'Sedan' },
  { value: 'suv', label: 'SUV' },
  { value: 'hatchback', label: 'Hatchback' },
  { value: 'wagon', label: 'Wagon' },
  { value: 'van', label: 'Van' },
  { value: 'pickup', label: 'Pickup' },
  { value: 'motorcycle', label: 'Motorcycle' },
  { value: 'scooter', label: 'Scooter' },
  { value: 'luxury_sedan', label: 'Luxury Sedan' },
  { value: 'sports_car', label: 'Sports Car' },
  { value: 'ev_sedan', label: 'Electric Sedan' },
  { value: 'ev_suv', label: 'Electric SUV' },
];

const FUEL_TYPES: { value: FuelType; label: string }[] = [
  { value: 'gasoline', label: 'Gasoline' },
  { value: 'diesel', label: 'Diesel' },
  { value: 'electric', label: 'Electric' },
  { value: 'hybrid', label: 'Hybrid' },
];

const TRANSMISSIONS: { value: Transmission; label: string }[] = [
  { value: 'automatic', label: 'Automatic' },
  { value: 'manual', label: 'Manual' },
];

export default function AddVehicleForm({ onSuccess }: { onSuccess: () => void }) {
  const addVehicle = useAddVehicle();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: new Date().getFullYear().toString(),
    license_plate: '',
    capacity: '4',
    vehicle_type: 'sedan' as VehicleType,
    fuel_type: 'gasoline' as FuelType,
    transmission: 'automatic' as Transmission,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await addVehicle.mutateAsync({
        make: formData.make,
        model: formData.model,
        year: parseInt(formData.year),
        license_plate: formData.license_plate,
        capacity: parseInt(formData.capacity),
        vehicle_type: formData.vehicle_type,
        fuel_type: formData.fuel_type,
        transmission: formData.transmission,
      });
      onSuccess();
      setFormData({
        make: '',
        model: '',
        year: new Date().getFullYear().toString(),
        license_plate: '',
        capacity: '4',
        vehicle_type: 'sedan',
        fuel_type: 'gasoline',
        transmission: 'automatic',
      });
    } catch (error) {
      setError('Failed to add vehicle. Please try again.');
      console.error('Error adding vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Make</label>
          <input
            type="text"
            value={formData.make}
            onChange={(e) => setFormData(prev => ({ ...prev, make: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Model</label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
          <select
            value={formData.vehicle_type}
            onChange={(e) => setFormData(prev => ({ ...prev, vehicle_type: e.target.value as VehicleType }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            {VEHICLE_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Fuel Type</label>
          <select
            value={formData.fuel_type}
            onChange={(e) => setFormData(prev => ({ ...prev, fuel_type: e.target.value as FuelType }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            {FUEL_TYPES.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <input
            type="number"
            min="1900"
            max={new Date().getFullYear() + 1}
            value={formData.year}
            onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">License Plate</label>
          <input
            type="text"
            value={formData.license_plate}
            onChange={(e) => setFormData(prev => ({ ...prev, license_plate: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Capacity</label>
          <input
            type="number"
            min="1"
            max="99"
            value={formData.capacity}
            onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Transmission</label>
        <select
          value={formData.transmission}
          onChange={(e) => setFormData(prev => ({ ...prev, transmission: e.target.value as Transmission }))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          {TRANSMISSIONS.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        disabled={addVehicle.isPending}
      >
        {addVehicle.isPending ? 'Adding Vehicle...' : 'Add Vehicle'}
      </button>
    </form>
  );
}