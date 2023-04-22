import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";

import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TextArea } from "../../../components/Form/TextArea";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidateErrors";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface ServiceData {
    name: string;
    description: string;
    price: number;
    category: string;
    image_url?: string;
    highlight_service?: string;
    company_id: string;
}

interface Company {
    id: string;
    name: string;
    category_id: string;
}

interface EntrepreneurSettingsData {
    highlight_services_quantity: number;
}

export const CreateServicesEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<Company>({} as Company);
    const [subcategories, setSubcategories] = useState([]);
    const [highlight, setHighlight] = useState<boolean>(false);
    const [selectImagePreview, setSelectImagePreview] = useState("");
    const formRef = useRef<FormHandles>(null);
    const [imageService, setImageService] = useState(new FormData());
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/companies/me')
            .then(response => setCompany(response.data))

        if (company.category_id) {
            api.get(`/categories/list-subcategories/${company.category_id}`).then(response => {
                setSubcategories(response.data);
            });
        }
    }, [company.category_id]);

    function handleSetHighlight() {
        setHighlight(!highlight);
    }

    const handleSelectedImage = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {

            if (e.target.files) {
                const selectedImage = e.target.files[0];
                imageService.append("service", selectedImage);

                const selectedImagePreview = URL.createObjectURL(selectedImage);

                setSelectImagePreview(selectedImagePreview);
            }
        }, []);

    const handleSubmit = useCallback(
        async (data: ServiceData) => {
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

                if (highlight) {
                    const limitHightLightServices = await api.get<EntrepreneurSettingsData>(`/entrepreneurs`).then(response => {
                        if (response.data) {
                            return response.data.highlight_services_quantity;
                        }
                    });

                    const quantHighlightServices = await api.get<ServiceData[]>(`/services/company/${company.id}`).then(response => {
                        if (response.data) {
                            return response.data.filter(service => service.highlight_service).length;
                        }
                    });

                    if (limitHightLightServices && quantHighlightServices && quantHighlightServices >= limitHightLightServices) {
                        setErrorMessage("Você não pode colocar mais serviços em destaque, ajuste o seu limite ou remova serviços em destaque.");
                        return;
                    }
                }

                const service = {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category,
                    image_url: data.image_url,
                    highlight_service: highlight,
                };

                const response = await api.post(`/services/${company.id}`, service);

                if (response.status === 201) {
                    if (!imageService.entries().next().done) {
                        await api.patch(`services/service/${response.data.id}`, imageService);
                    }

                    setErrorMessage("");
                    toast.success("Serviço adicionado com sucesso!")

                    navigate('/admin/services');
                }



            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Erro ao cadastrar o serviço")
            }
        }, [highlight, company, navigate, imageService]);

    return (
        <div className="flex flex-row">
            <ToastContainer />
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
                                    idTooltip="tooltip-description-service"
                                    tooltipText="Descreva as especificações de seu serviço, fornecendo detalhes para o cliente"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Select
                                    name="category"
                                    label="Categoria do produto/serviço"
                                    idTooltip="tooltip-category-service"
                                    tooltipText="Escolha a categoria que seu serviço se encaixa"
                                    options={subcategories.map(subcategory => ({
                                        value: subcategory, label: subcategory
                                    }))
                                    }
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
                                    htmlFor="service"
                                >
                                    Adicionar imagem
                                </label>
                                <label
                                    htmlFor="service"
                                    className="flex flex-col justify-center items-center mt-4 w-64 h-44 bg-gray-200 rounded-lg border-2 border-gray-400 cursor-pointer hover:opacity-80 duration-300 transition-opacity"
                                >
                                    <div className="flex flex-col justify-center items-center">
                                        {
                                            !selectImagePreview && (
                                                <AiOutlineCamera size={24} />
                                            )
                                        }
                                        {
                                            selectImagePreview &&
                                            <img src={selectImagePreview} className="w-60 h-40 object-cover rounded-lg border-2 border-gray-400" />

                                        }

                                    </div>
                                    <input id="service" name="image_url" type="file" accept="image/*" className="hidden" onChange={handleSelectedImage} />
                                </label>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <input
                                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    onChange={handleSetHighlight}
                                />
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="highlight_service">
                                    Colocar produto/serviço em destaque
                                </label>
                            </div>

                            {errorMessage && (
                                <span className="font-medium text-sm text-red-600 mt-2">{errorMessage}</span>
                            )}

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
