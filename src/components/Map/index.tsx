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

      console.log(initialPosition);
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
    googleMapsApiKey: "AIzaSyAS6iQlkF3hAHMTmFyItkoW4Sd8j0wKKSM",
  });


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
