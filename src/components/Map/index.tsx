import { useEffect, useRef, useState, useCallback } from "react";
import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvent,
    useMap,
} from "react-leaflet";
import { Popup } from "./Popup";
import CoffeeImg from "../../assets/coffee.png";

interface IMapProps {
    lat: number;
    lng: number;
}

export const Map: React.FC<IMapProps> = ({ lat, lng }) => {
    const animateRef = useRef(false);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    let coords = {
        lat: 0,
        lng: 0,
    };

    function setLocalization() {
        if (lat === 0 && lng === 0) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            setLatitude(lat);
            setLongitude(lng);
        }
    }

    const center = [51.505, -0.09];
    const zoom = 13;

    const handleSetView = useCallback(() => {
        const map = useMap();
        map.setView([51.505, -0.09], zoom);
    }, []);

    function SetViewOnClick({ animateRef }: any) {
        const map = useMapEvent("click", (e) => {
            map.setView([latitude, longitude], map.getZoom(), {
                animate: animateRef.current || false,
            });
        });

        return null;
    }

    useEffect(() => {
        setLocalization();
    }, [setLocalization]);

    return latitude && longitude ? (
        <div>
            <MapContainer
                className="w-screen h-screen absolute z-10 flex mobile:min-w-min"
                center={[latitude, longitude]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX
                        }`}
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
                <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
        </div>
    ) : (
        <div></div>
    );
};
