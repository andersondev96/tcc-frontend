import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { SideBar } from "../../../components/Sidebar";
import { AiOutlineCamera } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";
import getValidationErrors from "../../../utils/getValidateErrors";
import { Input } from "../../../components/Input";
import { Select } from "../../../components/Select";

interface CreateBusinessEntrepreneurFormData {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    services: string[];
    schedules: [
        {
            day_of_week: string;
            opening_time: string;
            closing_time: string;
            lunch_time: string;
        }
    ],
    physical_localization: boolean;
    telephone: string;
    whatsapp: string;
    email: string;
    website: string;
    address: {
        cep: string;
        street: string;
        district: string;
        number: number;
        state: string;
        city: string;
    }
}

export const BusinessCreate: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();

    const [hasPhysicalLocation, setHasPhysicalLocation] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [scheduleItems, setScheduleItems] = useState([
        {
            day_of_week: "",
            opening_time: "",
            closing_time: "",
            lunch_time: "",
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        cnpj: '',
        category: '',
        services: [''],
        cep: '',
        street: '',
        district: '',
        number: 0,
        state: '',
        city: '',
        telephone: '',
        whatsapp: '',
        email: '',
        website: '',

    });

    function setPhysicalLocation() {
        setHasPhysicalLocation(!hasPhysicalLocation);
    }

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                day_of_week: "",
                opening_time: "",
                closing_time: "",
                lunch_time: "",
            }
        ])

        console.log(scheduleItems.length);
    }

    function removeScheduleItem() {
        console.log('Removing schedule item');
    }



    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return { ...scheduleItem, [field]: value };
            }

            return scheduleItem;
        });

        setScheduleItems(updateScheduleItems);

        console.log(scheduleItems.length >= (scheduleItems.length - 1));
    }

    function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
        console.log("Entra");
        if (!event.target.files) {
            return;
        }

        const selectedImages = Array.from(event.target.files);

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        console.log(selectedImagesPreview);

        setPreviewImages(selectedImagesPreview);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = useCallback(
        async (data: CreateBusinessEntrepreneurFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    cnpj: Yup.string().required('CNPJ obrigatório'),
                    category: Yup.string().required('Categoria obrigatório'),
                    description: Yup.string().required('Descrição obrigatória'),
                    services: Yup.string().required('Serviços obrigatório'),
                    day_of_week: Yup.string().required('Dia da semana obrigatório'),
                    opening_time: Yup.string().required('Horário de abertura obrigatório'),
                    closing_time: Yup.string().required('Horário de fechamento obrigatório'),
                    telephone: Yup.string().required('Telefone obrigatório'),
                    email: Yup.string().email("Formato de e-mail inválido").required('Email obrigatório'),
                    cep: Yup.string().required("CEP obrigatório"),
                    street: Yup.string().required("Rua obrigatória"),
                    district: Yup.string().required("Bairro obrigatório"),
                    number: Yup.number().required("Número obrigatório"),
                    state: Yup.string().required("Estado obrigatório"),
                    city: Yup.string().required("Cidade obrigatória"),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                console.log(data);

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);

                    return;
                }

                toast.error("Erro ao cadastrar empresa");
            }
        }, [toast]);

    return (
        <div className="flex flex-row">
            <ToastContainer />
            <SideBar />
            <div className="flex flex-col w-full items-center px-24 md:ml-64 md:mt-16">
                <div className="flex flex-col w-full">
                    <span className="font-bold text-2xl mb-12">Cadatrar empresa</span>
                    <form className="w-full max-w-4xl">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Nome da empresa
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Nome da empresa"
                                />
                                <p className="text-red-500 text-xs italic">Por favor informe o nome da empresa</p>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="grid-last-name"
                                >
                                    CNPJ
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="cnpj"
                                    type="text"
                                    placeholder="CNPJ" />
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="category"
                                >
                                    Categoria
                                </label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="category"
                                        name="category"
                                    >
                                        <option value="" disabled>Selecione uma opção</option>
                                        <option value="Agricultura">Agricultura</option>
                                        <option value="Design">Design</option>
                                        <option value="Engenharia">Engenharia</option>
                                        <option value="Informática">Informática</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="services">
                                    Serviços
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="services"
                                    type="text"
                                    placeholder="Serviços oferecidos"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="description">
                                    Descrição
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="appearance-none block w-full resize-none bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    placeholder="Escreva a descrição da empresa" />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="telephone">
                                    Telefone
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="telephone"
                                    name="telephone"
                                    type="text"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="whatsapp">
                                    Whatsapp
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="whatsapp"
                                    name="whatsapp"
                                    type="text"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="email">
                                    E-mail
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="mail@example.com"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="website">
                                    Website
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="website"
                                    name="website"
                                    type="text"
                                    placeholder="http://example.example"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between -mx-3 mb-6 border-b py-4 border-gray-400">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <span className="w-full px-3 mb-6 md:mb-0 uppercase font-semibold text-sm text-gray-700">
                                    Horários de funcionamento
                                </span>
                            </div>
                            <div className="w-full md:w-1/2 px-56 mb-6 md:mb-0">
                                <button className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                >
                                    Adicionar
                                </button>
                            </div>

                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="day_of_week"
                                >
                                    Dia da semana
                                </label>
                                <div className="relative">
                                    <select
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        id="day_of_week"
                                        name="day_of_week"
                                    >
                                        <option value="" disabled>Selecione uma opção</option>
                                        <option value="segunda">Segunda-feira</option>
                                        <option value="terça">Terça-feira</option>
                                        <option value="quarta">Quarta-feira</option>
                                        <option value="quinta">Quinta-feira</option>
                                        <option value="sexta">Sexta-feira</option>
                                        <option value="sábado">Sábado</option>
                                        <option value="domingp">Domingo</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="opening_time">
                                    Abre às
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="opening_time"
                                    name="opening_time"
                                    type="time"
                                />
                            </div>
                            <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="closing_time">
                                    Fecha às
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    id="closing_time"
                                    name="closing_time"
                                    type="time"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full items-center md:w-1/4 px-3 mb-6 md:mb-0">
                                <input className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer" type="checkbox" />
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="physical_localization">
                                    Possui localização física
                                </label>
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                    City
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                    State
                                </label>
                                <div className="relative">
                                    <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                                        <option>New Mexico</option>
                                        <option>Missouri</option>
                                        <option>Texas</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                    Zip
                                </label>
                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210" />
                            </div>
                        </div>
                    </form>
                </div>
            </div >
        </div >
    );
};
