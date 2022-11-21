import { SideBar } from "../../../components/Sidebar";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";

export const Settings: React.FC = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-col  py-[1.5rem] mobile:py-[1.75rem] mobile:items-center">
          <h1 className="font-montserrat font-medium text-center text-2xl mobile:text-center">
            Configurações
          </h1>
        </div>
        <div className="flex flex-col px-12">
          <div>
            <span className="font-montserrat font-semibold text-lg">
              Card do serviço
            </span>
            <div className="flex flex-row gap-9 mt-6 mobile:flex-col mobile:gap-6">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="NameServiceColor"
                  className="font-montserrat font-semibold text-xs text-blue-400 "
                >
                  Cor do nome do serviço
                </label>
                <input
                  type="color"
                  value="#A0185A"
                  name="NameServiceColor"
                  className="appearance-none w-20 h-8 border-none rounded bg-transparent cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="NameServiceColor"
                  className="font-montserrat font-semibold text-xs text-blue-400 "
                >
                  Cor do preço do serviço
                </label>
                <input
                  type="color"
                  value="#B6B2B2"
                  name="NameServiceColor"
                  className="appearance-none w-20 h-8 border-none rounded bg-transparent cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="NameServiceColor"
                  className="font-montserrat font-semibold text-xs text-blue-400 "
                >
                  Cor do card
                </label>
                <input
                  type="color"
                  value="#E7E999"
                  name="NameServiceColor"
                  className="appearance-none w-20 h-8 border-none rounded bg-transparent cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-9">
            <span className="font-montserrat font-regular text-sm">
              Pré-visualização:
            </span>
            <div className="flex flex-col justify-center px-16  w-56 h-16 bg-yellow-100 rounded">
              <span className="font-montserrat font-semibold text-sm text-pink-800">
                Serviço
              </span>
              <AssessmentsStars stars={5} />
              <strong className="font-inter font-semibold text-xs text-gray-700">
                R$ 4,50
              </strong>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-9">
            <label
              htmlFor="FeaturedServicesQuantity"
              className="font-montserrat font-semibold text-xs text-blue-400 "
            >
              Quantidade de serviços em destaque
            </label>
            <input
              type="number"
              min="1"
              max="5"
              defaultValue="3"
              className="w-14 h-7 rounded bg-gray-200 border-none font-montserrat font-medium text-sm text-gray-100"
            />
          </div>
          <div className="flex flex-col gap-2 mt-9 mobile:mt-6">
            <span className="font-montserrat font-semibold text-lg text-blue-400">
              Preferências
            </span>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="budget"
                className="rounded border-2 border-black"
              />
              <label
                htmlFor="budget"
                className="font-montserrat font-light text-sm"
              >
                Ativar serviço de orçamento online
              </label>
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                type="checkbox"
                id="budget"
                className="rounded border-2 border-black"
              />
              <label
                htmlFor="budget"
                className="font-montserrat font-light text-sm"
              >
                Ativar chat online
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <button className="flex items-center justify-center mt-12 w-48 h-12 bg-blue-200 rounded hover:brightness-90 duration-300 transition-opacity mobile:mt-8">
              <span className="font-montserrat font-medium text-white">
                Salvar alterações
              </span>
            </button>
            <span className="flex flex-row justify-end mobile:justify-start mobile:py-4">
              <a href="" className="font-montserrat text-sm text-red-500">
                Excluir conta
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
