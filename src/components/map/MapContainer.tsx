import { useEffect, useRef, useState } from 'react';
import { useLoadScript } from './useLoadScript';
import { MapControls } from './MapControls';
import type { LatLng, RouteInfo, TravelMode } from '../../types/maps';

interface MapContainerProps {
  origin: string;
  destination: string;
  onRouteChange?: (route: RouteInfo) => void;
  className?: string;
}

export default function MapContainer({ origin, destination, onRouteChange, className = '' }: MapContainerProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [error, setError] = useState<string>('');
  
  const { isLoaded, loadError } = useLoadScript();

  useEffect(() => {
    if (!isLoaded) return;

    const map = new google.maps.Map(document.getElementById('map')!, {
      zoom: 12,
      center: { lat: 0, lng: 0 },
      mapTypeControl: false,
    });

    const renderer = new google.maps.DirectionsRenderer({ map });
    const service = new google.maps.DirectionsService();

    mapRef.current = map;
    setDirectionsService(service);
    setDirectionsRenderer(renderer);

    return () => {
      renderer.setMap(null);
    };
  }, [isLoaded]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer || !origin || !destination) return;

    calculateRoute();
  }, [origin, destination, travelMode, directionsService, directionsRenderer]);

  const calculateRoute = async () => {
    if (!directionsService || !directionsRenderer) return;

    try {
      setError('');
      const result = await directionsService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode[travelMode],
      });

      directionsRenderer.setDirections(result);

      if (onRouteChange) {
        const route = result.routes[0].legs[0];
        onRouteChange({
          distance: route.distance?.text || '',
          duration: route.duration?.text || '',
          startLocation: route.start_location.toJSON(),
          endLocation: route.end_location.toJSON(),
          steps: route.steps.map(step => ({
            instruction: step.instructions,
            distance: step.distance?.text || '',
            duration: step.duration?.text || '',
          })),
        });
      }
    } catch (error) {
      setError('Could not calculate route. Please check the addresses and try again.');
      console.error('Route calculation error:', error);
    }
  };

  if (loadError) {
    return <div className="text-red-600">Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="animate-pulse">Loading map...</div>;
  }

  return (
    <div className="space-y-4">
      <MapControls
        travelMode={travelMode}
        onTravelModeChange={setTravelMode}
      />
      
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div
        id="map"
        className={`h-[400px] rounded-lg shadow-lg ${className}`}
      />
    </div>
  );
}