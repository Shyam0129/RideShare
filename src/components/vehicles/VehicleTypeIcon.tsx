import { Car, Truck, Bike, Crown, Zap } from 'lucide-react';

type VehicleType = 
  | 'sedan' | 'suv' | 'hatchback' | 'wagon'
  | 'van' | 'pickup'
  | 'motorcycle' | 'scooter'
  | 'luxury_sedan' | 'sports_car'
  | 'ev_sedan' | 'ev_suv';

interface VehicleTypeIconProps {
  type: VehicleType;
  className?: string;
}

export default function VehicleTypeIcon({ type, className = '' }: VehicleTypeIconProps) {
  switch (type) {
    case 'van':
    case 'pickup':
      return <Truck className={className} />;
    case 'motorcycle':
    case 'scooter':
      return <Bike className={className} />;
    case 'luxury_sedan':
    case 'sports_car':
      return <Crown className={className} />;
    case 'ev_sedan':
    case 'ev_suv':
      return <Zap className={className} />;
    default:
      return <Car className={className} />;
  }
}