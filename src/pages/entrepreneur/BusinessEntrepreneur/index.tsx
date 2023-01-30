import { SideBar } from "../../../components/Sidebar";
import Coffee from "../../../assets/coffee-img1.jpg";

import { GoLinkExternal } from "react-icons/go";
import { FiEdit2 } from "react-icons/fi";

import Coffee1 from "../../../assets/coffee-img1.jpg";
import Coffee2 from "../../../assets/coffee-img2.jpg";
import Coffee3 from "../../../assets/coffee-img3.jpg";
import Coffee4 from "../../../assets/coffee-img4.jpg";
import { Pictures } from "../../client/components/Pictures";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";
import { Assessments } from "../../client/components/Assessments";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../../../services/api";
import getCEP from "../../../utils/getCEP";
import axios from "axios";

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
            day_of_week: string,
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

export const BusinessEntrepreneur: React.FC = () => {
    const images = [
        { id: 1, image: Coffee1, description: "Image1" },
        { id: 2, image: Coffee2, description: "Image2" },
        { id: 3, image: Coffee3, description: "Image3" },
        { id: 4, image: Coffee4, description: "Image4" },
    ];

    const [company, setCompany] = useState<CompanyData>();

    useEffect(() => {
        api
            .get('/companies/me')
            .then(response => setCompany(response.data)
            )

        console.log(company);
    }, []);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="empresa" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-row items-center gap-6 sm:gap-12 px-24 py-6 sm:py-12">
                    <img
                        src={Coffee}
                        alt=""
                        className="w-12 sm:w-16 min-h-12 sm:h-16 object-fill rounded-full"
                    />
                    <span className="font-inter font-bold text-lg sm:text-2xl text-gray-800">
                        {company?.name}
                    </span>
                </div>
                <div className="flex flex-col gap-4 sm:gap-4 py-8 sm:py-2 px-24">
                    <div className="flex flex-col gap-1">

                        <span className="font-inter font-medium">
                            Sobre o negócio
                        </span>
                        <p className="font-inter text-sm text-justify">
                            {company?.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">
                            CNPJ
                        </span>
                        <p className="font-inter text-sm text-justify">{company?.cnpj}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">
                            Categoria
                        </span>
                        <p className="font-inter text-sm text-justify">{company?.category}</p>
                    </div>

                    {company?.services.length !== 0 && (
                        <div className="flex flex-col gap-1">
                            <span className="font-inter font-medium">
                                Serviços
                            </span>
                            <p className="font-inter text-sm text-justify">
                                {company?.services.map(service => service)}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">
                            Telefone
                        </span>
                        <p className="font-inter text-sm text-justify">{company?.contact.telephone}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium text-base">Whatsapp</span>
                        <a
                            href={`https://api.whatsapp.com/send/?phone=${company?.contact.whatsapp}`}
                            target="_blank"
                            className="font-inter text-sm text-justify cursor-pointer hover:underline hover:text-blue-600">
                            {company?.contact.whatsapp}
                        </a>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">
                            E-mail
                        </span>
                        <p className="font-inter text-sm text-justify">{company?.contact.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">
                            Website
                        </span>
                        <a
                            href={company?.contact.website}
                            target="_blank"
                            className="flex flex-row items-center gap-1 font-inter text-sm text-justify cursor-pointer hover:underline hover:text-blue-600">
                            {company?.contact.website}
                            <GoLinkExternal />
                        </a>
                    </div>

                    {
                        company?.Schedule?.length === 1 && (
                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    Horários de funcionamento
                                </span>
                                {
                                    company?.Schedule?.map(schedule => (
                                        <div key={schedule.id} className="flex flex-row items-center gap-4 font-inter text-sm">
                                            <span className="font-bold">{schedule.day_of_week}: </span>
                                            <p className="font-normal">{schedule.opening_time} - {schedule.closing_time}</p>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }

                    {
                        company?.Address && (
                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    Endereço
                                </span>
                                <p className="font-inter text-sm text-justify">
                                    {company?.Address.street}, {" "}
                                    {company?.Address.number} - {company?.Address.district}, {" "}
                                    {company?.Address.city} - {company?.Address.state}, {" "}
                                    {company?.Address.cep}
                                </p>
                            </div>
                        )
                    }

                    <span className="py-3 border-b border-black font-inter font-medium">
                        Imagens
                    </span>
                    <div className="grid grid-cols-2 sm:flex sm:flex-row gap-5">
                        {company?.ImageCompany?.map((img) => (
                            <Pictures
                                key={img.id}
                                image={img.image_url}
                                description={img.title}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col mt-14 sm:mt-10 gap-1">
                        <span className="font-inter font-medium text-sm">
                            Avaliações
                        </span>
                        <p className="font-inter font-light text-sm">
                            16 avaliações recebidas
                        </p>
                        <div className="flex flex-row items-center gap-3">
                            <AssessmentsStars stars={5} mode="view" />
                            <span className="font-inter font-semibold text-xs text-gray-700">
                                3.0
                            </span>
                        </div>
                        <Assessments text="O melhor café da cidade" stars={3} />
                        <Assessments
                            text="Atendimento de qualidade, estão de parabéns"
                            stars={4}
                        />
                        <Assessments text="Gostei muito do atendimento" stars={5} />
                    </div>

                    <span className="mt-4 font-inter font-medium text-sm text-blue-600">
                        Veja todos os comentários
                    </span>

                    <Link to={`/admin/business/edit/${company?.id}`}>
                        <button className="mt-6 mb-4 w-36 h-12 p-4 flex flex-row items-center justify-center gap-2 sm:gap-4 rounded bg-green-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                            <FiEdit2 size={16} />
                            <span>Editar</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
