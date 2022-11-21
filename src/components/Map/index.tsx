import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { Popup } from './Popup';
import CoffeeImg from '../../assets/coffee.png';

export const Map: React.FC = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  function setLocalization() {
    navigator.geolocation.getCurrentPosition(position => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }

  useEffect(() => {
    setLocalization();
  }, [setLocalization]);

  return (
    latitude && longitude ? (
      <MapContainer
        className="w-screen h-screen relative flex mobile:min-w-min"
        center={[latitude, longitude]}
        zoom={10} scrollWheelZoom={true}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX}`}
        />
        <Marker position={[latitude, longitude]}>
          <Popup
            image={CoffeeImg}
            name="Singhtglass Coffee"
            category="Cafeteria"
          />
        </Marker>

        <Marker position={[-19.6020179, -43.2177258]}>
          <Popup
            image={CoffeeImg}
            name="Singhtglass Coffee"
            category="Cafeteria"
          />
        </Marker>

      </MapContainer>
    ) : (
      <div></div>
    )
  )
}