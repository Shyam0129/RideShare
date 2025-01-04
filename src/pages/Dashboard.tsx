import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import DriverDashboard from '../components/dashboard/DriverDashboard';
import RiderDashboard from '../components/dashboard/RiderDashboard';
import { useProfile } from '../hooks/useProfile';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useProfile();

  if (!user) {
    navigate('/login');
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      {profile?.user_type === 'driver' ? (
        <DriverDashboard />
      ) : (
        <RiderDashboard />
      )}
    </div>
  );
}