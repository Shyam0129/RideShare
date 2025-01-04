import { Link } from 'react-router-dom';
import { Car, MapPin, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Share Rides, Save Money, Meet People
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Join our community of drivers and riders for a better way to travel
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/rides"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg border border-blue-600 hover:bg-blue-50 transition"
          >
            Find a Ride
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 py-12">
        <div className="text-center p-6">
          <Car className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Easy Ride Sharing</h2>
          <p className="text-gray-600">
            Find and share rides with verified members of our community
          </p>
        </div>
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Flexible Routes</h2>
          <p className="text-gray-600">
            Choose from various routes or create your own journey
          </p>
        </div>
        <div className="text-center p-6">
          <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Trusted Community</h2>
          <p className="text-gray-600">
            Connect with verified drivers and passengers
          </p>
        </div>
      </div>
    </div>
  );
}