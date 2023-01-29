import React from "react";
import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";
import { Link } from "react-router-dom";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

export const DetailsBudgetEntrepreneur: React.FC = () => {
    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64 p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-medium text-lg sm:text-2xl ">
                        Orçamentos
                    </h1>
                </div>
                <div className="flex flex-col gap-6 ml-16">
                    <div className="flex flex-col gap-2 items-start">
                        <span className="font-semibold mb-4 text-base sm:text-lg">
                            Informações do cliente
                        </span>
                        <div className="flex flex-row gap-6">
                            <span className="font-semibold text-sm">
                                Nome:
                            </span>
                            <p className="font-light text-sm ml-6">
                                João Pedro Xavier
                            </p>
                        </div>
                        <div className="flex flex-row gap-6">
                            <span className="font-semibold text-sm">
                                E-mail:
                            </span>
                            <p className="font-light ml-6 text-sm">
                                joaoxavier@gmail.com
                            </p>
                        </div>
                        <div className="flex flex-row gap-6">
                            <span className="font-semibold text-sm">
                                Telefone:
                            </span>
                            <p className="font-light text-sm ml-1">
                                (99) 99999-9999
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold text-lg">
                            Sobre a proposta
                        </span>
                        <div className="w-60 sm:w-108 overflow-x-auto relative shadow-md sm:rounded mt-4">
                            <table className="w-full">
                                <thead className="font-semibold text-sm text-center bg-gray-300">
                                    <tr>
                                        <th className="py-2 px-6"></th>
                                        <th className="py-2 px-4 sm:px-6">Produto/Serviço</th>
                                        <th className="py-2 px-4 sm:px-6">Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody className="font-light text-xs sm:text-sm text-center">
                                    <tr>
                                        <td className="py-2 px-6">
                                            <img
                                                src={Coffee}
                                                alt=""
                                                className="h-8 sm:h-16 w-8 sm:w-16 rounded"
                                            />
                                        </td>
                                        <td className="py-2 px-4 sm:px-6">
                                            Cappuccino cremoso
                                        </td>
                                        <td className="py-2 px-4 sm:px-6">100</td>
                                    </tr>

                                    <tr className="font-light text-sm">
                                        <td className="py-2 px-6">
                                            <img src={Coffee} alt="" className="h-16 w-16 rounded" />
                                        </td>
                                        <td className="py-2 px-6">Cappuccino cremoso</td>
                                        <td className="py-2 px-6">100</td>
                                    </tr>

                                    <tr className="font-light text-sm">
                                        <td className="py-2 px-6">
                                            <img src={Coffee} alt="" className="h-16 w-16 rounded" />
                                        </td>
                                        <td className="py-2 px-6">Cappuccino cremoso</td>
                                        <td className="py-2 px-6">100</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-[45.25rem]">
                        <span className="font-semibold sm:text-lg">
                            Objetivo do serviço
                        </span>
                        <p className="font-light text-sm mobile:text-xs">
                            Cappuccino para festa
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 w-[45.25rem]">
                        <span className="font-semibold sm:text-lg">
                            Prazo esperado
                        </span>
                        <p className="font-light text-xs sm:text-sm">
                            11/04/2022
                        </p>
                    </div>

                    <div className="flex flex-col gap-2 w-60 sm:w-[45.25rem] ">
                        <span className="font-semibold sm:text-lg">
                            Observações
                        </span>
                        <p className="font-light text-xs sm:text-sm text-justify">
                            Olá gostaria de fazer uma proposta de orçamento para o
                            fornecimento dos produtos acima, tenho uma festa para dar e
                            gostaria de negociar um valor amigvel para os cappuccinos e
                            frappuccinos.
                        </p>
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-12">
                        <Link to="/admin/budget/create-proposal">
                            <button className="flex flex-row items-center justify-center gap-5 w-32 sm:w-40 h-8 sm:h-12 rounded bg-blue-600 font-semibold text-white text-sm hover:brightness-90  transition-opacity duration-300">
                                <span>Criar proposta</span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
