import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { ChangeEvent, Fragment, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { Input } from "../../../components/Form/Input";
import { Select } from "../../../components/Form/Select";
import { TagInput } from "../../../components/Form/TagInput";
import { TextArea } from "../../../components/Form/TextArea";
import { SideBar } from "../../../components/Sidebar";
import { Tooltip } from "../../../components/Tooltip";
import api from "../../../services/api";
import getValidationErrors from "../../../utils/getValidateErrors";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface IScheduleItem {
    weekday: string;
    opening_time: string;
    closing_time: string;
    lunch_time: string;
}

interface Address {
    cep?: string;
    logradouro?: string;
    bairro?: string;
    localidade?: string;
    uf?: string;
}

interface CompanyData {
    id: string,
    name: string,
    cnpj: string,
    category_id: string,
    description: string,
    services: string[],
    physical_localization: boolean,
    Schedule: IScheduleItem[],
    category: {
        id: string;
        name: string;
    },
    contact: {
        telephone: string,
        whatsapp: string,
        email: string,
        website: string
    },
    Address: {
        id: string,
        cep: string,
        street: string,
        district: string,
        city: string,
        state: string,
        number: number
    },
    ImageCompany?: [
        {
            id: string,
            title: string,
            image_name: string,
            image_url: string,
        }
    ]
}

interface ICategories {
    id: string;
    name: string;
}

interface UpdateCompanyFormData {
    id: string;
    name: string;
    cnpj: string;
    category_id: string;
    description: string;
    services: string[];
    physical_localization: boolean;
    contact: {
        telephone: string;
        whatsapp: string;
        email: string;
        website: string;
    },
    Address: {
        id: string;
        cep: string;
        street: string;
        district: string;
        city: string;
        state: string;
        number: number;
    },
    ImageCompany?: [
        {
            id: string,
            title: string,
            image_name: string,
            image_url: string,
        }
    ]
}


export const BusinessEdit: React.FC = () => {
    const params = useParams();
    const [company, setCompany] = useState({} as CompanyData);
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();

    const [hasPhysicalLocation, setHasPhysicalLocation] = useState<boolean>(false);
    const [selectedState, setSelectedState] = useState('');
    const [imagesCompany, setImagesCompany] = useState(new FormData());
    const [cep, setCEP] = useState('');
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [address, setAddress] = useState<Address>({});
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [category, setCategory] = useState("");
    const [scheduleItems, setScheduleItems] = useState([
        {
            weekday: '',
            opening_time: '',
            closing_time: '',
            lunch_time: '00:00',
        }
    ]);

    useEffect(() => {
        async function fetchCompany() {
            try {
                const response = await api.get<CompanyData>(`companies/${params.id}`);

                if (!response || !response.data) {
                    navigate("/admin/business");
                    return;
                }

                setHasPhysicalLocation(response.data.physical_localization);
                setCompany(response.data);

                setAddress({
                    cep: response.data.Address.cep,
                    logradouro: response.data.Address.street,
                    bairro: response.data.Address.district,
                    uf: response.data.Address.state,
                    localidade: response.data.Address.city
                });
            } catch (err) {
                console.log("Ocorreu um erro ao realizar a requisição", err);
            }
        }

        fetchCompany();
    }, [params.id, setHasPhysicalLocation, setCompany, setAddress]);

    useEffect(() => {
        if (company && company.Schedule && company.Schedule.length > 0) {
            setScheduleItems(company.Schedule);
        }
    }, [company]);

    useEffect(() => {
        async function fetchCategoryByCompany() {
            try {
                if (company.category_id) {
                    const response = await api.get<ICategories>(`/categories/${company.category_id}`);

                    if (response.data) {
                        setCategory(response.data.id);
                        if (category) {
                            const newCompany = {
                                ...company, category: {
                                    id: response.data.id,
                                    name: response.data.name,
                                }
                            }

                            setCompany(newCompany);
                        }
                    }
                }
            } catch (err) {
                console.log("Ocorreu um erro ao realizar a requisição");
            }
        }

        async function fetchCategories() {
            try {
                const response = await api.get<ICategories[]>("/categories");
                setCategories(response.data);
            } catch (err) {
                console.log("Ocorreu um erro ao realizar a requisição: ", err);
            }
        }

        fetchCategoryByCompany();
        fetchCategories();
    }, [company.category_id, setCategory, setCategories, setCompany, category]);

    useEffect(() => {
        async function fetchTags() {
            try {
                if (!company.services) {
                    return;
                }

                setTags(company.services);
            } catch (err) {
                console.log("Ocorreu um erro ao realizar a requisição: ", err);
            }
        }

        fetchTags();
    }, [company.services, setTags]);

    useEffect(() => {
        try {
            if (!company || !company.ImageCompany) {
                return;
            }

            const images = company.ImageCompany.map((image) => image.image_url);

            setPreviewImages(images);

        } catch (err) {
            console.log("Ocorreu um erro ao realizar a requisição: ", err);
        }
    }, [company, setPreviewImages])

    const tooglePhysicalLocation = useCallback(() => {
        setHasPhysicalLocation(!hasPhysicalLocation);

        if (!hasPhysicalLocation) {
            setAddress({});
        }
    }, [setHasPhysicalLocation, hasPhysicalLocation, setAddress]);

    const handleSelectedImages = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {

            if (e.target.files) {
                const selectedImages = Array.from(e.target.files);


                selectedImages.forEach(image =>
                    imagesCompany.append("company", image)
                );

                const selectedPreviewImages = selectedImages.map(image => {
                    return URL.createObjectURL(image);
                });

                setPreviewImages(selectedPreviewImages);
            }
        }, [imagesCompany, setImagesCompany, previewImages, setPreviewImages]);

    const handleInputChangeTag = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }, []);

    const addTag = useCallback((tag: string) => {
        const tagsValues = [...new Set(tag.split(",").map((t) => t.trim()))];
        const newTags = tagsValues.filter((t) => !tags.includes(t));

        if (tags.length + newTags.length > 5) {
            const trucatedTags = newTags.slice(0, 5 - tags.length);
            setTags([...tags, ...trucatedTags]);
        } else {
            setTags([...tags, ...newTags]);
        }
    }, [tags, setTags]);

    const removeTag = useCallback((index: number) => {
        setTags([...tags.slice(0, index), ...tags.slice(index + 1)]);
    }, [tags, setTags])

    const handleInputKeyDownTag = useCallback((event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            addTag(inputValue);
            setInputValue("");
        } else if (event.key === "Backspace" && inputValue === "") {
            removeTag(tags.length - 1);
        }
    }, [addTag, inputValue, removeTag, tags.length]);

    const handleEditAddress = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === 'street') {
            setCompany(prevState => ({
                ...prevState,
                Address: {
                    ...prevState.Address,
                    street: value
                }
            }));
        } else if (name === 'district') {
            setCompany(prevState => ({
                ...prevState,
                Address: {
                    ...prevState.Address,
                    district: value
                }
            }));
        } else if (name === 'city') {
            setCompany(prevState => ({
                ...prevState,
                Address: {
                    ...prevState.Address,
                    city: value
                }
            }));
        }

    }, [setCompany])

    const handleSetCEP = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const cep = event.target.value;
        console.log(cep);

        if (cep.length === 9) {
            fetch(`https://viacep.com.br/ws/${cep}/json`)
                .then(response => response.json())
                .then(data => {
                    setCompany(prevState => ({
                        ...prevState,
                        Address: {
                            id: prevState.Address.id,
                            cep: data.cep,
                            street: data.logradouro,
                            district: data.bairro,
                            number: company.Address && company.Address.number,
                            city: data.localidade,
                            state: data.uf
                        }
                    }));
                    setAddress({
                        cep: data.cep,
                        logradouro: data.logradouro,
                        bairro: data.bairro,
                        uf: data.uf,
                        localidade: data.localidade,
                    });

                    setCEP(cep);
                })
                .catch(error => console.error(error))
        }
    }, [setCompany, setAddress, setCEP]);

    const cnpjValidation = useCallback((isRequired: boolean) => {
        if (isRequired) {
            return Yup.string()
                .required('CNPJ obrigatório')
        } else {
            return Yup.string().nullable().notRequired();
        }
    }, []);

    const handleSubmit = useCallback(
        async (data: UpdateCompanyFormData) => {
            try {
                formRef.current?.setErrors({});
                setIsLoading(true);

                const hasCNPJ = Boolean(data.cnpj && data.cnpj.length > 0);

                const schema = Yup.object().shape({
                    name: Yup.string().required('Nome obrigatório'),
                    cnpj: cnpjValidation(hasCNPJ),
                    category_id: Yup.string().required('Categoria obrigatória'),
                    contact: Yup.object().shape({
                        telephone: Yup.string()
                            .required('Telefone obrigatório'),

                        whatsapp: Yup
                            .string()
                            .nullable(true),
                        email: Yup.string().email("Formato de e-mail inválido").required('Email obrigatório'),
                        website: Yup.string().url("Digite um endereço válido").nullable()
                    }),
                    ...(hasPhysicalLocation) && {
                        Address: Yup.object().shape({
                            cep: Yup.string()
                                .required(),

                            number: Yup.number()
                                .integer()
                                .positive()
                                .required()
                                .typeError("Digite apenas números")
                        })

                    }

                });
                await schema.validate(data, {
                    abortEarly: false,
                });

                const companyData = {
                    name: data.name,
                    cnpj: data.cnpj,
                    category_id: data.category_id,
                    services: tags,
                    description: data.description,
                    telephone: data.contact.telephone,
                    whatsapp: data.contact.whatsapp,
                    email: data.contact.email,
                    website: data.contact.website,
                    physical_localization: hasPhysicalLocation,
                    ...(hasPhysicalLocation && {
                        cep: data.Address.cep,
                        street: data.Address.street,
                        district: data.Address.district,
                        number: Number(data.Address.number),
                        state: data.Address.state,
                        city: data.Address.city,
                    })
                }

                const response = await api.put(`/companies/${params.id}`, companyData);

                if (response.status === 200) {
                    if (scheduleItems && scheduleItems.length > 0 && scheduleItems.filter(schedule => (
                        schedule.weekday !== "" &&
                        schedule.opening_time !== "" &&
                        schedule.closing_time !== "" &&
                        schedule.lunch_time !== ""
                    ))) {
                        await api.put(`companies/schedules/${response.data.id}`, {
                            schedules: scheduleItems
                        });
                    }

                    if (!imagesCompany.entries().next().done) {
                        await api.put(`/companies/images/${response.data.id}`, imagesCompany);
                    } else {
                        await api.post(`/companies/images/${response.data.id}`, imagesCompany);
                    }
                }

                toast.success('Empresa atualizada com sucesso');

                navigate('/admin/business');

            } catch (err) {
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
        }, [hasPhysicalLocation, tags, scheduleItems, imagesCompany]);

    function classNames(...classes: any) {
        return classes.filter(Boolean).join(' ')
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
    }

    function removeScheduleItem(position: number) {
        const updatedScheduleItems = scheduleItems.filter((scheduleItem, index) => {
            return index !== position;
        });

        setScheduleItems(updatedScheduleItems);
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

    return (
        <div className="flex flex-row">
            <ToastContainer />
            <SideBar pageActive="empresa" />
            <div className="flex flex-col w-full items-center px-24 md:ml-64 mt-6 md:mt-16">
                <div className="flex flex-col md:w-full">
                    <PreviousPageButton />
                    <span className="font-bold text-xl mt-8 md:text-2xl mb-8 mb:mb-12">Editar MEI</span>
                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="w-full md:max-w-4xl"
                        initialData={company}
                    >
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
                                {
                                    company.category && (
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
                                    )
                                }
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
                                    name="contact.telephone"
                                    label="Telefone"
                                    mask="phone"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="contact.whatsapp"
                                    label="Whatsapp"
                                    mask="phone"
                                    placeholder="(XX) XXXXX-XXXX"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap -mx-3 md:mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="contact.email"
                                    label="E-mail"
                                    placeholder="example@example.com"
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <Input
                                    name="contact.website"
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
                                            onChange={(e) => { setScheduleItemValue(index, 'opening_time', e.target.value) }}
                                            value={scheduleItem.opening_time}

                                        />
                                    </div>
                                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="closing_time"
                                            type="time"
                                            label="Fecha às"
                                            placeholder="XX:XX"
                                            onChange={(e) => { setScheduleItemValue(index, 'closing_time', e.target.value) }}
                                            value={scheduleItem.closing_time}
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
                                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    defaultChecked={company.physical_localization}
                                    checked={hasPhysicalLocation}
                                    onChange={tooglePhysicalLocation}
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
                                            name="Address.cep"
                                            label="CEP"
                                            placeholder="XXXXX-XXX"
                                            mask="cep"
                                            onChange={handleSetCEP}
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="street"
                                            label="Endereço"
                                            placeholder="Digite a rua"
                                            value={company.Address.street}
                                            onChange={handleEditAddress}
                                        />

                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="district"
                                            label="Bairro"
                                            placeholder="Digite o bairro"
                                            value={company.Address.district}
                                            onChange={handleEditAddress}

                                        />

                                    </div>
                                </div>

                                <div className="flex flex-wrap -mx-3 md:mb-6">
                                    <div className="w-full md:w-1/5 px-3 mb-6 md:mb-0">
                                        <Input
                                            name="Address.number"
                                            label="Número"
                                            placeholder="00"
                                        />
                                    </div>
                                    <div className="w-full md:w-2/5 px-3 mb-6 md:mb-0">
                                        <div className="relative">
                                            <Select
                                                name="state"
                                                label="Estado"
                                                value={company.Address.state}
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
                                            value={company.Address.city}
                                            placeholder="Digite a cidade"
                                            onChange={handleEditAddress}
                                            readOnly={true}
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
            </div >
        </div >
    );
};
