import React from "react";
import { AiOutlinePaperClip } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { SideBar } from "../../../components/Sidebar";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

export const CreateProposal: React.FC = () => {
    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64 p-16 sm:p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-start sm:items-center py-6 sm:py-12">
                    <h1 className="font-montserrat font-medium text-lg sm:text-2xl">
                        Criar proposta
                    </h1>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-col gap-6">
                        <span className="font-montserrat font-medium text-sm sm:text-lg">
                            Preencha os campos abaixo:
                        </span>
                        <div className="flex flex-col gap-2">
                            <label
                                className="font-inter font-medium text-xs sm:text-sm text-indigo-700"
                                htmlFor="product"
                            >
                                Descrição sobre a proposta oferecida
                            </label>

                            <textarea
                                className="h-28 w-60 sm:w-[42.375rem] rounded p-4 text-xs sm:text-sm placeholder-black resize-none bg-gray-200 border-none"
                                placeholder="Escreva aqui a proposta oferecida"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-inter font-medium text-xs sm:text-sm text-indigo-700">
                                Adicionar anexos
                            </span>
                            <button className="w-44 sm:w-48 h-10 px-2 flex flex-row items-center gap-3 bg-blue-600 rounded font-montserrat font-medium text-xs sm:text-sm text-white hover:brightness-90 duration-300 transition-opacity">
                                <AiOutlinePaperClip size={24} />
                                Adicionar arquivos
                            </button>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-10">
                            <div className="flex flex-col gap-2">
                                <span className="font-inter font-medium text-xs sm:text-sm text-indigo-700">
                                    Data de entrega do serviço
                                </span>
                                <input
                                    type="date"
                                    name="date"
                                    className="w-60 sm:w-64 h-10 px-4 bg-gray-200 rounded border-none text-xs sm:text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-12 sm:gap-2">
                                <span className="font-inter font-medium text-xs sm:text-sm text-indigo-700">
                                    Valor total do serviço
                                </span>
                                <input
                                    type="text"
                                    name="value"
                                    className="w-60 sm:w-64 h-10 px-4 bg-gray-200 rounded border-none text-xs sm:text-sm"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <span className="font-inter font-medium text-xs sm:text-sm text-indigo-700">
                                    Parcelas
                                </span>
                                <input
                                    type="number"
                                    name="value"
                                    defaultValue="1"
                                    min="1"
                                    max="100"
                                    className="w-20 h-10 px-4 bg-gray-200 rounded border-none text-xs sm:text-sm"
                                />
                            </div>
                        </div>

                        <div className="mt-4 flex flex-row items-start sm:items-center sm:px-72">
                            <button className="flex items-center justify-center mt-8 w-48 h-12 bg-blue-600 rounded hover:brightness-90 duration-300 transition-opacity">
                                <span className="font-medium text-gray-100">
                                    Salvar alterações
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
