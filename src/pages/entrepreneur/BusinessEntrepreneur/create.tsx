import { ChangeEvent, FormEvent, Fragment, useCallback, useRef, useState } from "react";
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
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TextArea } from "../../../components/Form/TextArea";

interface IScheduleItem {
    weekday: string;
    opening_time: string;
    closing_time: string;
    lunch_time: string;
}
interface CreateBusinessEntrepreneurFormData {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    services: string[];
    physical_localization: boolean;
    telephone: string;
    whatsapp: string;
    email: string;
    website: string;
    schedules: IScheduleItem[],
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;

}

export const BusinessCreate: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();

    const [hasPhysicalLocation, setHasPhysicalLocation] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [scheduleItems, setScheduleItems] = useState([
        {
            weekday: '',
            opening_time: '',
            closing_time: '',
            lunch_time: '00:00',
        }
    ]);

    function setPhysicalLocation() {
        setHasPhysicalLocation(!hasPhysicalLocation);
    }

    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {
                weekday: '',
                opening_time: '',
                closing_time: '',
                lunch_time: '',
            }
        ])

        console.log(scheduleItems);
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

    const handleSubmit = useCallback(
        async (data: CreateBusinessEntrepreneurFormData) => {
            try {
                formRef.current?.setErrors({});

                console.log(data);

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    cnpj: Yup.string().min(11, 'O campo deve possuir 11 caracteres').required('CNPJ obrigatório'),
                    category: Yup.string().required('Categoria obrigatório'),
                    telephone: Yup.string().min(11, 'O campo deve possuir 11 caracteres').required('Telefone obrigatório'),
                    whatsapp: Yup.string().min(11, 'O campo deve possuir 11 caracteres').required('Whatsapp obrigatório'),
                    email: Yup.string().email("Formato de e-mail inválido").required('Email obrigatório'),
                    website: Yup.string().required('O campo website é obrigatório'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/companies', {
                    name: data.name,
                    cnpj: data.cnpj,
                    category: data.category,
                    description: data.description,
                    services: [data.services],
                    physical_localization: hasPhysicalLocation,
                    telephone: data.telephone,
                    whatsapp: data.whatsapp,
                    email: data.email,
                    website: data.website,
                    address: {
                        cep: data.cep,
                        street: data.street,
                        district: data.district,
                        number: data.number,
                        state: data.state,
                        city: data.city
                    }
                });

                navigate('/admin/business');

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
            <div className="flex flex-col w-full items-center px-24 md:ml-64 mt-6 md:mt-16">
                <div className="flex flex-col md:w-full">
                    <span className="font-bold text-xl md:text-2xl mb-8 mb:mb-12">Cadatrar empresa</span>
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="w-full md:max-w-4xl">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="name"
                                    label="Nome da empresa"
                                    placeholder="Nome da empresa"

                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <Input
                                    name="cnpj"
                                    label="CNPJ"
                                    placeholder="XX. XXX. XXX/0001-XX"
                                />
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Select
                                    name="category"
                                    label="Categoria"
                                    options={[
                                        { value: 'agricultura', label: 'Agricultura' },
                                        { value: 'Design', label: 'Design' },
                                        { value: 'engenharia', label: 'Engenharia' },
                                        { value: 'informática', label: 'Informática' },
                                    ]}
                                    placeholder="Selecione uma opção"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="services"
                                    label="Serviços"
                                    placeholder="Serviços oferecidos"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <TextArea
                                    name="description"
                                    label="Descrição"
                                    placeholder="Descrição da empresa"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="telephone"
                                    label="Telefone"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="whatsapp"
                                    label="Whatsapp"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="email"
                                    label="E-mail"
                                    placeholder="example@example.com"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="website"
                                    label="Website"
                                    placeholder="https://www.website.com"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
                            <div className="mb-6 md:mb-0">
                                <span className="w-full mb-6 md:mb-0 uppercase font-semibold text-sm text-gray-700">
                                    Horários de funcionamento
                                </span>
                            </div>
                            <div className=" mb-6 md:mb-0">
                                <button
                                    className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={addNewScheduleItem}
                                >
                                    Adicionar
                                </button>
                            </div>

                        </div>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (

                                <div key={index} className="flex flex-wrap -mx-3 md:mb-4">
                                    <div className="w-full md:w-1/4 px-3 mb-3 md:mb-0">
                                        <Select
                                            name="weekday"
                                            label="Dia da semana"
                                            value={scheduleItem.weekday}
                                            onChange={(e) => { setScheduleItemValue(index, 'weekday', e.target.value) }}
                                            options={[
                                                { value: 'Domingo', label: 'Domingo' },
                                                { value: 'Segunda-feira', label: 'Segunda-feira' },
                                                { value: 'Terça-feira', label: 'Terça-feira' },
                                                { value: 'Quarta-feira', label: 'Quarta-feira' },
                                                { value: 'Quinta-feira', label: 'Quinta-feira' },
                                                { value: 'Sexta-feira', label: 'Sexta-feira' },
                                                { value: 'Sábado', label: 'Sábado' },
                                            ]}
                                            placeholder="Selecione uma opção"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="opening_time"
                                            type="time"
                                            label="Abre às"
                                            placeholder="XX:XX"
                                            value={scheduleItem.opening_time}
                                            onChange={(e) => { setScheduleItemValue(index, 'opening_time', e.target.value) }}

                                        />
                                    </div>
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="closing_time"
                                            type="time"
                                            label="Fecha às"
                                            placeholder="XX:XX"
                                            value={scheduleItem.closing_time}
                                            onChange={(e) => { setScheduleItemValue(index, 'closing_time', e.target.value) }}
                                        />
                                    </div>
                                </div>
                            )
                        })}


                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full items-center md:w-1/4 px-3 mb-6 md:mb-0">
                                <input
                                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    onChange={setPhysicalLocation}
                                />
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="physical_localization">
                                    Possui localização física
                                </label>
                            </div>
                        </div>

                        {hasPhysicalLocation && (
                            <Fragment>
                                <div className="flex flex-wrap -mx-3 md:mb-6">
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="street"
                                            label="Endereço"
                                            placeholder="Rua XXX"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="district"
                                            label="Bairro"
                                            placeholder="Bairro XXX"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="number"
                                            label="Número"
                                            placeholder="00"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 md:mb-6">
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="cep"
                                            label="CEP"
                                            placeholder="XXXXX-XXX"
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <div className="relative">
                                            <Select
                                                name="state"
                                                label="Estado"
                                                value={selectedState}
                                                onChange={(e) => setSelectedState(e.target.value)}
                                                options={[
                                                    { value: 'AL', label: 'Acre' },
                                                    { value: 'AP', label: 'Alagoas' },
                                                    { value: 'AM', label: 'Amapá' },
                                                    { value: 'BA', label: 'Amazonas' },
                                                    { value: 'CE', label: 'Bahia' },
                                                    { value: 'DF', label: 'Ceará' },
                                                    { value: 'ES', label: 'Distrito Federal' },
                                                    { value: 'GO', label: 'Espírito Santo' },
                                                    { value: 'MA', label: 'Goiás' },
                                                    { value: 'MT', label: 'Maranhão' },
                                                    { value: 'MS', label: 'Mato Grosso' },
                                                    { value: 'MG', label: 'Mato Grosso do Sul' },
                                                    { value: 'PA', label: 'Minas Gerais' },
                                                    { value: 'PB', label: 'Pará' },
                                                    { value: 'PR', label: 'Paraíba' },
                                                    { value: 'PE', label: 'Paraná' },
                                                    { value: 'PI', label: 'Pernambuco' },
                                                    { value: 'RJ', label: 'Piauí' },
                                                    { value: 'RN', label: 'Rio de Janeiro' },
                                                    { value: 'RS', label: 'Rio Grande do Norte' },
                                                    { value: 'RO', label: 'Rio Grande do Sul' },
                                                    { value: 'RR', label: 'Rondônia' },
                                                    { value: 'SC', label: 'Roraima' },
                                                    { value: 'SP', label: 'Santa Catarina' },
                                                    { value: 'SE', label: 'São Paulo' },
                                                    { value: 'TO', label: 'Sergipe' },
                                                    { value: '  ', label: 'Tocantins' },

                                                ]}
                                                placeholder="Selecione uma opção"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="city"
                                            label="Cidade"
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        )}

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mt-1"
                                    htmlFor="images">
                                    Adicionar imagens
                                </label>

                                <div className="flex flex-row gap-6 py-3">
                                    <div className="flex w-16 h-16 rounded border border-1 border-gray-400">
                                        {previewImages.map(image => {
                                            return (
                                                <img key={image} src={image} alt="" />
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
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <button type="submit" className="bg-sky-500 text-white active:bg-sky-600 font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div >
        </div >
    );
};
