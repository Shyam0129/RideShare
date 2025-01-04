import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useVehicles } from '../hooks/useVehicles';
import VehicleGrid from '../components/vehicles/VehicleGrid';
import VehicleDetails from '../components/vehicles/VehicleDetails';
import AddVehicleForm from '../components/profile/AddVehicleForm';
import type { Database } from '../types/supabase';

type Vehicle = Database['public']['Tables']['vehicles']['Row'];

export default function Vehicles() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: vehicles, isLoading } = useVehicles(user?.id);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) return <div>Loading vehicles...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showAddForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Vehicle</h2>
          <AddVehicleForm onSuccess={() => setShowAddForm(false)} />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VehicleGrid
            vehicles={vehicles || []}
            onSelect={setSelectedVehicle}
            selectedId={selectedVehicle?.id}
          />
        </div>
        <div>
          {selectedVehicle && (
            <div className="sticky top-6">
              <VehicleDetails vehicle={selectedVehicle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}