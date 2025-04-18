
import React, { useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'chef' | 'event' | 'store';
}

interface MapViewProps {
  locations: Location[];
  initialViewState?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  onMarkerClick?: (location: Location) => void;
}

const mapboxToken = 'YOUR_MAPBOX_TOKEN'; // In production, use environment variables

const MapView = ({ 
  locations, 
  initialViewState = { latitude: 37.7749, longitude: -122.4194, zoom: 11 },
  onMarkerClick 
}: MapViewProps) => {
  const [popupInfo, setPopupInfo] = useState<Location | null>(null);
  
  const handleMarkerClick = (location: Location) => {
    setPopupInfo(location);
    onMarkerClick?.(location);
  };

  const getPinColor = (type: string) => {
    switch(type) {
      case 'chef': return 'text-feedoria-purple';
      case 'event': return 'text-feedoria-red';
      case 'store': return 'text-feedoria-red-dark';
      default: return 'text-feedoria-purple';
    }
  };

  return (
    <div className="h-[50vh] w-full rounded-lg overflow-hidden relative">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={initialViewState}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        attributionControl={false}
      >
        {locations.map(location => (
          <Marker
            key={location.id}
            latitude={location.lat}
            longitude={location.lng}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(location);
            }}
          >
            <div className={`${getPinColor(location.type)} transform hover:scale-110 transition-transform`}>
              <MapPin className="w-6 h-6 stroke-current fill-current" />
            </div>
          </Marker>
        ))}
        
        {popupInfo && (
          <Popup
            latitude={popupInfo.lat}
            longitude={popupInfo.lng}
            anchor="top"
            closeOnClick={false}
            onClose={() => setPopupInfo(null)}
            className="z-10"
          >
            <div className="p-2">
              <h3 className="font-medium">{popupInfo.name}</h3>
              <p className="text-xs text-muted-foreground capitalize">{popupInfo.type}</p>
            </div>
          </Popup>
        )}
      </Map>
      
      <div className="absolute bottom-2 left-2 right-2 bg-white rounded-lg shadow-lg p-2 text-xs text-center text-muted-foreground">
        Note: To view full map functionality, please add your Mapbox token
      </div>
    </div>
  );
};

export default MapView;
