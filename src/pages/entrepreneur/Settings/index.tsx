import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";

interface EntrepreneurSettingsData {
    id: string;
    entrepreneur_id: string;
    service_name_color: string;
    service_price_color: string;
    card_color: string;
    highlight_services_quantity: number;
    online_budget: boolean;
    online_chat: boolean;
    email_notification: boolean;
}

export const Settings: React.FC = () => {
    const [entrepreneurSettings, setEntrepreneurSettings] = useState<EntrepreneurSettingsData>({} as EntrepreneurSettingsData);
    const [colorNameService, setColorNameService] = useState("");
    const [colorPriceService, setColorPriceService] = useState("");
    const [cardColor, setCardColor] = useState("");
    const [quantityServices, setQuantityServices] = useState(0);
    const [budgetActive, setBudgetActive] = useState(false);
    const [onlineChatActive, setOnlineChatActive] = useState(false);
    const [emailNotification, setEmailNotification] = useState(false);

    useEffect(() => {
        api.get(`/entrepreneurs`).then((response) => {
            setEntrepreneurSettings(response.data);
        })
    }, []);


    const handleSubmit = useCallback(async (event: FormEvent) => {
        event.preventDefault();

        const data = {
            service_name_color: colorNameService,
            service_price_color: colorPriceService,
            card_color: cardColor,
            highlight_services_quantity: quantityServices,
            online_budget: budgetActive,
            online_chat: onlineChatActive,
            email_notification: emailNotification
        }

        const settings = await api.put(`/entrepreneurs/${entrepreneurSettings.entrepreneur_id}/settings`, data);

        console.log(settings);

        if (settings.status === 201) {
            toast.success("Preferências alteradas com sucesso!");
        } else {
            toast.error("Erro ao alterar as preferências!");
        }


    }, [
        colorNameService,
        colorPriceService,
        cardColor,
        quantityServices,
        budgetActive,
        onlineChatActive,
        emailNotification,
        entrepreneurSettings.entrepreneur_id,
        toast
    ]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="configuracoes" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col py-7 sm:py-12 items-center">
                    <h1 className=" font-medium text-center text-2xl">
                        Configurações
                    </h1>
                </div>
                <form onSubmit={handleSubmit}>
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
                                        value={entrepreneurSettings.service_name_color}
                                        name="colorNameService"
                                        onChange={e => setColorNameService(e.target.value)}
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
                                        value={entrepreneurSettings.service_price_color}
                                        name="colorPriceService"
                                        onChange={e => setColorPriceService(e.target.value)}
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
                                        value={entrepreneurSettings.card_color}
                                        name="cardColor"
                                        onChange={e => setCardColor(e.target.value)}
                                        className="appearance-none w-20 h-8 border-none rounded bg-transparent cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-9">
                            <span className=" font-regular text-sm">
                                Pré-visualização:
                            </span>
                            <div className={`"flex flex-col justify-center px-16  w-56 h-16 bg-[${entrepreneurSettings.card_color}] rounded"`}>
                                <span className={`font-semibold text-sm text-[${entrepreneurSettings.service_name_color}]`}>
                                    Serviço
                                </span>
                                <AssessmentsStars stars={5} />
                                <strong className={`font-inter font-semibold text-xs text-[${entrepreneurSettings.service_price_color}]`}>
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
                                min={1}
                                max={5}
                                defaultValue={entrepreneurSettings.highlight_services_quantity}
                                onChange={e => setQuantityServices(Number(e.target.value))}
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
                                    defaultChecked={entrepreneurSettings.online_budget}
                                    onChange={() => setBudgetActive(!emailNotification)}
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
                                    defaultChecked={entrepreneurSettings.online_chat}
                                    id="chat"
                                    onChange={() => setOnlineChatActive(!onlineChatActive)}
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
                                    defaultChecked={entrepreneurSettings.email_notification}
                                    id="email"
                                    onChange={() => setEmailNotification(!emailNotification)}
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
                </form>

            </div>
        </div>
    );
};
