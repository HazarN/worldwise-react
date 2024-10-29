// React Libs
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import { useEffect, useState } from 'react';

// Contexts
import { useCityContext } from '../../contexts/CityContext';

// Custom Hooks
import { useGeolocate } from '../../hooks/useGeolocate';
import { useURLPosition } from '../../hooks/useURLPosition';

import Button from '../Button/Button';

// CSS Module
import styles from './Map.module.css';
import { useNavigate } from 'react-router-dom';

const DUMMY_LAT = 39.0;
const DUMMY_LNG = 35.0;

function Map() {
  const {
    position: { lat: geoLat, lng: geoLng },
    isLoading: isLoadingPosition,
    getPosition,
  } = useGeolocate();
  const { cities } = useCityContext();
  const [lat, lng] = useURLPosition();
  const [mapPosition, setMapPosition] = useState([DUMMY_LAT, DUMMY_LNG]);

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoLat && geoLng) setMapPosition([geoLat, geoLng]);
  }, [geoLat, geoLng]);

  return (
    <div className={styles.mapContainer}>
      {!geoLat && !geoLng && (
        <Button type={'position'} onClick={getPosition}>
          {isLoadingPosition ? '...Loading' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={6}
        doubleClickZoom={false}
        scrollWheelZoom={true}
      >
        <TileLayer
          noWrap={true}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              {city.cityName} in {new Date(city.date).getFullYear()}
            </Popup>
          </Marker>
        ))}

        <Relocate position={mapPosition} />
        <OnMapClick />
      </MapContainer>
    </div>
  );
}

function Relocate({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function OnMapClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
