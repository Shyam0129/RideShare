import { useEffect, useRef, useState } from 'react';
import { useLoadScript } from '../../hooks/useLoadScript';
import type { MapOptions, MapMarker } from '../../types/maps';

interface GoogleMapProps {
  center: google.maps.LatLngLiteral;
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  options?: Partial<MapOptions>;
  onLoad?: (map: google.maps.Map) => void;
  onClick?: (e: google.maps.MapMouseEvent) => void;
}

export default function GoogleMap({ 
  center, 
  zoom = 14,
  markers = [],
  className = '',
  options = {},
  onLoad,
  onClick
}: GoogleMapProps) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [mapError, setMapError] = useState<string>('');
  const { isLoaded, loadError } = useLoadScript();

  // Initialize map
  useEffect(() => {
    if (!isLoaded || mapRef.current) return;

    try {
      const map = new google.maps.Map(document.getElementById('map')!, {
        center,
        zoom,
        mapTypeControl: false,
        fullscreenControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ],
        ...options
      });

      if (onClick) {
        map.addListener('click', onClick);
      }

      mapRef.current = map;
      onLoad?.(map);
    } catch (error) {
      setMapError('Failed to initialize map');
      console.error('Map initialization error:', error);
    }
  }, [isLoaded, center, zoom, options, onLoad, onClick]);

  // Handle markers
  useEffect(() => {
    if (!mapRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    markers.forEach(({ position, title, icon }) => {
      const marker = new google.maps.Marker({
        position,
        map: mapRef.current!,
        title,
        icon
      });
      markersRef.current.push(marker);
    });
  }, [markers]);

  if (loadError || mapError) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        Failed to load Google Maps
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg" style={{ height: '400px' }}>
        <div className="h-full flex items-center justify-center text-gray-500">
          Loading map...
        </div>
      </div>
    );
  }

  return (
    <div 
      id="map" 
      className={`rounded-lg shadow-lg ${className}`}
      style={{ height: '400px' }}
    />
  );
}