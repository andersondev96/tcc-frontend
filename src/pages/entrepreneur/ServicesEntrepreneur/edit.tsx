import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TextArea } from "../../../components/Form/TextArea";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidateErrors";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface Service {
    id: string;
    name: string;
    description: string;
    category: string;
    price: number;
    image_url: string;
    highlight_service: boolean;
}

interface Company {
    id: string;
    name: string;
    category_id: string;
}

export const EditServicesEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<Company>({} as Company);
    const [subcategories, setSubcategories] = useState([]);
    const params = useParams();
    const [service, setService] = useState({} as Service);
    const [highlight, setHighlight] = useState<boolean>(false);
    const [selectImagePreview, setSelectImagePreview] = useState("");
    const [imageService, setImageService] = useState(new FormData());

    const formRef = useRef<FormHandles>(null);

    const navigate = useNavigate();

    useEffect(() => {
        api.get('/companies/me')
            .then(response => setCompany(response.data))

        api.get(`/categories/list-subcategories/${company.category_id}`).then(response => {
            setSubcategories(response.data);
        });

        api.get<Service>(`/services/${params.id}`).then((response) => {
            setService(response.data);
        })
    }, [params.id, company.category_id]);

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
                    highlight_service: highlight,
                };

                await api.put(`/services/${params.id}`, service);

                if (imageService) {
                    await api.put(`services/service/${params.id}`, imageService);
                }

                navigate('/admin/services');

                toast.success("Serviço atualizado com sucesso!")

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Erro ao cadastrar o serviço")
            }
        }, [params.id, highlight, imageService, navigate, toast]);

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
                                    value={service.category}
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
                                            selectImagePreview ?
                                                (
                                                    <img src={selectImagePreview} className="w-60 h-40 object-cover rounded-lg border-2 border-gray-400" />
                                                ) : !selectImagePreview && service.image_url ? (
                                                    <img src={service.image_url} className="w-60 h-40 object-cover rounded-lg border-2 border-gray-400" />
                                                ) : (
                                                    <AiOutlineCamera size={24} />
                                                )
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
