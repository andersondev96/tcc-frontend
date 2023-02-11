import { AiOutlineCamera } from "react-icons/ai";
import { SideBar } from "../../../components/Sidebar";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";
import { Input } from "../../../components/Form/Input";
import { useCallback, useEffect, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { TextArea } from "../../../components/Form/TextArea";
import { Select } from "../../../components/Form/Select";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";
import * as Yup from "yup";

interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url: string;
    highlight_service: boolean;
}

export const EditServicesEntrepreneur: React.FC = () => {
    const params = useParams();
    const [service, setService] = useState({} as Service);
    const [highlight, setHighlight] = useState<boolean>(false);

    const formRef = useRef<FormHandles>(null);

    const navigate = useNavigate();

    useEffect(() => {
        api.get<Service>(`/services/${params.id}`).then((response) => {
            setService(response.data);
        })
    }, [params.id]);

    function handleSetHighlight() {
        setHighlight(!highlight);
    }

    const handleSubmit = useCallback(
        async (data: Service) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    name: Yup.string().required("Campo obrigatório"),
                    description: Yup.string().required("Campo obrigatório"),
                    price: Yup.number().typeError("Campo deve possuir um valor número").required("Campo obrigatório"),
                    category: Yup.string().required("Campo obrigatório")
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const service = {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image_url: data.image_url,
                    highlight_service: highlight,
                };

                const response = await api.put(`/services/${params.id}`, service);

                navigate('/admin/services');

            } catch (error) {

            }
        }, []);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="servicos" />
            <div className="flex flex-col w-full sm:ml-64 p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-medium text-lg sm:text-2xl">
                        Adicionar serviços e produtos
                    </h1>
                </div>
                <div className="flex flex-col gap-6 ml-16 p-8">
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="w-full md:max-w-4xl"
                        initialData={service}
                    >
                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <Input
                                    name="name"
                                    label="Nome do produto ou serviço"
                                    placeholder="Digite o nome do produto ou serviço"
                                />
                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <TextArea
                                    name="description"
                                    label="Descrição do produto ou serviço"
                                    placeholder="Adicione detalhes sobre o seu produto ou serviço"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Select
                                    name="category"
                                    label="Categoria do produto/serviço"
                                    options={[
                                        { value: "alimentação", label: "Alimentação" },
                                        { value: "beleza e higiene pessoal", label: "Beleza e higiene pessoal" },
                                        { value: "bem estar e saúde", label: "Bem estar e saúde" },
                                        { value: "diversão e lazer", label: "Diversão e lazer" },

                                    ]}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="price"
                                    label="Preço do produto/serviço"
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="product"
                                >
                                    Adicionar imagem
                                </label>
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col justify-center items-center w-64 h-44 bg-gray-200 rounded-lg border-2 border-gray-400 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
                                >
                                    <div className="flex flex-col justify-center items-center ">
                                        <AiOutlineCamera size={24} />
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>

                        </div>
                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input
                                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox" defaultChecked={service.highlight_service}
                                    onChange={handleSetHighlight}
                                />
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="physical_localization">
                                    Colocar produto/serviço em destaque
                                </label>
                            </div>

                        </div>

                        <div className="flex flex-row items-center justify-center">
                            <button className="flex items-center justify-center mt-8 w-48 h-12 bg-blue-600 rounded hover:brightness-90 duration-300 transition-opacity">
                                <span className="font-medium text-gray-100">
                                    Salvar alterações
                                </span>
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};
