import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";

import { GoLinkExternal } from "react-icons/go";
import { FiEdit, FiEdit2 } from "react-icons/fi";

import { AssessmentsStars } from "../../client/components/AssessmentsStars";
import { Assessments } from "../../client/components/Assessments";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

export const ShowServicesEntrepreneur: React.FC = () => {

    return (
        <div className="flex flex-row">
            <SideBar pageActive="servicos" />
            <div className="flex flex-col w-full sm:ml-64 p-8">
                <PreviousPageButton />
                <div className="flex flex-row items-center gap-6 sm:gap-12 px-24 py-12 border-b-2 border-gray-300">
                    <img src={Coffee} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-fill rounded-full" />
                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-bold text-2xl text-gray-800">Cappuccino</span>
                        <span className="font-inter font-light text-sm">Cafés e bebidas quentes</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 py-8 px-24">
                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">Descrição</span>
                        <p className="font-inter text-sm text-justify">
                            Café com açúcar saboroso preparado pela casa.
                            Quantidade: 200 ml
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">Categoria</span>
                        <p className="font-inter text-sm text-justify">Cafés e bebidas quentes</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium text-base">Preço</span>
                        <p className="font-inter text-sm text-justify">R$ 5,00</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">Serviços</span>
                        <p className="font-inter text-sm text-justify">Cafés, bebidas quentes e geladas</p>
                    </div>

                    <div className="flex flex-col mt-8 sm:mt-10 gap-1">
                        <span className="font-inter font-medium text-sm">Avaliações</span>
                        <p className="font-inter font-light text-sm">16 avaliações recebidas</p>
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

                    <span className="mt-4 font-inter font-medium text-sm text-blue-600">Veja todos os comentários</span>

                    <div className="flex flex-row items-center gap-6">

                        <button className="mt-6 sm:mt-12 w-36 h-12 p-4 flex flex-row items-center justify-center gap-2 sm:gap-4 rounded bg-green-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                            <FiEdit2 size={16} />
                            <span>Editar</span>
                        </button>

                        <button className="mt-6 sm:mt-12 w-36 h-12 p-4 flex flex-row items-center justify-center gap-4 rounded bg-red-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                            <AiOutlineDelete size={16} />
                            <span>Excluir</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}