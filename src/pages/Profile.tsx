import ProfileInfo from '../components/profile/ProfileInfo';
import RideHistory from '../components/profile/RideHistory';
import VehicleList from '../components/profile/VehicleList';
import AuthGuard from '../components/AuthGuard';

export default function Profile() {
  return (
    <AuthGuard>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <ProfileInfo />
          <VehicleList />
        </div>
        
        <RideHistory />
      </div>
    </AuthGuard>
  );
}