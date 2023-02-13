import { BusinessHeader } from '../components/BusinessHeader';
import { Paragraph } from "../components/Paragraph";

import ImgCompany from "../../../assets/img-company.jpg";
import { Pictures } from "../components/Pictures";
import { Assessments } from "../components/Assessments";
import { AssessmentsForm } from "../components/AssessmentsForm";
import { ButtonAction } from "../components/ButtonAction";
import { NavBar } from "../../../components/NavBar/NavBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../services/api";

interface IContact {
    telephone: string;
    whatsapp?: string;
    email: string;
    website?: string;
}
interface IAddress {
    street: string;
    district: string;
    number: string;
    state: string;
    city: string;
    cep: string;
    lat: number;
    lng: number;
}

interface ISchedules {
    id: string;
    weekday: string;
    opening_time: string;
    closing_time: string;
}

interface ImageCompany {
    id: string;
    image_url: string;
}

interface Company {
    id: string;
    name: string;
    description: string;
    category: string;
    services: string[];
    stars: number;
    contact: IContact;
    ImageCompany: ImageCompany[];
    Address: IAddress;
    Schedule: ISchedules[];
}

export const Business: React.FC = () => {
    const params = useParams();
    const [company, setCompany] = useState<Company>({} as Company);

    useEffect(() => {
        api.get<Company>(`companies/${params.id}`)
            .then(response => {
                setCompany(response.data);
            });
    }, [params.id]);

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="negocio" />
            <BusinessHeader
                name={company.name}
                category={company.category}
                stars={company.stars}
                schedules={company.Schedule}
                contact={company.contact}
                image={company.ImageCompany && company.ImageCompany.length > 0 ? company.ImageCompany[0].image_url : ImgCompany}
                Address={company.Address && company.Address}
            />
            <div className="px-24 py-12">
                <div className="flex flex-col gap-4 mobile:gap-4">
                    <Paragraph
                        title="Sobre o negócio"
                        text={company.description}
                    />

                    <Paragraph
                        title="Serviços oferecidos"
                        text={company.services}
                    />

                    {
                        company.Address && (
                            <Paragraph
                                title="Endereço"
                                text={`
                                    ${company.Address.street} , 
                                    ${company.Address.district}, 
                                    ${company.Address.number},
                                    ${company.Address.cep},
                                    ${company.Address.city} - 
                                    ${company.Address.state}`
                                }
                            />
                        )
                    }

                    {company.Schedule && (
                        <div className="flex flex-col">
                            <span className="font-inter font-semibold text-gray-700">
                                Horários de funcionamento
                            </span>
                            <div>
                                {company.Schedule.map(schedule => (
                                    <div className="flex flex-row gap-4" key={schedule.id}>
                                        <span className="font-medium">{schedule.weekday}</span>
                                        <p className="font-inter font-medium text-blue-800">{schedule.opening_time} - {schedule.closing_time}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {
                        company.contact && (
                            <Paragraph
                                title="Telefone"
                                text={company.contact.telephone}
                            />
                        )
                    }

                    {
                        company.ImageCompany && company.ImageCompany.length > 0 && (
                            <div className="flex flex-col gap-2">
                                <span className="font-inter font-semibold text-gray-700">Fotos</span>
                                <div className="flex flex-row mobile:grid mobile:grid-cols-2 gap-[1.25rem]">
                                    {company.ImageCompany.map(img => (
                                        <Pictures key={img.id} image={img.image_url} description={company.name} />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                    <ButtonAction type="favorite" />

                    <div className="flex flex-col mt-[2.25rem]">
                        <div className="flex flex-col gap-[0.375rem]">
                            <span className="font-inter font-semibold">Avaliações</span>
                            <p className="font-inter font-light text-xs">4 comentários</p>
                        </div>
                        <Assessments text="O melhor café da cidade" stars={3} />
                        <Assessments text="Atendimento de qualidade, estão de parabéns" stars={4} />
                        <Assessments text="Gostei muito do atendimento" stars={5} />
                    </div>

                    <div className="flex flex-row mt-8">
                        <AssessmentsForm />
                    </div>

                </div>
            </div>
        </div>
    )
}