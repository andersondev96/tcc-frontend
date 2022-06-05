import { GoogleMap, useJsApiLoader, Marker,  } from "@react-google-maps/api";

import React, { useCallback, useEffect, useState } from 'react';

import MarkerIcon from "../../assets/marker.png";

import { Container } from './styles';

export const Map: React.FC = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number]>([0,0]);
  const [selectPosition, setSelectPosition] = useState<[number, number]>([0,0]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {

      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    })
  }, []);


  const containerStyle = {
    width: '660px',
    height: '190px'
  };

  const center = {
    lat: initialPosition[0],
    lng: initialPosition[1],
  };

  const position = {
    lat: selectPosition[0],
    lng: selectPosition[1],
  }

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyCgNh3u12QXomYWG3eLb-pM1qvZhjduxso",
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  function clickOnMap(event: google.maps.MapMouseEvent): void | undefined {
    if (event.latLng) {
      setSelectPosition([
        event.latLng.lat(),
        event.latLng.lng()
      ]);
    }
  }

  return (
    isLoaded ?
      (<Container>

        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}
          onClick={clickOnMap}
        >

          <Marker
            icon={MarkerIcon}
            position={position}

          />


        </GoogleMap>

      </Container>) : (
        <></>
      )
  );
}

export default Map;
