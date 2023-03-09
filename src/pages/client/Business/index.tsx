import { getDay, isWithinInterval } from 'date-fns';
import { BusinessHeader } from '../components/BusinessHeader';
import { Paragraph } from "../components/Paragraph";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../../../components/NavBar/NavBar";
import api from "../../../services/api";
import formatTelephone from '../../../utils/formatTelephone';
import { Assessments } from "../components/Assessments";
import { AssessmentsForm } from "../components/AssessmentsForm";
import { ButtonAction } from "../components/ButtonAction";
import { Pictures } from "../components/Pictures";

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
    category_id: string;
    services: string[];
    stars: number;
    contact: IContact;
    ImageCompany: ImageCompany[];
    Address: IAddress;
    Schedule: ISchedules[];
}

interface Assessment {
    id: string;
    user_id: string;
    comment: string;
    stars: string;
}

export const Business: React.FC = () => {
    const params = useParams();
    const [company, setCompany] = useState<Company>({} as Company);
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];


    useEffect(() => {

        api.get<Company>(`companies/${params.id}`)
            .then(response => {
                setCompany(response.data);
                localStorage.setItem('@web:company_id', response.data.id);
            });

        api.get<Assessment[]>(`/assessments/company/${params.id}`)
            .then(response => {
                setAssessments(response.data);
            })
    }, [params.id]);

    const verifyCompanyIsOpen = useCallback(() => {
        const today = getDay(new Date());
        const schedule = company.Schedule && company.Schedule.find(s => s.weekday === weekdays[today]);

        if (!schedule) {
            return false;
        }

        const openingTime = new Date(`1970-01-01 ${schedule.opening_time}`);
        const closingTime = new Date(`1970-01-01 ${schedule.closing_time}`);
        const now = new Date();

        if (isWithinInterval(now, { start: openingTime, end: closingTime })) {
            return true;
        } else {
            return false;
        }
    }, []);

    return (
        <div className="flex flex-col">
            <NavBar pageCurrent="negocio" />
            <BusinessHeader
                company={company}
                isOpen={verifyCompanyIsOpen()}
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
                                text={formatTelephone(company.contact.telephone)}
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

                    {assessments && assessments.length > 0 ? (
                        <div className="flex flex-col mt-[2.25rem]">
                            <div className="flex flex-col gap-[0.375rem]">
                                <span className="font-inter font-semibold">Avaliações</span>
                                <p className="font-inter font-light text-xs">{assessments.length} comentário(s)</p>
                            </div>
                            {assessments.map(assessment => (
                                <Assessments key={assessment.id} text={assessment.comment} stars={Number(assessment.stars)} />
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

                    <div className="flex flex-row mt-8">
                        <AssessmentsForm table_id={company.id} />
                    </div>

                </div>
            </div>
        </div>
    )
}