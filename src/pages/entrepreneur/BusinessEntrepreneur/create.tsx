import { SideBar } from "../../../components/Sidebar";
import { AiOutlineCamera } from "react-icons/ai";
import { Input } from "../../../components/Input";
import { IoMdAddCircle } from "react-icons/io";
import { MdAdd } from "react-icons/md";
import { FiSave } from "react-icons/fi";
import { useState } from "react";

export const BusinessCreate: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="fixed w-full flex flex-row items-center gap-12 mobile:gap-6 px-[6.25rem] py-8 bg-gray-200 border-b-2 border-gray-500">
          <div className="flex">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-16 h-24 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex flex-col justify center items-center ">
                <AiOutlineCamera size={24} />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <span className="font-inter font-bold text-2xl text-gray-800 mobile:text-lg">
            Singhtglass Coffee
          </span>
        </div>
        <div className="flex flex-col w-[64rem] pt-52 pb-12 px-8 gap-6">
          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col w-1/2 gap-1 mobile:w-72">
              <label
                htmlFor="business-name"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Nome da empresa
              </label>
              <input
                className="h-12 rounded"
                type="text"
                name="business-name"
              />
            </div>
            <div className="flex flex-col w-1/2 gap-1 mobile:w-72">
              <label
                htmlFor="cnpj"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                CNPJ
              </label>
              <input className="h-12 rounded" type="text" name="cnpj" />
            </div>
          </div>

          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="category"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Categoria
              </label>
              <select className="h-12 rounded" name="category">
                <option value="">Opção 1</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="services"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Serviços oferecidos
              </label>
              <input className="h-12 rounded" type="text" name="services" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="font-montserrat font-semibold text-sm text-indigo-200"
            >
              Descrição
            </label>
            <textarea
              className="rounded resize-none mobile:w-72"
              name="description"
              id="description"
            />
          </div>

          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="telephone"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Telefone
              </label>
              <input className="h-12 rounded" type="text" name="telephone" />
            </div>
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="whatsapp"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Whatsapp
              </label>
              <input className="h-12 rounded" type="text" name="whatsapp" />
            </div>
          </div>

          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="email"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                E-mail
              </label>
              <input className="h-12 rounded" type="text" name="email" />
            </div>
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="website"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Website
              </label>
              <input className="h-12 rounded" type="text" name="website" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="category"
              className="font-montserrat font-semibold text-sm text-indigo-200"
            >
              Horários de funcionamento
            </label>
            <div className="flex flex-row w-full gap-16 mobile:flex-col mobile:gap-2">
              <select
                className="h-12 rounded w-1/2 mobile:w-72"
                name="category"
              >
                <option value="">Opção 1</option>
              </select>
              <div className="flex flex-row items-center w-1/2 gap-4 mobile:w-72">
                <input type="time" name="time" className="h-12 rounded w-1/2" />
                <span>às</span>
                <input type="time" name="time" className="h-12 rounded w-1/2" />
                <IoMdAddCircle size={32} color="#8E82CA" />
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center gap-2">
            <input type="checkbox" name="hasLocation" />
            <label
              htmlFor="hasLocation"
              className="font-montserrat font-semibold text-sm text-indigo-200"
            >
              Possui localização física
            </label>
          </div>
          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="address"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Endereço
              </label>
              <input className="h-12 rounded" type="text" name="address" />
            </div>
            <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
              <label
                htmlFor="district"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Bairro
              </label>
              <input className="h-12 rounded" type="text" name="district" />
            </div>
          </div>
          <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
            <div className="flex flex-col gap-1 w-48 mobile:w-72">
              <label
                htmlFor="address"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Número
              </label>
              <input className="h-12 rounded" type="text" name="address" />
            </div>
            <div className="flex flex-col gap-1 w-48 mobile:w-72">
              <label
                htmlFor="district"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                CEP
              </label>
              <input className="h-12 rounded" type="text" name="district" />
            </div>
            <div className="flex flex-col gap-1 w-36 mobile:w-72">
              <label
                htmlFor="state"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Estado
              </label>
              <input className="h-12 rounded" type="text" name="state" />
            </div>
            <div className="flex flex-col gap-1 w-60 mobile:w-72">
              <label
                htmlFor="district"
                className="font-montserrat font-semibold text-sm text-indigo-200"
              >
                Cidade
              </label>
              <input className="h-12 rounded" type="text" name="district" />
            </div>
          </div>
          <div className="mt-8 flex flex-row border-b border-gray-400 pb-2">
            <span className="font-inter text-xl">Adicionar imagens</span>
          </div>
          <div className="flex flex-row gap-3">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex flex-col justify-center items-center ">
                <AiOutlineCamera size={24} />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>

            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
            >
              <div className="flex flex-col justify-center items-center ">
                <MdAdd size={24} />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div className="mt-4 flex flex-row items-center justify-center">
            <button className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-2xl text-white uppercase hover:brightness-90 transition-colors">
              <FiSave />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
