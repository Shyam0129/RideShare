import { MapPin } from 'lucide-react';
import type { RouteInfo } from '../../types/maps';

interface RouteDetailsProps {
  route: RouteInfo;
}

export function RouteDetails({ route }: RouteDetailsProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-start mb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Distance</p>
              <p className="font-medium">{route.distance}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-medium">{route.duration}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Turn-by-turn directions</h3>
        <ol className="space-y-3">
          {route.steps.map((step, index) => (
            <li key={index} className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                {index + 1}
              </span>
              <div>
                <p dangerouslySetInnerHTML={{ __html: step.instruction }} />
                <p className="text-sm text-gray-500">
                  {step.distance} • {step.duration}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}