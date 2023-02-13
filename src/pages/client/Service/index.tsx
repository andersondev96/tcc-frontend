import { Card } from "../components/Card";
import { Search } from "../../../components/Search";
import { NavBar } from "../../../components/NavBar/NavBar";

import Coffee1 from "../../../assets/coffee-img1.jpg";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import api from "../../../services/api";
import { useParams } from "react-router-dom";

interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;
    stars: number;

}

interface CompanyData {
    id: string
}

export const Service: React.FC = () => {
    const { company_id } = useParams();
    const [services, setServices] = useState<ServiceData[]>([]);

    useEffect(() => {
        api.get<ServiceData[]>(`/services/company/${company_id}`)
            .then(response => setServices(response.data));
    }, [company_id]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value;

            if (!name) {
                api.get<ServiceData[]>(`/services/company/${company_id}`)
                    .then(response => setServices(response.data));
            } else {
                api.get<ServiceData[]>(`/services/name/${company_id}`, {
                    params: {
                        name
                    }
                })
                    .then(response => setServices(response.data));
            }
        }, [company_id]);

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="servicos" />
            <div className="px-4 py-7 sm:px-24 sm:py-10">
                <h1 className="font-montserrat font-medium text-2xl">Serviços oferecidos</h1>
                <div className="mt-8 sm:mt-8">
                    <Search onChange={searchService} />
                </div>
                <div className="mt-11 flex flex-col font-montserrat font-semibold text-xl">
                    <span>Em destaque</span>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card service_id="1" image={Coffee1} product="Café simples" description="" stars={5} price="R$ 2,00" />
                        <Card service_id="2" image={Coffee1} product="Café simples" description="" stars={3} price="R$ 2,00" />
                        <Card service_id="3" image={Coffee1} product="Café simples" description="" stars={2} price="R$ 2,00" />
                    </div>
                </div>

                {
                    services ? (
                        services.map(service => (
                            <div key={service.id} className="mt-8 flex flex-col font-montserrat font-semibold text-xl">
                                <span>{service.category}</span>
                                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <Card
                                        service_id={service.id}
                                        image={service.image_url ||
                                            "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80"}
                                        product={service.name}
                                        description={service.description}
                                        stars={service.stars}
                                        price={`R$ ${service.price}`}
                                    />
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