import { NavBar } from "../../../components/NavBar/NavBar";
import { Search } from "../../../components/Search";
import { Card } from "../components/Card";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../services/api";

interface CompanyData {
    id: string;
    category_id: string;
}

interface ServiceData {
    id: string;
    name: string;
    category: string;
    description: string;
    stars: number;
    favorites: number;
    image_url: string;
    price: number;
    company_id: string;
    highlight_service: boolean;
}

interface Category {
    name: string;
}

interface CategoryServiceData {
    [categoryName: string]: ServiceData[];
}

export const Service: React.FC = () => {
    const { company_id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [hightLightServices, setHightLightServices] = useState<ServiceData[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [servicesByCategory, setServicesByCategory] = useState<CategoryServiceData>({});
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const loadCompany = useCallback(async () => {
        if (company_id) {
            await api.get<CompanyData>(`/companies/${company_id}`)
                .then(response => {
                    if (!response || !response.data) {
                        navigate("/");
                        return;
                    }
                    setCompany(response.data)
                })
                .catch(error => console.log(error));
        }
    }, [company_id]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (company_id) {
                const name = event.target.value;

                if (!name) {
                    api.get(`/services/company/${company_id}?page=${currentPage}&perPage=${itemsPerPage}`)
                        .then(response => {
                            setServices(response.data.services)
                        });
                } else {
                    api.get(`/services/company/${company_id}?page=${currentPage}&perPage=${itemsPerPage}`, {
                        params: {
                            name
                        }
                    })
                        .then(response => {
                            setServices(response.data);
                        });
                }
            }
        }, [company_id, services, currentPage, itemsPerPage]);


    const loadingHighlightService = useCallback(async () => {
        try {
            if (company_id && services) {
                await api.get(`/services/company/${company_id}?page=${currentPage}&perPage=${itemsPerPage}`)
                    .then(response => {
                        if (response.data.services) {
                            const highlightServices = response.data.services.filter((service: ServiceData) => service.highlight_service);
                            setHightLightServices(highlightServices);
                        }
                    });
            }

        } catch (err) {
            console.log(err);
        }
    }, [company_id, currentPage, itemsPerPage]);

    const loadCategories = useCallback(() => {
        if (services.length > 0) {
            const uniqueCategories = new Set(categories);
            services.forEach((service) => {
                uniqueCategories.add(service.category);
            });
            const categoriesArray = [...uniqueCategories];
            setCategories(categoriesArray);
        }
    }, [services]);

    useEffect(() => {
        if (company.category_id) {
            api.get(`/categories/list-subcategories/${company.category_id}`)
                .then(response => setCategories(response.data))
                .catch(error => console.log(error));
        }
    }, [company.category_id]);



    useEffect(() => {

    }, [services, categories]);

    useEffect(() => {
        if (company_id) {
            api.get(`/services/company/${company_id}?page=${currentPage}&perPage=${itemsPerPage}`)
                .then(response => setServices(response.data.services))
                .catch(error => console.log(error));

            loadCompany();
            loadingHighlightService();
            loadCategories();
        }
    }, [company_id, loadCompany, loadingHighlightService, loadCategories, currentPage, itemsPerPage]);

    useEffect(() => {
        if (services) {
            const groupServices = services.reduce<CategoryServiceData>(
                (acc, service) => {
                    const category = service.category;
                    if (acc[category]) {
                        acc[category].push(service);
                    } else {
                        acc[category] = [service];
                    }
                    return acc;
                },
                {}
            );

            setServicesByCategory(groupServices);
        }
    }, [services]);

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="servicos" />
            <div className="px-4 py-7 sm:px-24 sm:py-10">
                <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
                <div className="mt-8 sm:mt-8">
                    <Search onChange={searchService} />
                </div>
                {
                    hightLightServices && (
                        <div className="mt-11 flex flex-col font-montserrat font-semibold text-xl">
                            <span>Em destaque</span>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {
                                    hightLightServices.map(hightLightService => (
                                        <Card key={hightLightService.id} service={hightLightService} highlight />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    categories ? (
                        categories.map(category => (
                            servicesByCategory[category] && (
                                <div className="mt-8 flex flex-col font-montserrat font-semibold text-xl" key={category}>
                                    <span>{category}</span>
                                    <p className="font-light text-sm">{servicesByCategory[category].length} itens</p>
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        {servicesByCategory[category].map((service) => (
                                            <div key={service.id}>
                                                <Card service={service} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )

                        ))
                    ) : (
                        <h1>Nenhum serviço encontrado</h1>
                    )
                }

            </div>
        </div>
    );
}