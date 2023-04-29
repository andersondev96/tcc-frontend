import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { BiHelpCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import { ServiceCard } from "../components/ServiceCard";

interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;

}

interface CompanyData {
    id: string,
    name: string,
    cnpj: string,
    category: string,
    description: string,
    services: string[],
    physical_localization: boolean,
    contact: {
        telephone: string,
        whatsapp: string,
        email: string,
        website: string,
    },
    Address?: {
        cep: string,
        street: string,
        district: string,
        number: number,
        state: string,
        city: string
    },
    Schedule?: [
        {
            id: string,
            weekday: string,
            opening_time: string,
            closing_time: string,
            lunch_time: string,
        }
    ],
    ImageCompany?: [
        {
            id: string,
            title: string,
            image_name: string,
            image_url: string,
        }
    ]
    user_id: string
}

export const ServicesEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [name, setName] = useState("");
    const [showInfoUploadXLSX, setShowInfoUploadXLSX] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        api
            .get('/companies/me')
            .then(response => setCompany(response.data))
            .catch(error => console.log("Ocorreu um erro ao realizar a requisição", error));


    }, []);

    useEffect(() => {
        const loadMore = async () => {
            if (company.id) {
                setLoading(true);
                const response = await api.get(`/services/company/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`);
                setCurrentPage(currentPage + 1);
                setServices([...services, ...response.data.services]);
            }
        };

        const handleScroll = async () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 192) {
                loadMore();
            }
        }

        window.addEventListener("scroll", handleScroll);

        if (!loading) {
            if (company.id) {
                api.get(`/services/company/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`)
                    .then((response) => {
                        setServices(response.data.services);
                    })
                    .catch((err) => {
                        console.log("Ocorreu um erro ao realizar a requisição", err);
                    })
            }
        }

        return () => window.removeEventListener("scroll", handleScroll);

    }, [company.id, currentPage, itemsPerPage, setServices, loading]);

    const handleReadXlsFiles = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
        try {
            if (e.target.files) {
                const selectedFile = e.target.files[0];

                if (selectedFile) {
                    setFile(selectedFile);

                    if (company.id) {
                        const formData = new FormData();
                        formData.append('file', selectedFile);

                        const response = await api.post(`/services/import/${company.id}`, formData);

                        if (response.data) {
                            setServices([...services, ...response.data]);

                            toast.success("Serviços importados com sucesso!");
                        }
                    }
                }
            }
        } catch (err) {
            toast.error("Erro ao realizar a importação dos serviços");
        }
    }, [setFile, company.id, setServices, services, toast]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value;

            setName(name);

            if (!name) {
                await api.get(`/services/company/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`)
                    .then(response => setServices(response.data.services));
            } else {
                await api.get(`/services/company/${company.id}?page=${currentPage}&perPage=${itemsPerPage}`, {
                    params: {
                        name:
                            name
                    }
                })
                    .then(response => setServices(response.data.services));
            }
        }, [company?.id, currentPage, itemsPerPage, setServices, services, name]);


    return (
        <div className="flex flex-row">
            <SideBar pageActive="servicos" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col items-center py-7 sm:py-12">
                    <h1 className="font-medium text-lg sm:text-2xl">
                        Serviços oferecidos
                    </h1>
                </div>
                <div className="flex flex-col px-16 py-2 sm:py-6">
                    <div className="flex flex-col gap-4 justify-between sm:flex-row items-start sm:items-center">
                        <Link to="/admin/services/create">
                            <button className="w-36 h-10 bg-blue-600 rounded font-semibold text-sm text-white hover:brightness-90 transition-opacity duration-300">
                                Adicionar serviço
                            </button>
                        </Link>
                        <Search onChange={searchService} />
                    </div>
                    <div className="flex flex-row">
                        <label htmlFor="services">
                            <span className="font-light text-gray-600 hover:cursor-pointer hover:underline hover:text-blue-600">ou adicionar lista com serviços</span>
                            <input
                                id="services"
                                name="file"
                                type="file"
                                accept=".xls,.xlsx,.ods,.csv"
                                className="absolute hidden"
                                onChange={handleReadXlsFiles}
                            />
                        </label>

                        <div className="flex flex-col">
                            <BiHelpCircle
                                onClick={() => setShowInfoUploadXLSX(!showInfoUploadXLSX)}
                                className="text-blue-800 ml-2 cursor-pointer" size={18} />
                            {
                                showInfoUploadXLSX && (
                                    <div className="flex flex-col mt-2">
                                        <span className="text-sm">Para adicionar uma lista com vários serviços, faça download desse .csv e depois faça upload do arquivo aqui na página</span>
                                        <a
                                            href="https://github.com/andersondev96/tcc-frontend/blob/1b5ca2b6376d48f800ce6e27a144b5fac6b3b3cf/src/assets/services.xlsx"
                                            target="_blank"
                                            className="text-sm text-gray-800 hover:underline hover:cursor-pointer hover:text-blue-800">
                                            Template lista de serviços
                                        </a>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    {
                        name && (
                            <p className="font-mono text-sm mt-4">
                                {`Exibindo ${services.length} ${services.length > 1 ? ("resultados") : ("resultado")} ${name && `para a busca "${name}"`}`}</p>
                        )
                    }
                    <div className="grid grid-cols-1 sm:grid-cols-5 justify-items-center gap-4 sm:gap-8 mt-8">
                        {
                            services.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    data={service}
                                    setServices={setServices}
                                />
                            ))
                        }

                    </div>

                    {services.length === 0 && (
                        <p className="font-mono text-sm mt-12">Nenhum resultado a ser exibido</p>
                    )}



                </div>
            </div>
        </div>
    );
};
