import { Star } from 'lucide-react';
import type { DriverStats } from '../../hooks/useDriverProfile';
import type { Database } from '../../types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];

interface DriverProfileCardProps {
  profile: Profile;
  stats: DriverStats;
  size?: 'sm' | 'md' | 'lg';
}

export default function DriverProfileCard({ profile, stats, size = 'md' }: DriverProfileCardProps) {
  const sizeClasses = {
    sm: {
      avatar: 'w-10 h-10',
      name: 'text-sm',
      stats: 'text-xs',
    },
    md: {
      avatar: 'w-12 h-12',
      name: 'text-base',
      stats: 'text-sm',
    },
    lg: {
      avatar: 'w-16 h-16',
      name: 'text-lg',
      stats: 'text-base',
    },
  };

  return (
    <div className="flex items-start gap-4">
      <div className={`${sizeClasses[size].avatar} bg-blue-100 rounded-full flex items-center justify-center`}>
        {profile.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt={profile.full_name || ''}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className={`${sizeClasses[size].name} font-semibold text-blue-600`}>
            {(profile.full_name || 'U')[0].toUpperCase()}
          </span>
        )}
      </div>
      
      <div>
        <h3 className={`${sizeClasses[size].name} font-semibold`}>
          {profile.full_name}
        </h3>
        
        <div className={`flex items-center ${sizeClasses[size].stats} text-gray-600`}>
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          <span>{stats.rating.toFixed(1)}</span>
          <span className="mx-1">•</span>
          <span>{stats.completedRides} rides</span>
        </div>
      </div>
    </div>
  );
}