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
    const [valueSerach, setValueSerach] = useState("");
    const [servicesByCategory, setServicesByCategory] = useState<CategoryServiceData>({});
    const [loading, setLoading] = useState(true);

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
                .catch(error => console.log(error))
                .finally(() => setLoading(false));
        }
    }, [company_id, setLoading]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            try {
                if (company_id) {

                    setLoading(true);

                    const name = event.target.value;

                    setValueSerach(name);

                    if (!name) {
                        const response = await api.get(`/services/company/${company_id}`);

                        if (response.data && response.data.services) {
                            setServices(response.data.services);
                        }
                    } else {
                        const response = await api.get(`/services/company/${company_id}`, {
                            params: {
                                name: valueSerach
                            }
                        });

                        if (response.data && response.data.services) {
                            setServices(response.data.services);
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }, [company_id, setValueSerach, valueSerach, setLoading]);


    const loadingHighlightService = useCallback(async () => {
        try {
            if (company_id && services) {
                await api.get(`/services/company/${company_id}`)
                    .then(response => {
                        if (response.data.services) {
                            const highlightServices = response.data.services.filter((service: ServiceData) => service.highlight_service);
                            setHightLightServices(highlightServices);
                        }
                    });
            }

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [company_id, setLoading]);

    useEffect(() => {
        try {
            if (company.category_id) {
                const categoriesSet = new Set<string>();

                services.forEach(service => {
                    categoriesSet.add(service.category);
                });

                api.get(`/categories/list-subcategories/${company.category_id}`)
                    .then(response => {
                        const responseCategorieas = response.data;
                        responseCategorieas.forEach((category: string) => {
                            categoriesSet.add(category);
                        });
                        setCategories(Array.from(categoriesSet));
                    })
                    .catch(error => console.log(error));
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [company.category_id, services, setLoading]);

    useEffect(() => {
        try {
            if (company_id) {
                api.get(`/services/company/${company_id}`)
                    .then(response => setServices(response.data.services))
                    .catch(error => console.log(error));

                loadCompany();
                loadingHighlightService();
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [company_id, loadCompany, loadingHighlightService, setLoading]);

    useEffect(() => {
        try {
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
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }, [services, setServicesByCategory, setLoading]);

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="servicos" />
            <div className="px-4 py-7 sm:px-24 sm:py-10">
                <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
                <div className="mt-8 sm:mt-8">
                    <Search onChange={searchService} />
                </div>

                <>
                    {
                        loading ? (
                            <p className="mt-8 text-sm text-gray-400">Carregando...</p>
                        ) : (

                            <div>
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
                        )
                    }
                </>

            </div>
        </div>
    );
}