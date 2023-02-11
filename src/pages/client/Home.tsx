import { ChangeEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getCoordinatesFromCEP } from "../../utils/getCoordinatesFromCEP";

import { Map } from "../../components/Map";
import { NavBar } from "../../components/NavBar/NavBar";
import api from "../../services/api";
interface IBGEUFResponse {
    id: string;
    sigla: string;
    nome: string;
}

type IBGECityResponse = {
    id: string;
    nome: string;
};

type IGeometry = {
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
};

type ICoords = {
    results: IGeometry[];
};

export const Home: React.FC = () => {
    /*  const { user, signInWithGoogle, signOutWithGoogle } = useAuthWithGoogle(); */


    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<IBGECityResponse[]>([]);

    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");
    const [coords, setCoords] = useState([0, 0]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    useEffect(() => {
        axios
            .get<IBGEUFResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados`
            )
            .then((response) => {
                setUfs(response.data);
            });
    }, []);

    useEffect(() => {
        if (selectedUf === "0") {
            return;
        }

        axios
            .get<IBGECityResponse[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )
            .then((response) => {
                setCities(response.data);
            });
    }, [selectedUf]);

    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;

        setSelectedUf(uf);
    }

    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;

        setSelectedCity(city);
    }

    function getLocation() {
        const address = `${selectedCity}, ${selectedUf}`;

        axios
            .get<ICoords>(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                }`
            )
            .then((response) => {
                setCoords([
                    response.data.results[0].geometry.location.lat,
                    response.data.results[0].geometry.location.lng,
                ]);
            });
    }

    return (

        <div>
            <NavBar pageCurrent="home" />

            <div className="flex flex-col w-screen h-screen">
                <div className="flex items-center justify-center py-2 bg-gray-600 bg-opacity-60">
                    <span className="font-medium text-white">Selecione um ponto no mapa para ver algum empreendimento</span>
                </div>
                <Map lat={coords[0]} lng={coords[1]} />
            </div>
        </div>
    );
};