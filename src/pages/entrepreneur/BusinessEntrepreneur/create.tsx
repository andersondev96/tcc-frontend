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
            <div className="flex flex-col w-full sm:ml-64">
                <div className="fixed w-full z-40 flex flex-row items-center gap-12 mobile:gap-6 px-[6.25rem] py-8 bg-gray-200 border-b-2 border-gray-500">
                    <div className="flex">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col justify-center items-center w-16 h-24 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="flex flex-col justify center items-center ">
                                <AiOutlineCamera size={24} />
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    <span className="font-inter font-bold text-2xl text-gray-800 mobile:text-lg">
                        Cadastrar empresa
                    </span>
                </div>
                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="flex flex-col w-[64rem] pt-52 pb-12 px-8 gap-6"
                >
                    <div className="flex flex-col gap-4 mobile:flex-col mobile:gap-4">
                        <div className="flex flex-row w-full gap-4 mobile:w-72">
                            <Input
                                name="name"
                                label="Nome da empresa"
                                placeholder="Nome da empresa"
                                type="text"
                            />

                            <Input
                                name="cnpj"
                                label="CNPJ"
                                placeholder="Informe o CNPJ"
                                type="text"
                            />

                            <Select name="category" label="Categoria">
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="Agricultura">Agricultura</option>
                                <option value="Design">Design</option>
                                <option value="Engenharia">Engenharia</option>
                                <option value="Informática">Informática</option>
                            </Select>
                        </div>
                        <div className="flex flex-row w-full gap-4 mobile:w-72">
                            <Input
                                name="services"
                                label="Serviços oferecidos"
                                placeholder="Cite os principais serviços"
                            />

                            <div className="flex flex-col">
                                <label
                                    htmlFor="description"
                                    className="font-montserrat font-semibold text-sm text-indigo-200"
                                >
                                    Descrição
                                </label>
                                <textarea
                                    className="rounded resize-none w-80 mobile:w-72"
                                    name="description"
                                    id="description"
                                    onChange={(e) => setDescription(e.target.value)}

                                />
                            </div>

                            <Input
                                name="telephone"
                                label="Telefone"
                                placeholder="Informe o telefone"
                            />
                        </div>

                        <div className="flex flex-row w-full gap-4 mobile:w-72">
                            <Input
                                name="whatsapp"
                                label="Whatsapp"
                                placeholder="Informe o whatsapp"
                            />
                            <Input
                                name="email"
                                label="E-mail"
                                placeholder="Informe o e-mail"
                            />
                            <Input
                                name="website"
                                label="Website"
                                placeholder="Informe o website"
                            />
                        </div>
                        <div className="flex flex-row w-full gap-4 mobile:w-72">
                            <div className="flex flex-col w-full">
                                <label
                                    htmlFor="category"
                                    className="font-montserrat font-semibold text-sm text-indigo-200"
                                >
                                    Horários de funcionamento
                                </label>

                                {scheduleItems.map((scheduleItem, index) => {
                                    return (
                                        <div key={scheduleItem.day_of_week} className="flex flex-row items-center mt-4 w-full gap-16">
                                            <div className="flex flex-row w-1/2  mobile:flex-col mobile:gap-2">
                                                <select
                                                    name="day_of_week"
                                                    value={scheduleItem.day_of_week}
                                                    onChange={e => setScheduleItemValue(index, 'day_of_week', e.target.value)}
                                                    className="h-12 w-full rounded mobile:w-72"
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
                                            </div>

                                            <div className="flex flex-row w-1/2 gap-4 items-center mobile:w-72">

                                                <div className="relative">
                                                    <input
                                                        type="time"
                                                        id="opening_time"
                                                        className="block h-12 w-28 rounded px-2.5 pb-2.5 pt-4 text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                                        placeholder=" "
                                                        name="opening_time"
                                                        onChange={e => setScheduleItemValue(index, 'opening_time', e.target.value)}
                                                    />
                                                    <label htmlFor="opening_time" className="absolute font-montserrat font-medium text-sm text-cyan-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                                        Aberto de
                                                    </label>
                                                </div>

                                                <div className="relative">
                                                    <input
                                                        type="time"
                                                        id="closing_time"
                                                        className="block h-12 w-28 rounded px-2.5 pb-2.5 pt-4 text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                                        placeholder=" "
                                                        name="closing_time"
                                                        onChange={e => setScheduleItemValue(index, 'closing_time', e.target.value)}
                                                    />
                                                    <label htmlFor="closing_time" className="absolute font-montserrat font-medium text-sm text-cyan-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                                        Até às
                                                    </label>
                                                </div>

                                                <div className="relative">
                                                    <input
                                                        type="time"
                                                        id="lunch_time"
                                                        className="block h-12 w-28 rounded px-2.5 pb-2.5 pt-4 text-sm bg-transparent appearance-none focus:outline-none focus:ring-0 peer"
                                                        placeholder=" "
                                                        name="lunch_time"
                                                        onChange={e => setScheduleItemValue(index, 'lunch_time', e.target.value)}
                                                    />
                                                    <label htmlFor="lunch_time" className="absolute font-montserrat font-medium text-sm text-cyan-600 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
                                                        Almoço
                                                    </label>
                                                </div>
                                                <IoMdAddCircle size={32} color="#8E82CA" onClick={addNewScheduleItem} />

                                            </div>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                        <div className="flex flex-row w-full gap-4 mobile:w-72">
                            <input type="checkbox" name="hasLocation" onChange={setPhysicalLocation} />
                            <label
                                htmlFor="hasLocation"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Possui localização física
                            </label>
                        </div>
                        {
                            hasPhysicalLocation ? (
                                <div>
                                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                                        <Input
                                            name="street"
                                            label="Endereço"
                                            placeholder="Informe o endereço"
                                        />

                                        <Input
                                            name="district"
                                            label="Bairro"
                                            placeholder="Informe o bairro"
                                        />

                                        <Input
                                            name="number"
                                            label="Número"
                                            placeholder="Informe o número"
                                        />

                                    </div>
                                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                                        <Input
                                            name="cep"
                                            label="CEP"
                                            placeholder="Informe o cep"
                                        />

                                        <Input
                                            name="state"
                                            label="Estado"
                                            placeholder="Informe o estado"
                                        />

                                        <Input
                                            name="city"
                                            label="Cidade"
                                            placeholder="Informe a ciddade"
                                        />

                                    </div>
                                </div>
                            ) : ''
                        }

                        <div className="flex flex-col gap-4">
                            <div className="mt-8 flex flex-row border-b border-gray-400 pb-2">
                                <span className="font-inter text-xl">Adicionar imagens</span>
                            </div>

                            <div className="flex flex-row gap-6">
                                <div className="flex w-16 h-16 rounded border border-1 border-gray-400">
                                    {previewImages.map(image => {
                                        return (
                                            <img key={image} src={image} alt={formData.name} />
                                        )
                                    })}
                                </div>

                                <div className="w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300 relative">
                                    <input type="file" multiple id="image[]" className="cursor-pointer relative block opacity-0 w-full h-full p-20 z-20" onChange={handleSelectedImages} />
                                    <div className="text-center absolute p-5 top-0 right-0 left-0 m-auto">
                                        <AiOutlineCamera size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 flex flex-row items-center justify-center">
                            <button className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-2xl text-white uppercase hover:brightness-90 transition-colors">
                                <FiSave />
                                Salvar
                            </button>
                        </div>

                    </div>
                </Form>
            </div>
        </div >
    );
};
