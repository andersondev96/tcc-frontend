import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { ServiceCard } from "../components/ServiceCard";
import api from "../../../services/api";

interface Service {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;

}

interface Company {
    id: string;
    name: string;
}

export const ServicesEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<Company>({} as Company);
    const [services, setServices] = useState<Service[]>([]);

    useEffect(() => {
        api.get('/companies/me')
            .then(response => setCompany(response.data))
    }, []);

    useEffect(() => {
        api.get(`/services/${company.id}`)
            .then(response => setServices(response.data));
    }, [company.id]);

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
                        <Search />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-12 mt-12">
                        {
                            services.map(service => (
                                <ServiceCard key={service.id} name={service.name} price={service.price} category={service.category} />
                            ))
                        }

                    </div>
                    <PaginationTable />
                </div>
            </div>
        </div>
    );
};
