import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "react-toastify";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";

interface EntrepreneurSettingsData {
    id: string;
    entrepreneur_id: string;
    highlight_services_quantity: number;
    online_budget: boolean;
    online_chat: boolean;
    email_notification: boolean;
    company_logo: string;
}

export const Settings: React.FC = () => {
    const [entrepreneurSettings, setEntrepreneurSettings] = useState<EntrepreneurSettingsData>({} as EntrepreneurSettingsData);
    const [quantityServices, setQuantityServices] = useState(1);
    const [onlineBudget, setOnlineBudget] = useState(false);
    const [onlineChat, setOnlineChat] = useState(false);
    const [emailNotification, setEmailNotification] = useState(false);
    const [selectImagePreview, setSelectImagePreview] = useState("");
    const [logo, setLogo] = useState(new FormData());


    useEffect(() => {
        const fetchEntrepreneurSettings = async () => {
            try {
                api.get<EntrepreneurSettingsData>(`/entrepreneurs`).then((response) => {
                    if (response.data) {
                        setQuantityServices(response.data.highlight_services_quantity);
                        setOnlineBudget(response.data.online_budget);
                        setOnlineChat(response.data.online_chat);
                        setEmailNotification(response.data.email_notification);

                        setEntrepreneurSettings(response.data);
                    }
                });
            } catch (error) {
                console.log(error);
            }
        }

        fetchEntrepreneurSettings();
    }, []);

    const handleInputNumber = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(event.target.value);
        setQuantityServices(inputValue);
    }, []);

    const handleCheckBox = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const { id } = event.target;
        if (id === "budget") {
            setOnlineBudget(!onlineBudget);
        } else if (id === "chat") {
            setOnlineChat(!onlineChat);
        } else {
            setEmailNotification(!emailNotification);
        }
    }, [onlineBudget, onlineChat, emailNotification]);

    const handleSelectedImage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {

            if (e.target.files) {
                const selectedImage = e.target.files[0];
                logo.append("company_logo", selectedImage);

                const selectedImagePreview = URL.createObjectURL(selectedImage);

                setSelectImagePreview(selectedImagePreview);
            }
        }, []);


    const handleSubmit = useCallback(async (event: FormEvent) => {
        try {
            event.preventDefault();

            const data = {
                highlight_services_quantity: quantityServices,
                online_budget: onlineBudget,
                online_chat: onlineChat,
                email_notification: emailNotification
            }

            const settings = await api.put(`/entrepreneurs/${entrepreneurSettings.entrepreneur_id}/settings`, data);

            if (settings.status === 201) {
                if (!logo.entries().next().done) {
                    await api.patch(`entrepreneurs/upload-logo/${settings.data.entrepreneur_id}`, logo);
                }
                toast.success("Preferências alteradas com sucesso!");
            }

        } catch (err) {
            toast.error("Erro ao alterar as preferências!");
        }

    }, [
        quantityServices,
        onlineBudget,
        onlineChat,
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
                            <span className="font-semibold text-lg text-blue-600">
                                Definir logo para a empresa
                            </span>
                            <div className="flex flex-wrap -mx-3 md:mb-6">
                                <div className="w-full px-3 mb-6 md:mb-0">
                                    <label
                                        htmlFor="company_logo"
                                        className="flex flex-col justify-center items-center mt-4 w-44 h-44 bg-gray-200 rounded-lg border-2 border-gray-400 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
                                    >
                                        <div className="flex flex-col justify-center items-center">

                                            {
                                                selectImagePreview ? (
                                                    <img src={selectImagePreview} className="w-40 h-40 p-4 object-cover rounded-lg border-2 border-gray-400" />
                                                ) : !selectImagePreview && entrepreneurSettings.company_logo ? (
                                                    <img src={`http://localhost:3333/company_logo/${entrepreneurSettings.company_logo}`} className="w-40 h-40 p-4 object-cover rounded-lg border-2 border-gray-400" />
                                                ) : <AiOutlineCamera size={24} />

                                            }

                                        </div>
                                        <input id="company_logo" name="company_logo" type="file" accept="image/*" className="hidden" onChange={handleSelectedImage} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mt-6">
                            <span className="font-semibold text-lg text-blue-600">
                                Preferências
                            </span>
                            <div className="flex flex-col gap-2 mt-4">
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
                                    value={quantityServices}
                                    onChange={handleInputNumber}
                                    className="w-16 h-10 p-2 rounded bg-gray-200 border-none font-medium text-sm text-gray-800"
                                />
                            </div>

                            <div className="flex flex-row items-center mt-4 gap-2">
                                <input
                                    type="checkbox"
                                    id="budget"
                                    defaultChecked={entrepreneurSettings.online_budget}
                                    checked={onlineBudget}
                                    onChange={handleCheckBox}
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
                                    defaultChecked={entrepreneurSettings.online_chat}
                                    checked={onlineChat}
                                    onChange={handleCheckBox}
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
                                    defaultChecked={entrepreneurSettings.email_notification}
                                    checked={emailNotification}
                                    onChange={handleCheckBox}
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
