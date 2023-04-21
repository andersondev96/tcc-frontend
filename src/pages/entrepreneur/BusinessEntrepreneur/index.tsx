import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { Link } from "react-router-dom";
import { SideBar } from "../../../components/Sidebar";
import formatCEP from "../../../utils/formatCEP";
import formatCPFandCNPJ from "../../../utils/formatCPFandCNPJ";
import formatTelephone from "../../../utils/formatTelephone";
import { Assessments } from "../../client/components/Assessments";
import { Pictures } from "../../client/components/Pictures";

import api from "../../../services/api";

interface CompanyData {
    id: string,
    name: string,
    cnpj: string,
    category_id: string,
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

interface AssessmentData {
    id: string;
    user_id: string;
    comment: string;
    stars: number;
    user: {
        avatar: string;
    }
}

export const BusinessEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>();
    const [assessments, setAssessments] = useState<AssessmentData[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [logo, setLogo] = useState("");

    useEffect(() => {
        async function loadCategory(category_id: string) {
            const response = await api.get(`categories/${category_id}`);
            setCategoryName(response.data.name);
        }

        api
            .get('/companies/me')
            .then(response => {
                setCompany(response.data);
                loadCategory(response.data.category_id);
            })
            .catch(error => console.log("Ocorreu um erro ao realizar a requisição", error))

        api.get("/entrepreneurs")
            .then(response => {
                if (response.data && response.data.company_logo) {
                    setLogo(response.data.company_logo);
                }
            })
    }, [setCompany, setLogo]);

    useEffect(() => {
        if (company) {
            api.get<AssessmentData[]>(`/assessments/company/${company?.id}`)
                .then(response => setAssessments(response.data))
                .catch(error => console.log("Ocorreu um erro ao realizar a requisição", error)
                );
        }
    }, [company?.id]);



    return (
        <div className="flex flex-row">
            <SideBar pageActive="empresa" />

            <div className="flex flex-col w-full sm:ml-64">
                {!company ? (
                    <div className="flex flex-col items-center mt-24">
                        <h1 className="font-medium text-2xl">Cadastre o seu negócio</h1>
                        <Link to="/admin/business/create">
                            <button className="mt-6 mb-4 w-36 h-12 p-4 flex flex-row items-center justify-center gap-2 sm:gap-4 rounded bg-blue-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                                <span>Cadastrar</span>
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div>
                        <div className="flex flex-row items-center gap-6 sm:gap-12 px-24 py-6 sm:py-12">

                            {logo && (
                                <img
                                    src={`http://localhost:3333/company_logo/${logo}`}
                                    alt=""
                                    className="w-12 sm:w-16 min-h-12 sm:h-16 object-fill rounded-full"
                                />
                            )}

                            <span className="font-inter font-bold text-lg sm:text-2xl text-gray-800">
                                {company.name}
                            </span>
                        </div>
                        <div className="flex flex-col gap-4 sm:gap-4 py-8 sm:py-2 px-24">
                            <div className="flex flex-col gap-1">

                                <span className="font-inter font-medium">
                                    Sobre o negócio
                                </span>
                                <p className="font-inter text-sm text-justify">
                                    {company.description}
                                </p>
                            </div>

                            {company.cnpj && (
                                <div className="flex flex-col gap-1">
                                    <span className="font-inter font-medium">
                                        CNPJ
                                    </span>
                                    <p className="font-inter text-sm text-justify">{formatCPFandCNPJ(company.cnpj)}</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    Categoria
                                </span>
                                <p className="font-inter text-sm text-justify">{categoryName}</p>
                            </div>

                            {company?.services.length !== 0 && (
                                <div className="flex flex-col gap-1">
                                    <span className="font-inter font-medium">
                                        Serviços
                                    </span>
                                    <div className="flex flex-row gap-4">
                                        {
                                            company.services.map((service) => (
                                                <p key={service}
                                                    className="bg-gray-200 border border-blue-600 text-gray-700 rounded-full py-1 px-3">
                                                    {service}
                                                </p>
                                            ))
                                        }
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    Telefone
                                </span>
                                <p className="font-inter text-sm text-justify">{formatTelephone(company.contact.telephone)}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium text-base">Whatsapp</span>
                                <a
                                    href={`https://api.whatsapp.com/send/?phone=${company.contact.whatsapp}`}
                                    target="_blank"
                                    className="font-inter text-sm text-justify cursor-pointer hover:underline hover:text-blue-600">
                                    {formatTelephone(company?.contact.whatsapp)}
                                </a>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    E-mail
                                </span>
                                <p className="font-inter text-sm text-justify">{company.contact.email}</p>
                            </div>

                            <div className="flex flex-col gap-1">
                                <span className="font-inter font-medium">
                                    Website
                                </span>
                                <a
                                    href={company.contact.website}
                                    target="_blank"
                                    className="flex flex-row items-center gap-1 font-inter text-sm text-justify cursor-pointer hover:underline hover:text-blue-600">
                                    {company.contact.website}
                                    <GoLinkExternal />
                                </a>
                            </div>

                            {
                                <div className="flex flex-col gap-1">
                                    {
                                        company.Schedule && (
                                            <span className="font-inter font-medium">
                                                Horários de funcionamento
                                            </span>
                                        )
                                    }
                                    {
                                        company.Schedule &&
                                        company.Schedule.map(schedule => (
                                            <div key={schedule.id} className="flex flex-row items-center gap-4 font-inter text-sm">
                                                <span className="font-bold">{schedule.weekday}: </span>
                                                <p className="font-normal">{schedule.opening_time} - {schedule.closing_time}</p>
                                            </div>
                                        ))
                                    }
                                </div>

                            }

                            {
                                company.Address && (
                                    <div className="flex flex-col gap-1">
                                        <span className="font-inter font-medium">
                                            Endereço
                                        </span>
                                        <p className="font-inter text-sm text-justify">
                                            {company.Address.street && company.Address.street}  {" "}
                                            {company.Address.district && company.Address.district} {" "}
                                            {company.Address.number && company.Address.number} {" "}
                                            {company.Address.cep && formatCEP(company.Address.cep)} {" "}
                                            {company.Address.city} - {" "}
                                            {company.Address.state}
                                        </p>
                                    </div>
                                )
                            }


                            {
                                company.ImageCompany && company.ImageCompany.length > 0 &&
                                (
                                    <div className="flex flex-col">
                                        <span className="py-3 border-b border-black font-inter font-medium">
                                            Imagens
                                        </span>
                                        <div className="grid grid-cols-2 mt-4 sm:flex sm:flex-row gap-5">
                                            {
                                                company.ImageCompany &&
                                                company.ImageCompany.map((img) => (
                                                    <Pictures
                                                        key={img.id}
                                                        image={img.image_url}
                                                        description={img.title}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                )
                            }


                            {assessments.length > 0 ? (
                                <div className="flex flex-col mt-8 sm:mt-10 gap-1">
                                    <span className="font-inter font-medium text-sm">Avaliações</span>
                                    <p className="font-inter font-light text-sm">{assessments.length} avaliações recebidas</p>
                                    {assessments.map(assessment => (
                                        <div key={assessment.id} className="flex flex-row items-center gap-3">
                                            <Assessments key={assessment.id} data={assessment} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col mt-[2.25rem]">
                                    <div className="flex flex-col gap-[0.375rem]">
                                        <span className="font-inter font-semibold">Avaliações</span>
                                        <p className="font-inter font-light text-xs">Sem comentários</p>
                                    </div>
                                </div>
                            )}


                            <Link to={`/admin/business/edit/${company?.id}`}>
                                <button className="mt-6 mb-4 w-36 h-12 p-4 flex flex-row items-center justify-center gap-2 sm:gap-4 rounded bg-green-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                                    <FiEdit2 size={16} />
                                    <span>Editar</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
};
