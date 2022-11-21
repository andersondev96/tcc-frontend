import React from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { SideBar } from "../../../components/Sidebar";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

export const CreateProposal: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64  p-12">
        <PreviousPageButton />
        <div className="flex flex-col items-center py-[2.5rem] mobile:py-[1.75rem] mobile:items-start">
          <h1 className="font-montserrat font-medium text-2xl mobile:text-lg">
            Criar proposta
          </h1>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-6">
            <span className="font-montserrat font-medium text-lg mobile:text-sm">
              Preencha os campos abaixo:
            </span>
            <div className="flex flex-col gap-2">
              <label
                className="font-inter font-medium text-sm mobile:text-xs text-indigo-700"
                htmlFor="product"
              >
                Descrição sobre a proposta oferecida
              </label>

              <textarea
                className="h-28 w-[42.375rem] rounded font-montserrat font-light text-sm placeholder-black resize-none bg-gray-200 border-none mobile:w-60  mobile:text-xs"
                placeholder="Escreva aqui a proposta oferecida"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-inter font-medium text-sm mobile:text-xs text-indigo-700">
                Adicionar anexos
              </span>
              <button className="w-48 h-10 px-2 flex flex-row items-center gap-3 bg-indigo-400 rounded font-montserrat font-medium text-sm text-white hover:brightness-90 duration-300 transition-opacity mobile:w-44 mobile:text-xs">
                <AiOutlinePaperClip size={24} />
                Adicionar arquivos
              </button>
            </div>
            <div className="flex flex-row gap-10 mobile:gap-4 mobile:flex-col">
              <div className="flex flex-col gap-2">
                <span className="font-inter font-medium text-sm mobile:text-xs text-indigo-700">
                  Data de entrega do serviço
                </span>
                <input
                  type="date"
                  name="date"
                  className="w-64 h-10 bg-gray-200 rounded border-none mobile:w-60 mobile:text-xs"
                />
              </div>

              <div className="flex flex-col gap-2 mobile:gap-1">
                <span className="font-inter font-medium text-sm text-indigo-700 mobile:text-xs">
                  Valor total do serviço
                </span>
                <input
                  type="text"
                  name="value"
                  className="w-64 h-10 bg-gray-200 rounded border-none mobile:w-60 mobile:text-xs"
                />
              </div>

              <div className="flex flex-col gap-2">
                <span className="font-inter font-medium text-sm text-indigo-700 mobile:text-xs">
                  Parcelas
                </span>
                <input
                  type="number"
                  name="value"
                  defaultValue="1"
                  min="1"
                  max="12"
                  className="w-20 h-10 bg-gray-200 rounded border-none mobile:text-xs"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-row items-center mobile:items-start mobile:px-0 px-[17.25rem]">
              <button className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-xl text-white uppercase hover:brightness-90 transition-colors mobile:w-28 mobile:h-12 mobile:text-sm">
                <FiSave />
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
