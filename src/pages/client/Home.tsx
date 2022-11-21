import { useState } from "react";
import { Map } from "../../components/Map";
import { Range } from "../../components/Range";
import { Select } from "../../components/Select";

export const Home: React.FC = () => {
  return (
    <div className="flex flex-row mobile:flex-col-reverse">
      <div className="flex flex-col gap-4 bg-blue-400 min-h-screen min-w-[22.125rem] py-[4.25rem] px-[3.125rem] mobile:hidden">

        <Select
          name="states"
          label="Estado"
        >
          <option value="default" disabled>Selecione uma opção</option>
          <option value="MG">Minas Gerais</option>
          <option value="SP">São Paulo</option>
        </Select>

        <Select
          name="cities"
          label="Cidade"
        >
          <option value="default" disabled>Selecione uma opção</option>
          <option value="Itabira">Itabira</option>
          <option value="João Monlevade">João Monlevade</option>
        </Select>

        <Select
          name="categories"
          label="Categoria do negócio"
        >
          <option value="default" disabled>Selecione uma opção</option>
          <option value="Cafeteria">Cafeteria</option>
          <option value="Sorveteria">Sorveteria</option>
        </Select>

        <div className="flex flex-col mt-8">
          <Range />
        </div>

        <div className="flex flex-row justify-center mt-[4.25rem]">
          <button
            className="bg-indigo-500 h-[2.5rem] w-[7.813rem] rounded font-montserrat font-semibold text-white hover:brightness-90 transition-opacity"
          >
            Pesquisar
          </button>
        </div>
      </div>

        <Map />
    </div>
  );
}
