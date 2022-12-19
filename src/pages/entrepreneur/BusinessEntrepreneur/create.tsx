import { SideBar } from "../../../components/Sidebar";
import { AiOutlineCamera } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { FiSave } from "react-icons/fi";
import { ChangeEvent, FormEvent, useState } from "react";
import { MdAdd } from "react-icons/md";
import api from "../../../services/api";
import { useNavigate } from "react-router-dom";

export const BusinessCreate: React.FC = () => {
    const navigate = useNavigate();

    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);
    const [hasPhysicalLocation, setHasPhysicalLocation] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [description, setDescription] = useState('');
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

    function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
        console.log("Entra");
        if (!event.target.files) {
            return;
        }

        const selectedImages = Array.from(event.target.files);

        console.log(selectedImages);

        setImages(selectedImages);

        const selectedImagesPreview = selectedImages.map(image => {
            return URL.createObjectURL(image);
        });

        setPreviewImages(selectedImagesPreview);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const {
            name,
            cnpj,
            services,
            cep,
            street,
            district,
            number,
            state,
            city,
            telephone,
            whatsapp,
            email,
            website } = formData;

        console.log(formData);

        const servicesArray = [];

        servicesArray.push(services);

        const category = selectedCategory;
        console.log(category);
        console.log(description);
        console.log(scheduleItems);
        console.log(hasPhysicalLocation);

        api.post('companies', {
            name,
            cnpj,
            category,
            description,
            services: servicesArray,
            schedules: scheduleItems,
            physical_localization: hasPhysicalLocation,
            telephone,
            whatsapp,
            email,
            website,
            address: {
                cep,
                street,
                district,
                number,
                state,
                city
            }
        }).then(() => {
            alert('Empresa cadastrada com sucesso');

            navigate("/dashboard/business");
        }).catch(() => {
            alert('Erro no cadastro');
        })
    }

    return (
        <div className="flex flex-row">
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
                        Singhtglass Coffee
                    </span>
                </div>
                <form className="flex flex-col w-[64rem] pt-52 pb-12 px-8 gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                        <div className="flex flex-col w-1/2 gap-1 mobile:w-72">
                            <label
                                htmlFor="business-name"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Nome da empresa
                            </label>
                            <input
                                name="name"
                                className="h-12 rounded"
                                type="text"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="flex flex-col w-1/2 gap-1 mobile:w-72">
                            <label
                                htmlFor="cnpj"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                CNPJ
                            </label>
                            <input className="h-12 rounded" type="text" name="cnpj" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="category"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Categoria
                            </label>
                            <select className="h-12 rounded" name="category" onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="" disabled>Selecione uma opção</option>
                                <option value="Agricultura">Agricultura</option>
                                <option value="Design">Design</option>
                                <option value="Engenharia">Engenharia</option>
                                <option value="Informática">Informática</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="services"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Serviços oferecidos
                            </label>
                            <input className="h-12 rounded" type="text" name="services" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="description"
                            className="font-montserrat font-semibold text-sm text-indigo-200"
                        >
                            Descrição
                        </label>
                        <textarea
                            className="rounded resize-none mobile:w-72"
                            name="description"
                            id="description"
                            onChange={(e) => setDescription(e.target.value)}

                        />
                    </div>

                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="telephone"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Telefone
                            </label>
                            <input className="h-12 rounded" type="text" name="telephone" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="whatsapp"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Whatsapp
                            </label>
                            <input className="h-12 rounded" type="text" name="whatsapp" onChange={handleInputChange} />
                        </div>
                    </div>

                    <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="email"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                E-mail
                            </label>
                            <input className="h-12 rounded" type="text" name="email" onChange={handleInputChange} />
                        </div>
                        <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                            <label
                                htmlFor="website"
                                className="font-montserrat font-semibold text-sm text-indigo-200"
                            >
                                Website
                            </label>
                            <input className="h-12 rounded" type="text" name="website" onChange={handleInputChange} />
                        </div>
                    </div>

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
                    <div className="flex flex-row items-center gap-2">
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
                                    <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                                        <label
                                            htmlFor="street"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            Endereço
                                        </label>
                                        <input className="h-12 rounded" type="text" name="street" onChange={handleInputChange} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-1/2 mobile:w-72">
                                        <label
                                            htmlFor="district"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            Bairro
                                        </label>
                                        <input className="h-12 rounded" type="text" name="district" onChange={handleInputChange} />
                                    </div>
                                </div>
                                <div className="flex flex-row gap-16 mobile:flex-col mobile:gap-4">
                                    <div className="flex flex-col gap-1 w-48 mobile:w-72">
                                        <label
                                            htmlFor="number"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            Número
                                        </label>
                                        <input className="h-12 rounded" type="text" name="number" onChange={handleInputChange} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-48 mobile:w-72">
                                        <label
                                            htmlFor="cep"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            CEP
                                        </label>
                                        <input className="h-12 rounded" type="text" name="cep" onChange={handleInputChange} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-36 mobile:w-72">
                                        <label
                                            htmlFor="state"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            Estado
                                        </label>
                                        <input className="h-12 rounded" type="text" name="state" onChange={handleInputChange} />
                                    </div>
                                    <div className="flex flex-col gap-1 w-60 mobile:w-72">
                                        <label
                                            htmlFor="city"
                                            className="font-montserrat font-semibold text-sm text-indigo-200"
                                        >
                                            Cidade
                                        </label>
                                        <input className="h-12 rounded" type="text" name="city" onChange={handleInputChange} />
                                    </div>
                                </div>
                            </div>
                        ) : ''
                    }

                    <div className="mt-8 flex flex-row border-b border-gray-400 pb-2">
                        <span className="font-inter text-xl">Adicionar imagens</span>
                    </div>
                    <div className="flex flex-row gap-3">
                        {previewImages.map(image => {
                            return (
                                <img key={image} src={image} />
                            )
                        })}

                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col justify-center items-center w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="flex flex-col justify-center items-center ">
                                <AiOutlineCamera size={24} />
                            </div>
                        </label>
                        <input multiple onChange={handleSelectImages} id="images[]" type="file" className="hidden" />

                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col justify-center items-center w-16 h-16 rounded bg-gray-300 opacity-60 border-2 border-dashed border-gray-400 cursor-pointer hover:opacity-100 transition-opacity duration-300"
                        >
                            <div className="flex flex-col justify-center items-center ">
                                <MdAdd size={24} />
                            </div>
                            <input id="dropzone-file" type="file" className="hidden" />
                        </label>

                    </div>
                    <div className="mt-4 flex flex-row items-center justify-center">
                        <button className="w-[10rem] h-[3.125rem] flex flex-row items-center gap-2 justify-center rounded bg-indigo-400 font-inter text-2xl text-white uppercase hover:brightness-90 transition-colors">
                            <FiSave />
                            Salvar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
