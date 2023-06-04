import { useCallback, useEffect, useState } from "react";
import { SideBar } from "../../../components/Sidebar";

import { FiEdit2 } from "react-icons/fi";
import { GoLinkExternal } from "react-icons/go";
import { Link } from "react-router-dom";
import { Gallery } from "../../../components/Gallery";
import api from "../../../services/api";
import formatCEP from "../../../utils/formatCEP";
import formatCPFAndCNPJ from "../../../utils/formatCPFandCNPJ";
import formatTelephone from "../../../utils/formatTelephone";
import { Assessments } from "../../client/components/Assessments";
import { Pictures } from "../../client/components/Pictures";

interface ImageCompany {
    id: string,
    title: string,
    image_name: string,
    image_url: string,
}

interface PictureProps {
    original: string;
    thumbnail: string;
    description: string;
}
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
    ImageCompany?: ImageCompany[];
    user_id: string
}

interface AssessmentData {
    id: string;
    user_id: string;
    comment: string;
    stars: number;
    createdAt: Date;
    user: {
        name: string;
        avatar: string;
    }
}

export const BusinessEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>();
    const [assessments, setAssessments] = useState<AssessmentData[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [showFullScreenImages, setShowFullScreenImages] = useState(false);
    const [logo, setLogo] = useState("");
    const [quantComments, setQuantComments] = useState(5);
    const [isLoading, setIsLoading] = useState(true);

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
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Ocorreu um erro ao realizar a requisição", error);
                setIsLoading(false);
            })

        api.get<AssessmentData[]>(`/assessments/company/${company?.id}`)
            .then(response => {
                setAssessments(response.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log("Ocorreu um erro ao realizar a requisição", error);
                setIsLoading(false);
            }
            );

        api.get("/entrepreneurs")
            .then(response => {
                if (response.data && response.data.company_logo) {
                    setLogo(response.data.company_logo);
                    setIsLoading(false);
                }
            })
    }, [setCompany, setLogo, isLoading]);

    const toggleFullscreen = useCallback(() => {
        setShowFullScreenImages(!showFullScreenImages);
    }, [showFullScreenImages]);

    const convertToPictureProps = useCallback((imageCompany: ImageCompany): PictureProps => {
        return {
            original: imageCompany.image_url,
            thumbnail: imageCompany.image_url,
            description: ''
        }
    }, []);

    const handleShowMoreComments = useCallback(() => {
        if (quantComments <= assessments.length) {
            const newQuantComments = quantComments + 5;
            setQuantComments(newQuantComments);
        }
    }, [quantComments, assessments]);

    const handleShowLessComments = useCallback(() => {
        if (quantComments > 5) {
            const newQuantComments = quantComments - 5;
            setQuantComments(newQuantComments);
        }
    }, [quantComments, assessments]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="empresa" />

            <div className="flex flex-col w-full sm:ml-64">
                {isLoading ? (
                    <div className="flex flex-col items-center mt-24">
                        <h1 className="font-medium text-2xl">Carregando...</h1>
                    </div>
                ) : (
                    !company ? (
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
                            <div>
                                <div className="flex flex-row items-center gap-6 sm:gap-12 px-24 py-6 sm:py-12">

                                    {logo && (
                                        <img
                                            src={logo}
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
                                            <p className="font-inter text-sm text-justify">{formatCPFAndCNPJ(company.cnpj)}</p>
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

                                    {company.contact.website && (
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
                                    )}

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
                                        company.Address && company.physical_localization ? (
                                            <div className="flex flex-col gap-1">
                                                <span className="font-inter font-medium">
                                                    Localização
                                                </span>
                                                <a
                                                    href={`https://www.google.com/maps/search/${company.Address.cep}/@-19.5406953,-43.4148527,11z/data=!3m1!4b1`}
                                                    target="_blank"
                                                    className="font-inter text-sm text-justify cursor-pointer hover:underline hover:text-blue-600">
                                                    {company.Address.street && company.Address.street}  {" "}
                                                    {company.Address.district && company.Address.district} {" "}
                                                    {company.Address.number && company.Address.number} {" "}
                                                    {company.Address.cep && formatCEP(company.Address.cep)} {" "}
                                                    {company.Address.city} - {" "}
                                                    {company.Address.state}
                                                </a>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                <span className="font-inter font-medium">
                                                    Localização
                                                </span>
                                                <a
                                                    href={company.Address && `https://www.google.com/maps/search/${company.Address.cep || company.Address.city}/@-19.5406953,-43.4148527,11z/data=!3m1!4b1`}
                                                    target="_blank"
                                                    className="font-inter text-sm text-justify hover:underline hover:text-blue-600">
                                                    {company.Address && (
                                                        <p>
                                                            {company.Address.city} - {company.Address.state}
                                                        </p>
                                                    )}
                                                </a>
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
                                                <div
                                                    onClick={toggleFullscreen}
                                                    className="grid grid-cols-2 mt-4 sm:flex sm:flex-row gap-5 hover:cursor-pointer">
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
                                                {
                                                    showFullScreenImages && (
                                                        <Gallery
                                                            images={company.ImageCompany.map(convertToPictureProps)}
                                                            toogleFullScreen={toggleFullscreen} />
                                                    )
                                                }
                                            </div>
                                        )
                                    }


                                    {assessments.length > 0 ? (
                                        <div className="flex flex-col mt-8 sm:mt-10 gap-1">
                                            <span className="font-inter font-medium text-sm">Avaliações</span>
                                            <p className="font-inter font-light text-sm">{assessments.length} avaliações recebidas</p>
                                            {assessments.slice(-quantComments).map(assessment => (
                                                <div key={assessment.id} className="flex flex-row items-center gap-3">
                                                    <Assessments key={assessment.id} data={assessment} />
                                                </div>
                                            ))}
                                            <div className="flex flex-row gap-80">
                                                {quantComments <= assessments.length && (
                                                    <button
                                                        onClick={handleShowMoreComments}
                                                        className="text-sm text-blue-600 hover:underline mt-6"
                                                    >
                                                        Exibir mais comentários
                                                    </button>
                                                )}

                                                {quantComments > 5 && (
                                                    <button
                                                        onClick={handleShowLessComments}
                                                        className="text-sm text-blue-600 hover:underline mt-6"
                                                    >
                                                        Exibir menos comentários
                                                    </button>
                                                )}
                                            </div>
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

                        </div>
                    )
                )}
            </div>
        </div>
    );

};
