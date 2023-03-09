import {
    AiOutlineCheck,
    AiOutlineClose,
    AiOutlinePaperClip,
} from "react-icons/ai";

import Coffee from "../../../../assets/coffee-img1.jpg";
import { PreviousPageButton } from "../../components/PreviousPageButton";
import { NavBar } from "../../../../components/NavBar/NavBar";

export const BudgetDetails: React.FC = () => {
    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="orcamentos" />
            <div className="flex flex-col p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-start sm:items-center">
                    <div className="flex flex-col items-start sm:items-center py-4">
                        <h1 className="font-montserrat font-medium text-2xl">Orçamento</h1>
                    </div>
                    <div className="flex flex-col mt-8 gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-16">
                            <span className="font-montserrat font-semibold text-lg">
                                Empresa
                            </span>
                            <p>Sightglass Coffee</p>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-montserrat font-semibold text-lg">
                                Sobre a proposta
                            </span>
                            <div className="w-60 sm:w-108 overflow-x-auto relative shadow-md sm:rounded mt-4">
                                <table className="w-full">
                                    <thead className="font-montserrat font-semibold text-sm text-center bg-gray-300">
                                        <tr>
                                            <th className="py-2 px-6"></th>
                                            <th className="py-2 px-6">Produto/Serviço</th>
                                            <th className="py-2 px-6">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody className="font-montserrat font-light text-sm text-center">
                                        <tr>
                                            <td className="py-2 px-6">
                                                <img
                                                    src={Coffee}
                                                    alt=""
                                                    className="h-8 sm:h-16 w-8 sm:w-16 rounded"
                                                />
                                            </td>
                                            <td className="py-2 px-6">Cappuccino cremoso</td>
                                            <td className="py-2 px-6">100</td>
                                        </tr>

                                        <tr className="font-montserrat font-light text-sm">
                                            <td className="py-2 px-6">
                                                <img
                                                    src={Coffee}
                                                    alt=""
                                                    className="h-16 w-16 rounded"
                                                />
                                            </td>
                                            <td className="py-2 px-6">Cappuccino cremoso</td>
                                            <td className="py-2 px-6">100</td>
                                        </tr>

                                        <tr className="font-montserrat font-light text-sm">
                                            <td className="py-2 px-6">
                                                <img
                                                    src={Coffee}
                                                    alt=""
                                                    className="h-16 w-16 rounded"
                                                />
                                            </td>
                                            <td className="py-2 px-6">Cappuccino cremoso</td>
                                            <td className="py-2 px-6">100</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-60 sm:w-108">
                            <span className="font-montserrat font-semibold text-lg">
                                Descrição
                            </span>
                            <p className="font-montserrat font-light text-sm text-justify">
                                Caro cliente, estamos dispostos a te atender, elaboramos esse
                                documento com uma proposta detalhada, qualquer dúvida entre em
                                contato pelo nosso chat ou redes sociais. Será um prazer
                                trabalhar para você.
                            </p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-montserrat font-semibold text-lg">
                                Arquivos
                            </span>
                            <a
                                href="#"
                                className="flex flex-row gap-2 items-center text-indigo-400 text-sm hover:underline"
                            >
                                <AiOutlinePaperClip />
                                <p>Proposta.pdf</p>
                            </a>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-montserrat font-semibold text-lg">
                                Data de entrega
                            </span>
                            <p className="font-montserrat font-light text-sm">11/04/2022</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-montserrat font-semibold text-lg">
                                Valor
                            </span>
                            <p className="font-montserrat font-light text-sm">
                                3x de R$ 44,90
                            </p>
                        </div>

                        <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-12">
                            <button className="flex flex-row items-center justify-center gap-5 w-36 h-12 rounded bg-green-600 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300">
                                <AiOutlineCheck />
                                <span>Aceitar</span>
                            </button>

                            <button className="flex flex-row items-center justify-center gap-5 w-36 h-12 rounded bg-red-500 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300">
                                <AiOutlineClose />
                                <span>Recusar</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
