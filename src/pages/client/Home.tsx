import { ChangeEvent, useEffect, useState } from "react";

import axios from "axios";

import { Map } from "../../components/Map";
import { Range } from "../../components/Range";
import { Select } from "../../components/Select";

import { Header } from "../../components/Header";

interface IBGEUFResponse {
  id: string;
  sigla: string;
  nome: string;
}

type IBGECityResponse = {
  id: string;
  nome: string;
};

export const Home: React.FC = () => {
  const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
  const [cities, setCities] = useState<IBGECityResponse[]>([]);

  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

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

  return (
    <div className="flex flex-col mobile:flex-col-reverse">
      <Header />
      <div className="flex flex-row">
        <div className="flex flex-col gap-4 bg-blue-400 min-h-screen min-w-min py-[4.25rem] px-[3.125rem] mobile:hidden">
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

          <div className="flex flex-col mt-8">
            <Range />
          </div>

          <div className="flex flex-row justify-center mt-[4.25rem]">
            <button className="bg-indigo-500 h-[2.5rem] w-[7.813rem] rounded font-montserrat font-semibold text-white hover:brightness-90 transition-opacity">
              Pesquisar
            </button>
          </div>
        </div>
        <div>
          <Map />
        </div>
      </div>
    </div>
  );
};
