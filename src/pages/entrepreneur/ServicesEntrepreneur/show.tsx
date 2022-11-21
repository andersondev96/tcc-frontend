import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";

import { GoLinkExternal } from "react-icons/go";
import { FiEdit, FiEdit2 } from "react-icons/fi";

import { AssessmentsStars } from "../../client/components/AssessmentsStars";
import { Assessments } from "../../client/components/Assessments";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

export const ShowServicesEntrepreneur: React.FC = () => {

  return (
    <div className="flex flex-row">
      <SideBar />
      <div className="flex flex-col w-full sm:ml-64">
        <div className="flex flex-row items-center gap-12 mobile:gap-6 px-[6.25rem] py-12 bg-gray-200 border-b-2 border-gray-500">
          <img src={Coffee} alt="" className="h-16 w-16 mobile:w-12 mobile:h-12 object-fill rounded-full" />
          <div className="flex flex-col gap-[0.0125rem]">
            <span className="font-inter font-bold text-2xl text-gray-800">Cappuccino</span>
            <span className="font-inter font-light text-sm">Cafés e bebidas quentes</span>
          </div>
        </div>
        <div className="flex flex-col gap-6 mobile:gap-4 py-16 mobile:py-8 px-[6.25rem]">
          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base">Descrição</span>
            <p className="font-inter text-sm text-justify">
              Café com açúcar saboroso preparado pela casa.
              Quantidade: 200 ml
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base">Categoria</span>
            <p className="font-inter text-sm text-justify">Cafés e bebidas quentes</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base">Preço</span>
            <p className="font-inter text-sm text-justify">R$ 5,00</p>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-inter font-medium text-base">Serviços</span>
            <p className="font-inter text-sm text-justify">Cafés, bebidas quentes e geladas</p>
          </div>

          <div className="flex flex-col mt-14 mobile:mt-8 gap-1">
            <span className="font-inter font-medium text-xl">Avaliações</span>
            <p className="font-inter font-light text-base">16 avaliações recebidas</p>
            <div className="flex flex-row items-center gap-3">
              <AssessmentsStars stars={5} mode="view" />
              <span
                className="font-inter font-semibold text-xs text-gray-700"
              >
                3.0
              </span>
            </div>
            <Assessments text="O melhor café da cidade" stars={3} />
            <Assessments text="Atendimento de qualidade, estão de parabéns" stars={4} />
            <Assessments text="Gostei muito do atendimento" stars={5} />
          </div>

          <span className="mt-4 font-inter font-light text-xs text-blue-400">Veja todos os comentários</span>

          <div className="flex flex-row items-center gap-6">
          
            <button className="mt-12 mobile:mt-6 flex flex-row items-center justify-center gap-4 w-40 h-12 rounded bg-green-500 font-montserrat font-medium text-white cursor-pointer hover:brightness-90 duration-300">
              <FiEdit2 />
              <span>Editar</span>
            </button>
          
            <button className="mt-12 mobile:mt-6 flex flex-row items-center justify-center gap-4 w-40 h-12 rounded bg-red-500 font-montserrat font-medium text-white cursor-pointer hover:brightness-90 duration-300">
            <AiOutlineDelete />
              <span>Excluir</span>
            </button>
          
          </div>
        </div>
      </div>
    </div>
  );
}