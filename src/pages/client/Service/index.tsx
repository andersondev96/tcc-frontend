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
    description: string;
    price: number;
    category: string;
    image_url: string;
    stars: number;
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
        await api.get<CompanyData>(`/companies/${company_id}`)
            .then(response => setCompany(response.data))
            .catch(error => console.log(error));
    }, [company_id]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
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
        }, [company_id]);


    const loadingHighlightService = useCallback(async () => {
        await api.get<ServiceData[]>(`/services/company/${company_id}`, {
            params: {
                highlight_service: true
            }
        })
            .then(response => setHightLightServices(response.data))
            .catch(error => console.log(error));
    }, []);

    const loadingCategories = useCallback(async () => {
        api.get(`/categories/list-subcategories/${company.category_id}`)
            .then(response => setCategories(response.data))
            .catch(error => console.log(error));
    }, [company.category_id]);

    useEffect(() => {
        api.get<ServiceData[]>(`/services/company/${company_id}`)
            .then(response => setServices(response.data))
            .catch(error => console.log(error));

        loadCompany();
        loadingCategories();
        loadingHighlightService();
    }, [company_id, loadCompany, loadingHighlightService]);

    useEffect(() => {
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
                                        <Card
                                            key={hightLightService.id}
                                            service_id={hightLightService.id}
                                            image={hightLightService.image_url}
                                            product={hightLightService.name}
                                            description={hightLightService.description}
                                            stars={hightLightService.stars}
                                            price={hightLightService.price}
                                        />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    categories ? (
                        categories.map(category => (
                            <div key={category} className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                                <span>{category}</span>
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {servicesByCategory[category]?.map((service) => (
                                        <div key={service.id}>
                                            <Card
                                                key={service.id}
                                                service_id={service.id}
                                                image={service.image_url}
                                                product={service.name}
                                                description={service.description}
                                                stars={service.stars}
                                                price={service.price}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>Nenhum serviço encontrado</h1>
                    )
                }

            </div>
        </div>
    );
}