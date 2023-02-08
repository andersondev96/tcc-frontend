import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { ServiceCard } from "../components/ServiceCard";
import api from "../../../services/api";

interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;

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
    const navigate = useNavigate();

    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [services, setServices] = useState<ServiceData[]>([]);

    useEffect(() => {
        api
            .get('/companies/me')
            .then(response => setCompany(response.data)
            )
    }, []);

    useEffect(() => {
        api
            .get<ServiceData[]>(`/services/company/${company?.id}`)
            .then(response => setServices(response.data))
    }, [company?.id]);

    const searchService = useCallback(
        async (event: ChangeEvent<HTMLInputElement>) => {
            const name = event.target.value;

            if (!name) {
                api.get<ServiceData[]>(`/services/company/${company?.id}`)
                    .then(response => setServices(response.data));
            } else {
                api.get<ServiceData[]>(`/services/name/${company?.id}`, {
                    params: {
                        name
                    }
                })
                    .then(response => setServices(response.data));
            }
        }, [company?.id]);


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
                        <Link to="/admin/create">
                            <button className="w-36 h-10 bg-indigo-400 rounded font-semibold text-sm text-white hover:brightness-90 transition-opacity duration-300">
                                Adicionar serviço
                            </button>
                        </Link>
                        <Search onChange={searchService} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-12 mt-12">
                        {
                            services.map(service => (
                                <ServiceCard
                                    key={service.id}
                                    id={service.id}
                                    name={service.name}
                                    price={service.price}
                                    category={service.category}
                                />
                            ))
                        }

                    </div>
                    <PaginationTable />
                </div>
            </div>
        </div>
    );
};
