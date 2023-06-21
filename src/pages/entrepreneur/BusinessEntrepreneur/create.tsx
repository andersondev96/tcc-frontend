import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { ChangeEvent, Fragment, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TagInput } from "../../../components/Form/TagInput";
import { TextArea } from "../../../components/Form/TextArea";
import { SideBar } from "../../../components/Sidebar";
import { Tooltip } from "../../../components/Tooltip";
import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidateErrors";

interface IScheduleItem {
    weekday: string;
    opening_time: string;
    closing_time: string;
    lunch_time: string;
}
interface CreateBusinessEntrepreneurFormData {
    name: string;
    cnpj?: string;
    category_id: string;
    description?: string;
    services: string[];
    physical_localization: boolean;
    telephone: string;
    whatsapp: string;
    email: string;
    website?: string;
    schedules?: IScheduleItem[],
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;
}

interface ICategories {
    id: string;
    name: string;
}

interface Address {
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

export const BusinessCreate: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const checkboxRef = useRef(null);

    const navigate = useNavigate();

    const [hasPhysicalLocation, setHasPhysicalLocation] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState('');
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [imagesCompany, setImagesCompany] = useState(new FormData());
    const [cep, setCEP] = useState('');
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [address, setAddress] = useState<Address>({});
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [scheduleItems, setScheduleItems] = useState([
        {
            weekday: 'Todos os dias',
            opening_time: '',
            closing_time: '',
            lunch_time: '-',
        }
    ]);

    const loadCategories = useCallback(async () => {
        api.get<ICategories[]>("/categories").then(response => setCategories(response.data));
    }, [setCategories]);

    useEffect(() => {
        if (cep.length === 9) {
            fetch(`https://viacep.com.br/ws/${cep}/json`)
                .then(response => response.json())
                .then(data => setAddress(data as Address))
                .catch(error => console.error(error))
        }

        loadCategories();
    }, [cep, loadCategories]);



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
                lunch_time: '-',
            }
        ])
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

    function removeScheduleItem(position: number) {
        const updatedScheduleItems = scheduleItems.filter((scheduleItem, index) => {
            return index !== position;
        });

        setScheduleItems(updatedScheduleItems);
    }

    const handleInputChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const handleInputKeyDownTag = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag(inputValue);
            setInputValue("");
        } else if (event.key === "Backspace" && inputValue === "") {
            removeTag(tags.length - 1);
        }
    }

    const addTag = (tag: string) => {
        const tagsValues = [...new Set(tag.split(",").map((t) => t.trim()))];
        console.log(tagsValues);
        const newTags = tagsValues.filter((t) => !tags.includes(t));

        if (tags.length + newTags.length > 5) {
            const trucatedTags = newTags.slice(0, 5 - tags.length);
            setTags([...tags, ...trucatedTags]);
        } else {
            setTags([...tags, ...newTags]);
        }
    }

    const removeTag = (index: number) => {
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    }

    const handleSelectedImages = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {

            if (e.target.files) {
                const selectedImages = Array.from(e.target.files);

                selectedImages.map(
                    image => imagesCompany.append("company", image)
                );

                const selectedPreviewImages = selectedImages.map(image => {
                    return URL.createObjectURL(image);
                });

                setPreviewImages(selectedPreviewImages);
            }
        }, [imagesCompany, setPreviewImages]);

    const cnpjValidation = useCallback((isRequired: boolean) => {
        if (isRequired) {
            return Yup.string()
                .required('CNPJ obrigatório')
                .length(18, 'Deve possuir 18 caracteres')
        } else {
            return Yup.string().nullable().notRequired();
        }
    }, []);

    const handleSubmit = useCallback(
        async (data: CreateBusinessEntrepreneurFormData) => {
            try {
                formRef.current?.setErrors({});
                setIsLoading(true);

                const hasCNPJ = Boolean(data.cnpj && data.cnpj.length > 0);

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    cnpj: cnpjValidation(hasCNPJ),
                    description: Yup.string().required('Descrição obrigatória'),
                    category_id: Yup.string().required('Categoria obrigatória'),
                    ...(tags.length === 0) ? {
                        services: Yup.string().required('Digite ao menos um serviço'),
                    } : {},
                    telephone: Yup.string()
                        .required('Telefone obrigatório')
                        .length(15, 'Deve possuir 15 caracteres'),
                    whatsapp: Yup
                        .string()
                        .length(15, 'Deve possuir 15 caracteres')
                        .nullable(true),
                    email: Yup.string().email("Formato de e-mail inválido").required('Email obrigatório'),
                    website: Yup.string().url("Digite um endereço válido").nullable(),
                    ...(hasPhysicalLocation) && {
                        cep: Yup.string().required(),
                        street: Yup.string().required("O campo é obrigatório"),
                        district: Yup.string().required("O campo é obrigatório"),
                        city: Yup.string().required("O campo é obrigatório"),
                        state: Yup.string().required("O campo é obrigatório"),

                        number: Yup.number()
                            .integer()
                            .positive()
                            .required()
                            .typeError("Digite apenas números")


                    }
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const companies = {
                    name: data.name,
                    cnpj: data.cnpj,
                    category_id: data.category_id,
                    services: tags,
                    description: data.description,
                    physical_localization: hasPhysicalLocation,
                    cep: data.cep,
                    street: data.street,
                    district: data.district,
                    number: data.number,
                    state: data.state,
                    city: data.city,
                    telephone: data.telephone,
                    whatsapp: data.whatsapp,
                    email: data.email,
                    website: data.website,
                    ...(scheduleItems.length > 0 && {
                        schedules: scheduleItems.filter(schedule => (
                            schedule.weekday !== "" &&
                            schedule.opening_time !== "" &&
                            schedule.closing_time !== "" &&
                            schedule.lunch_time !== ""
                        ))
                    })
                }

                console.log(scheduleItems);

                const response = await api.post('/companies', companies);

                console.log(response);

                if (imagesCompany) {
                    await api.post(`/companies/images/${response.data.id}`, imagesCompany);
                }

                toast.success("Empresa cadastrada com sucesso!");

                navigate('/admin/business');

            } catch (err) {
                console.log(err);
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    formRef.current?.setErrors(errors);
                    setIsLoading(false);

                    return;
                }

                toast.error("Erro ao cadastrar empresa");
            } finally {
                setIsLoading(false);
            }
        }, [toast, navigate, hasPhysicalLocation, scheduleItems, images, tags, setIsLoading]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <div className="flex flex-row">
            <SideBar pageActive="empresa" />
            <div className="flex flex-col w-full items-center px-24 md:ml-64 mt-6 md:mt-16">
                <div className="flex flex-col md:w-full">
                    <span className="font-bold text-xl md:text-2xl mb-8 mb:mb-12">Cadatrar MEI</span>
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="w-full md:max-w-4xl">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="name"
                                    label="Nome do MEI"
                                    placeholder="Digite o nome do MEI"

                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <Input
                                    name="cnpj"
                                    label="CNPJ"
                                    placeholder="XX. XXX. XXX/0001-XX"
                                    mask="cnpj"
                                    idTooltip="tooltip-cnpj"
                                    tooltipText="O CNPJ não é obrigatório e só será visível para o empreendedor"
                                />
                            </div>
                        </div>


                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">

                                <Select
                                    name="category_id"
                                    label="Categoria"
                                    idTooltip="tooltip-category"
                                    tooltipText="Selecione a categoria do seu MEI nesta lista. Esta categoria ajudará o cliente a identificar qual é a sua especialidade"
                                    options={categories.map(category => ({
                                        value: category.id, label: category.name
                                    }))}
                                    placeholder="Selecione uma opção"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <div className="flex flex-wrap rounded-lg">
                                    <TagInput
                                        name="services"
                                        label="Serviços"
                                        placeholder="Serviços oferecidos"
                                        value={inputValue}
                                        idTooltip="tooltip-tag"
                                        tooltipText="Digite os 5 serviços principais do seu negócio separados por vírula e tecle ENTER"
                                        inputChanges={handleInputChangeTag}
                                        inputKeydown={handleInputKeyDownTag}
                                    />
                                    {tags.map((tag, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-200 border border-blue-600 text-gray-700 rounded-full py-1 px-3 m-1"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                className="ml-2 text-sm font-medium text-gray-600 hover:text-gray-600"
                                                onClick={() => removeTag(index)}
                                            >
                                                x
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <TextArea
                                    name="description"
                                    label="Descrição"
                                    placeholder="Descrição da empresa"
                                    idTooltip="tooltip-description"
                                    tooltipText="Digite uma descrição sobre o seu MEI, fique a vontade para incluir todos os detalhes necessários"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="telephone"
                                    label="Telefone"
                                    mask="phone"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="whatsapp"
                                    label="Whatsapp"
                                    mask="phone"
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
                                <div key={index} className="flex flex-wrap -mx-3 md:mb-4 items-center">
                                    <div className="w-full md:w-1/4 px-3 mb-3 md:mb-0">
                                        <Select
                                            name="weekday"
                                            label="Dia da semana"
                                            value={scheduleItem.weekday}
                                            onChange={(e) => { setScheduleItemValue(index, 'weekday', e.target.value) }}
                                            options={[
                                                { value: "Todos os dias", label: "Todos os dias" },
                                                { value: "Segunta à Sexta", label: "Segunda à Sexta" },
                                                { value: "Fim de semana", label: "Fim de semana" },
                                                { value: "Feriados", label: "Feriados" },
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
                                    <div className="px-3 mb-6 md:mb-0 md:mt-2 flex justify-center">
                                        <button onClick={() => removeScheduleItem(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 hover:text-red-800">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </button>
                                    </div>
                                </div>
                            )
                        })}


                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full items-center md:w-1/4 px-3 mb-6 md:mb-0">
                                <input
                                    name="physical_localization"
                                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    onChange={setPhysicalLocation}
                                    ref={checkboxRef}
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
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="cep"
                                            label="CEP"
                                            placeholder="XXXXX-XXX"
                                            mask="cep"
                                            onChange={e => setCEP(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="street"
                                            label="Endereço"
                                            defaultValue={address.logradouro || ''}
                                            placeholder="Digite a rua"
                                        />

                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="district"
                                            label="Bairro"
                                            defaultValue={address.bairro || ''}
                                            placeholder="Digite o bairro"
                                        />

                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 md:mb-6">
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="number"
                                            label="Número"
                                            placeholder="00"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <div className="relative">
                                            <Select
                                                name="state"
                                                label="Estado"
                                                value={address.uf || selectedState}
                                                onChange={(e) => setSelectedState(e.target.value)}
                                                options={[
                                                    { value: 'AC', label: 'Acre' },
                                                    { value: 'AL', label: 'Alagoas' },
                                                    { value: 'AP', label: 'Amapá' },
                                                    { value: 'AM', label: 'Amazonas' },
                                                    { value: 'BA', label: 'Bahia' },
                                                    { value: 'CE', label: 'Ceará' },
                                                    { value: 'DF', label: 'Distrito Federal' },
                                                    { value: 'ES', label: 'Espírito Santo' },
                                                    { value: 'GO', label: 'Goisás' },
                                                    { value: 'MA', label: 'Maranhão' },
                                                    { value: 'MT', label: 'Mato Grosso' },
                                                    { value: 'MS', label: 'Mato Grosso do Sul' },
                                                    { value: 'MG', label: 'Minas Gerais' },
                                                    { value: 'PA', label: 'Pará' },
                                                    { value: 'PB', label: 'Paraíba' },
                                                    { value: 'PR', label: 'Paraná' },
                                                    { value: 'PE', label: 'Pernambuco' },
                                                    { value: 'PI', label: 'Piauí' },
                                                    { value: 'RJ', label: 'Rio de Janeiro' },
                                                    { value: 'RN', label: 'Rio Grande do Norte' },
                                                    { value: 'RS', label: 'Rio Grande do Sul' },
                                                    { value: 'RO', label: 'Rondônia' },
                                                    { value: 'RR', label: 'Roraima' },
                                                    { value: 'SC', label: 'Santa Catarina' },
                                                    { value: 'SP', label: 'São Paulo' },
                                                    { value: 'SE', label: 'Sergipe' },
                                                    { value: 'TO', label: 'Tocantins' },

                                                ]}
                                                placeholder="Selecione uma opção"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="city"
                                            label="Cidade"
                                            placeholder="Digite a cidade"
                                            defaultValue={address.localidade || ''}
                                        />
                                    </div>
                                </div>
                            </Fragment>
                        )}


                        <div className="flex flex-row gap-1 items-center">
                            <label
                                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                                htmlFor="images">
                                Adicionar imagens
                            </label>
                            <Tooltip
                                idElement="tooltip-images"
                                text="Selecione todas as imagens de uma única só vez"
                            />
                        </div>

                        <div className="flex flex-row gap-6 py-3">
                            {previewImages.map(image => {
                                return (
                                    <img key={image} src={image} alt="" className="flex w-16 h-16 rounded border border-1 border-gray-400" />
                                )
                            })}

                            <div className="w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300 relative">
                                <input type="file" multiple id="image[]" accept="image/*" className="cursor-pointer relative block opacity-0 w-full h-full z-20" onChange={handleSelectedImages} />
                                <div className="text-center absolute p-5 top-0 right-0 left-0 m-auto">
                                    <AiOutlineCamera size={24} />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6 mt-4">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <button
                                    type="submit"
                                    className={classNames(
                                        isLoading ?
                                            "bg-blue-400 text-gray-600 cursor-not-allowed"
                                            : "bg-blue-600 text-white active:bg-blue-700 hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150",
                                        "font-bold uppercase text-xs px-6 py-3 rounded shadow mr-1 mb-1")}>
                                    {isLoading ? "Salvando..." : "Salvar"}
                                </button>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div >
    );
};
