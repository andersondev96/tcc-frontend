import { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    Marker,
    TileLayer,
    useMapEvent
} from "react-leaflet";
import NoImageImg from "../../assets/no-camera.png";
import api from "../../services/api";
import { Popup } from "./Popup";

interface ICompanies {
    id: string;
    name: string;
    category: string;
    contact: {
        telephone: string;
        email: string;
        whatsapp?: string;
        website?: string;
    }
    Address?: {
        cep: string,
        street: string,
        district: string,
        number: number,
        state: string,
        city: string,
        latitude: number,
        longitude: number
    },
    ImageCompany?: [
        {
            id: string,
            title: string,
            image_name: string,
            image_url: string,
        }
    ]
}

export const Map: React.FC = () => {
    const animateRef = useRef(false);
    const [companies, setCompanies] = useState<ICompanies[]>([]);
    const [coords, setCoords] = useState([0, 0]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    useEffect(() => {
        api.get(`/companies`).then((response) => setCompanies(response.data));
    }, []);

    function setLocalization() {
        if (coords[0] === 0 && coords[1] === 0) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
            });
        } else {
            setLatitude(coords[0]);
            setLongitude(coords[1]);
        }
    }

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
                className="w-screen h-screen relative z-0 flex mobile:min-w-min"
                center={[latitude, longitude]}
                zoom={13}
                scrollWheelZoom={true}
            >
                <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_ACCESS_TOKEN_MAP_BOX
                        }`}
                />
                {companies && companies.map(company => company.Address && (
                    <div key={company.id}>
                        <Marker
                            position={[company.Address.latitude, company.Address.longitude]}>
                            <Popup
                                id={company.id}
                                image={company.ImageCompany && company.ImageCompany.length > 0
                                    ? company.ImageCompany[0].image_url
                                    : NoImageImg
                                }
                                name={company.name}
                                category={company.category}
                                contact={company.contact}
                            />
                        </Marker>
                    </div>
                ))}


                <SetViewOnClick animateRef={animateRef} />
            </MapContainer>
        </div>
    ) : (
        <div role="status" className="flex items-center justify-center mt-16">
            <svg aria-hidden="true" className="w-12 h-12 mr-2 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
        </div>

    );
};
