import { MapPin, Car, Walk, Train, Bike } from 'lucide-react';
import type { TravelMode } from '../../types/maps';

interface MapControlsProps {
  travelMode: TravelMode;
  onTravelModeChange: (mode: TravelMode) => void;
}

export function MapControls({ travelMode, onTravelModeChange }: MapControlsProps) {
  const modes: { mode: TravelMode; label: string; icon: typeof Car }[] = [
    { mode: 'DRIVING', label: 'Drive', icon: Car },
    { mode: 'WALKING', label: 'Walk', icon: Walk },
    { mode: 'TRANSIT', label: 'Transit', icon: Train },
    { mode: 'BICYCLING', label: 'Bike', icon: Bike },
  ];

  return (
    <div className="flex gap-2">
      {modes.map(({ mode, label, icon: Icon }) => (
        <button
          key={mode}
          onClick={() => onTravelModeChange(mode)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg
            ${travelMode === mode
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
        >
          <Icon className="w-4 h-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}