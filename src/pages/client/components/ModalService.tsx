import { useCallback, useEffect, useState } from "react";
import { Assessments } from "./Assessments";
import { AssessmentsForm } from "./AssessmentsForm";
import { AssessmentsStars } from "./AssessmentsStars";
import { ButtonAction } from "./ButtonAction";

import { ModalContainer } from "../../../components/ModalContainer";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../services/api";
import { ModalCalculate } from './ModalCalculate';

interface ServiceProps {
    id: string;
    name: string;
    category: string;
    description: string;
    stars: number;
    image_url: string;
    price: number;
    company_id: string;
}

interface Assessment {
    id: string;
    user_id: string;
    comment: string;
    stars: number;
    user: {
        avatar: string;
    }
}

interface ModalServiceProps {
    service: ServiceProps;
}

export const ModalService: React.FC<ModalServiceProps> = ({ service }) => {
    const { user } = useAuth();
    const [serviceFavorited, setServiceFavorited] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [assessments, setAssessments] = useState<Assessment[]>([]);

    useEffect(() => {
        api.get<Assessment[]>(`/assessments/service/${service.id}`)
            .then(response => {
                setAssessments(response.data);
            })
    }, [service.id]);

    const IMAGE_DEFAULT = "https://images.unsplash.com/photo-1600456899121-68eda5705257?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1557&q=80";

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const verifyServiceIsFavorited = useCallback(() => {
        api.get(`users/favorite/${service.id}`).then((response) => {
            if (response.data.length > 0) {
                setServiceFavorited(true);
            }
        })
    }, [service.id, setServiceFavorited]);

    const handleFavoriteService = useCallback(async () => {
        if (!serviceFavorited) {
            await api.patch(`/services/favorites/${service.id}`);
            setServiceFavorited(true);
        } else {
            await api.patch(`/services/favorites/unfavorite/${service.id}`);
            setServiceFavorited(false);
        }
    }, [serviceFavorited, setServiceFavorited, service.id]);

    const handleAddAssessments = useCallback((newAssessment: Assessment) => {
        setAssessments((prevAssessments) => [...prevAssessments, newAssessment]);
    }, []);

    useEffect(() => {
        verifyServiceIsFavorited();
    }, [verifyServiceIsFavorited])

    return (
        <div className="py-16 px-12">
            <div className="flex flex-row items-center gap-12 h-32">
                <img src={service.image_url || IMAGE_DEFAULT} alt={service.name} className="w-20 h-20 object-fill rounded-full" />
                <div className="flex flex-col gap-1">
                    <span className="font-inter font-medium text-xl">{service.name}</span>
                    <span className="font-light text-xs">{service.category}</span>
                    <AssessmentsStars stars={service.stars} />
                    <span className="font-inter font-semibold text-amber-900 text-lg">
                        {service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
            </div>
            <div className=" flex flex-col">
                <div className="flex flex-col gap-2">
                    <span className="font-inter font-semibold text-lg">Descrição</span>
                    <p className="font-inter font-light text-lg">
                        {service.description}
                    </p>
                    <div className="mt-6 flex flex-row gap-[2.75rem]">
                        <ButtonAction
                            type="favorite"
                            onClick={handleFavoriteService}
                            active={serviceFavorited}
                        />
                        <ButtonAction type="calculate" onClick={openModal} />
                    </div>
                </div>
                {assessments && assessments.length > 0 ? (
                    <div className="flex flex-col mt-[2.25rem]">
                        <div className="flex flex-col gap-[0.375rem]">
                            <span className="font-inter font-semibold">Avaliações</span>
                            <p className="font-inter font-light text-xs">{assessments.length} comentário(s)</p>
                        </div>
                        {assessments.slice(-3).map(assessment => (
                            <Assessments
                                key={assessment.id}
                                data={assessment}
                            />
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

                <div className="mt-8">
                    <AssessmentsForm
                        table_id={service.id}
                        assessment_type="service"
                        avatar_url={user.avatar &&
                            `http://localhost:3333/avatar/${user.avatar}`
                        }
                        onAddAssessment={handleAddAssessments}
                    />
                </div>
            </div>

            <ModalContainer
                title="Solicitar orçamento"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
            >
                <ModalCalculate
                    company_id={service.company_id}
                    close_modal={closeModal}
                />
            </ModalContainer>

        </div>
    );
}