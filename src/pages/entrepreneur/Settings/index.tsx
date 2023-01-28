import { SideBar } from "../../../components/Sidebar";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";

export const Settings: React.FC = () => {
    return (
        <div className="flex flex-row">
            <SideBar />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col py-7 sm:py-12 items-center">
                    <h1 className=" font-medium text-center text-2xl">
                        Configurações
                    </h1>
                </div>
                <div className="flex flex-col px-24 sm:px-12">
                    <div>
                        <span className=" font-semibold text-lg">
                            Card do serviço
                        </span>
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-9 mt-6">
                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor="NameServiceColor"
                                    className=" font-semibold text-sm text-blue-600"
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
                                    className=" font-semibold text-sm text-blue-600 "
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
                                    className=" font-semibold text-sm text-blue-600 "
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
                        <span className=" font-regular text-sm">
                            Pré-visualização:
                        </span>
                        <div className="flex flex-col justify-center px-16  w-56 h-16 bg-yellow-100 rounded">
                            <span className=" font-semibold text-sm text-pink-800">
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
                            className="font-semibold text-sm text-blue-600 "
                        >
                            Quantidade de serviços em destaque
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="5"
                            defaultValue="3"
                            className="w-16 h-10 p-2 rounded bg-gray-200 border-none font-medium text-sm text-gray-800"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-6 sm:mt-9">
                        <span className=" font-semibold text-lg text-blue-600">
                            Preferências
                        </span>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                id="budget"
                                className="rounded border-2 border-gray-900"
                            />
                            <label
                                htmlFor="budget"
                                className="text-sm"
                            >
                                Ativar serviço de orçamento online
                            </label>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                id="chat"
                                className="rounded border-2 border-gray-900"
                            />
                            <label
                                htmlFor="chat"
                                className="text-sm"
                            >
                                Ativar chat online
                            </label>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <input
                                type="checkbox"
                                id="email"
                                className="rounded border-2 border-gray-900"
                            />
                            <label
                                htmlFor="email"
                                className="text-sm"
                            >
                                Permitir notificações por e-mail
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <button className="flex items-center justify-center mt-8 sm:mt-12 w-48 h-12 bg-blue-600 rounded hover:brightness-90 duration-300 transition-opacity">
                            <span className="font-medium text-gray-100">
                                Salvar alterações
                            </span>
                        </button>
                        <span className="flex flex-row sm:justify-end justify-start py-4">
                            <a href="" className="font-semibold text-sm text-red-500">
                                Excluir conta
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
