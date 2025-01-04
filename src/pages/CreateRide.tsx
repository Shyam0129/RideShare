import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCreateRide } from '../hooks/useRides';
import { useVehicles } from '../hooks/useVehicles';

export default function CreateRide() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const createRide = useCreateRide();
  const { data: vehicles } = useVehicles(user?.id);
  
  const [formData, setFormData] = useState({
    vehicle_id: '',
    departure_location: '',
    destination: '',
    departure_time: '',
    available_seats: '1',
    price_per_seat: '0',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createRide.mutateAsync({
        driver_id: user.id,
        vehicle_id: formData.vehicle_id,
        departure_location: formData.departure_location,
        destination: formData.destination,
        departure_time: formData.departure_time,
        available_seats: parseInt(formData.available_seats),
        price_per_seat: parseFloat(formData.price_per_seat),
        status: 'scheduled',
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating ride:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create a New Ride</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle
          </label>
          <select
            value={formData.vehicle_id}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              vehicle_id: e.target.value
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select a vehicle</option>
            {vehicles?.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="text"
            value={formData.departure_location}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              departure_location: e.target.value
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            To
          </label>
          <input
            type="text"
            value={formData.destination}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              destination: e.target.value
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Departure Time
          </label>
          <input
            type="datetime-local"
            value={formData.departure_time}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              departure_time: e.target.value
            }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Available Seats
            </label>
            <input
              type="number"
              min="1"
              value={formData.available_seats}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                available_seats: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price per Seat
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.price_per_seat}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                price_per_seat: e.target.value
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Create Ride
        </button>
      </form>
    </div>
  );
}