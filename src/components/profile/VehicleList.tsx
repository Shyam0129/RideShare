import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useVehicles } from '../../hooks/useVehicles';
import AddVehicleForm from './AddVehicleForm';
import type { Database } from '../../types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

export default function VehicleList() {
  const { user } = useAuth();
  const { data: vehicles, isLoading } = useVehicles(user?.id);
  const [showAddForm, setShowAddForm] = useState(false);

  if (isLoading) return <div>Loading vehicles...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Vehicles</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="text-blue-600 hover:text-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6">
          <AddVehicleForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}

      {vehicles && vehicles.length > 0 ? (
        <div className="space-y-4">
          {vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className="border rounded-lg p-4"
            >
              <h3 className="font-medium">
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </h3>
              <p className="text-sm text-gray-600">
                License Plate: {vehicle.license_plate}
              </p>
              <p className="text-sm text-gray-600">
                Capacity: {vehicle.capacity} seats
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          {showAddForm ? 'Add your first vehicle above.' : 'No vehicles registered yet.'}
        </p>
      )}
    </div>
  );
}