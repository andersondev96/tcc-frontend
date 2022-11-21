import { AiOutlineCamera } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { SideBar } from "../../../components/Sidebar";

export const CreateServicesEntrepreneur: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col items-center py-[1.5rem] mobile:py-[1.75rem]">
          <h1 className="font-montserrat font-medium text-2xl mobile:text-lg">
            Adicionar serviços e produtos
          </h1>
        </div>
        <div className="flex flex-col gap-6 p-16 mobile:p-8">
          <div className="flex flex-col gap-1 w-all">
            <label
              className="font-inter font-medium text-sm text-indigo-700"
              htmlFor="product"
            >
              Nome do produto/serviço
            </label>
            <input
              className="h-12 rounded font-montserrat font-light text-sm"
              type="text"
              placeholder="Digite o nome do produto/serviço"
            />
          </div>
          <div className="flex flex-col gap-1 w-all">
            <label
              className="font-inter font-medium text-sm text-indigo-700"
              htmlFor="product"
            >
              Descrição do produto/serviço
            </label>

            <textarea
              className="h-28 rounded font-montserrat font-light text-sm resize-none"
              placeholder="Adicione aqui detalhes sobre o seu produto/serviço"
            />
          </div>
          <div className="flex flex-row gap-16 w-all mobile:flex-col mobile:gap-6">
            <div className="flex flex-col w-full">
              <label
                className="font-inter font-medium text-sm text-indigo-700"
                htmlFor="product"
              >
                Categoria do produto/serviço
              </label>
              <select className="h-12 rounded font-montserrat font-light text-sm">
                <option value="0" disabled>
                  Selecione uma opção
                </option>
                <option value="1">Opção 1</option>
                <option value="2">Opção 2</option>
              </select>
            </div>
            <div className="flex flex-col w-full">
              <label
                className="font-inter font-medium text-sm text-indigo-700"
                htmlFor="product"
              >
                Preço do produto/serviço
              </label>
              <input
                className="h-12 rounded font-montserrat font-light text-sm"
                type="text"
                placeholder="Digite o preço do produto/serviço"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 w-all">
            <label
              className="font-inter font-medium text-sm text-indigo-700"
              htmlFor="product"
            >
              Adicionar imagem
            </label>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col justify-center items-center w-64 h-44 bg-gray-300 rounded-lg border-2 border-gray-400 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
            >
              <div className="flex flex-col justify-center items-center ">
                <AiOutlineCamera size={24} />
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
          <div className="flex flex-row items-center w-full gap-2">
            <input type="checkbox" name="hasLocation" />
            <label
              htmlFor="hasLocation"
              className="font-montserrat font-semibold text-sm text-indigo-200"
            >
              Colocar produto/serviço em destaque
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
