import { NavBar } from "../../../components/NavBar/NavBar";
import { Search } from "../../../components/Search";
import { Card } from "../components/Card";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [services, setServices] = useState<ServiceData[]>([]);
    const [hightLightServices, setHightLightServices] = useState<ServiceData[]>([]);
    const [categories, setCategories] = useState([]);
    const [servicesByCategory, setServicesByCategory] = useState<CategoryServiceData>({});

    const loadCompany = useCallback(async () => {
        if (company_id) {
            await api.get<CompanyData>(`/companies/${company_id}`)
                .then(response => setCompany(response.data))
                .catch(error => console.log(error));
        }
    }, [company_id]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            if (company_id) {
                const name = event.target.value;

                if (!name) {
                    api.get<ServiceData[]>(`/services/company/${company_id}`)
                        .then(response => setServices(response.data));
                } else {
                    api.get<ServiceData[]>(`/services/company/${company_id}`, {
                        params: {
                            name
                        }
                    })
                        .then(response => setServices(response.data));
                }
            }
        }, [company_id, services]);


    const loadingHighlightService = useCallback(async () => {
        try {
            if (company_id && services) {
                await api.get<ServiceData[]>(`/services/company/${company_id}`).then(response => {
                    if (response.data) {
                        const highlightServices = response.data.filter(service => service.highlight_service);
                        setHightLightServices(highlightServices);
                    }
                });
            }

        } catch (err) {
            console.log(err);
        }
    }, [company_id]);

    const loadingCategories = useCallback(async () => {
        if (company.category_id) {
            api.get(`/categories/list-subcategories/${company.category_id}`)
                .then(response => setCategories(response.data))
                .catch(error => console.log(error));
        }
    }, [company.category_id]);

    useEffect(() => {
        if (company_id) {
            api.get<ServiceData[]>(`/services/company/${company_id}`)
                .then(response => setServices(response.data))
                .catch(error => console.log(error));

            loadCompany();
            loadingCategories();
            loadingHighlightService();
        }
    }, [company_id, loadCompany, loadingCategories, loadingHighlightService, setServices]);

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
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-4 gap-12">
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