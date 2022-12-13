import { ChangeEvent, useEffect, useState } from "react";

import axios from "axios";

import { Map } from "../../components/Map";
import { Range } from "../../components/Range";
import { Select } from "../../components/Select";

import { Header } from "../../components/Header";
import { useAuthWithGoogle } from "../../hooks/useAuthWithGoogle";
import { useNavigate } from "react-router-dom";
import { LatLngExpression } from "leaflet";

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
    const { user, signInWithGoogle, signOutWithGoogle } = useAuthWithGoogle();

    const navigate = useNavigate();

    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<IBGECityResponse[]>([]);

    const [selectedUf, setSelectedUf] = useState("0");
    const [selectedCity, setSelectedCity] = useState("0");
    const [coords, setCoords] = useState([0, 0]);

    function handleSignOutWithGoogle() {
        signOutWithGoogle();

        navigate("/login");
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
        <div className="flex flex-col mobile:flex-col-reverse">
            <div className="flex flex-row">
                <div className="flex flex-col justify-between gap-3 bg-blue-400 min-h-screen min-w-min py-24 px-24 mobile:hidden">
                    <div className="flex flex-col gap-4 justify-center">
                        <Select
                            name="states"
                            label="Estado"
                            value={selectedUf}
                            onChange={handleSelectedUf}
                        >
                            <option value="0" disabled>
                                Selecione uma opção
                            </option>
                            {ufs.map((uf) => (
                                <option key={uf.id} value={uf.sigla}>
                                    {uf.nome}
                                </option>
                            ))}
                        </Select>

                        <Select
                            name="cities"
                            label="Cidade"
                            value={selectedCity}
                            onChange={handleSelectedCity}
                        >
                            <option value="0" disabled>
                                Selecione uma opção
                            </option>
                            {cities.map((city) => (
                                <option key={city.id} value={city.nome}>
                                    {city.nome}
                                </option>
                            ))}
                        </Select>

                        <Select name="categories" label="Categoria do negócio">
                            <option value="default" disabled>
                                Selecione uma opção
                            </option>
                            <option value="Cafeteria">Cafeteria</option>
                            <option value="Sorveteria">Sorveteria</option>
                        </Select>

                        <div className="flex flex-row justify-center mt-4">
                            <button
                                className="bg-indigo-500 h-10 w-28 rounded font-montserrat font-semibold text-white hover:brightness-90 transition-opacity"
                                onClick={getLocation}
                            >
                                Pesquisar
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-row items-center gap-4">
                        <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="h-12 w-12 rounded-full border-x-slate-900 border-2 border-white"
                        />
                        <div className="flex flex-col">
                            <span className="font-montserrat font-medium text-sm text-white">
                                {user?.name}
                            </span>
                            <span
                                className="font-montserrat font-light text-xs text-white text-right cursor-pointer hover:brightness-90 transition-shadow"
                                onClick={handleSignOutWithGoogle}
                            >
                                Sair
                            </span>
                        </div>
                    </div>
                    {/* <div className="flex flex-col mt-8">
            <Range />
          </div> */}
                </div>
                <div>
                    <Map lat={coords[0]} lng={coords[1]} />
                </div>
            </div>
        </div>
    );
};
