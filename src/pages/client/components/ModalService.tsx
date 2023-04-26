import { useCallback, useEffect, useState } from "react";
import { Assessments } from "./Assessments";
import { AssessmentsForm } from "./AssessmentsForm";
import { AssessmentsStars } from "./AssessmentsStars";
import { ButtonAction } from "./ButtonAction";

import { ModalContainer } from "../../../components/ModalContainer";
import { useAuth } from "../../../contexts/AuthContext";
import api from "../../../services/api";
import { ModalCalculate } from './ModalCalculate';

interface Service {
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

interface Assessment {
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

interface SettingsCompanyData {
    id: string;
    entrepreneur_id: string;
    online_budget: string;
    online_chat: string;
}

interface ModalServiceProps {
    serviceData: Service;
}

export const ModalService: React.FC<ModalServiceProps> = ({ serviceData }) => {
    const { user } = useAuth();
    const [serviceFavorited, setServiceFavorited] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [assessments, setAssessments] = useState<Assessment[]>([]);
    const [settings, setSettings] = useState<SettingsCompanyData>({} as SettingsCompanyData);
    const [quantComments, setQuantComments] = useState(3);
    const [service, setService] = useState<Service>({} as Service);


    useEffect(() => {
        if (service.id) {
            api.get<Assessment[]>(`/assessments/service/${service.id}`)
                .then(response => {
                    setAssessments(response.data);
                })
        }

        if (service.company_id) {
            api.get(`/entrepreneurs/${service.company_id}`)
                .then((response) => setSettings(response.data))
                .catch(err => console.log(err));
        }

        setService(serviceData);

    }, [service.id, service.company_id, setService]);

    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const verifyServiceIsFavorited = useCallback(() => {
        if (service) {
            api.get(`users/favorite/${service.id}`).then((response) => {
                if (response.data.length > 0) {
                    setServiceFavorited(true);
                }
            })
        }
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

    const handleAddAssessments = useCallback(async (newAssessment: Assessment) => {
        setAssessments((prevAssessments) => [...prevAssessments, newAssessment]);
    }, [setAssessments, service.id]);

    const handleShowMoreComments = useCallback(() => {
        if (quantComments < assessments.length) {
            const newQuantComments = quantComments + 3;
            setQuantComments(newQuantComments);
        }
    }, [quantComments, assessments]);

    const handleShowLessComments = useCallback(() => {
        if (quantComments > 3) {
            const newQuantComments = quantComments - 3;
            setQuantComments(newQuantComments);
        }
    }, [quantComments, assessments]);

    useEffect(() => {
        verifyServiceIsFavorited();
    }, [verifyServiceIsFavorited])

    return (
        <div className="py-16 px-12">
            <div className="flex flex-row items-center gap-12 h-32 mt-4">
                <div className="flex flex-col gap-1">
                    <span className="font-inter font-medium text-xl">{service.name}</span>
                    <span className="font-light text-xs">{service.category}</span>
                    <AssessmentsStars stars={service.stars} />
                    <span className="font-inter font-semibold text-amber-900 text-lg">
                        {service.price && service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </span>
                </div>
            </div>
            <div className=" flex flex-col">
                <div className="flex flex-col gap-2">
                    <div className="mt-2">
                        <span className="font-inter font-semibold text-lg">Descrição</span>
                        <p className="font-inter font-light text-lg">
                            {service.description}
                        </p>
                    </div>
                    {service.image_url && (
                        <div className="mt-2">
                            <span className="font-inter font-semibold text-lg">Imagem</span>
                            <img src={service.image_url} alt={service.name} className="w-24 h-24 sm:w-56 sm:h-44 object-fill rounded mt-2" />
                        </div>
                    )}
                    <div className="mt-6 flex flex-row gap-[2.75rem]">
                        <ButtonAction
                            type="favorite"
                            onClick={handleFavoriteService}
                            active={serviceFavorited}
                        />
                        {settings.online_budget && <ButtonAction type="calculate" onClick={openModal} />}
                    </div>
                </div>
                {assessments && assessments.length > 0 ? (
                    <div className="flex flex-col mt-[2.25rem]">
                        <div className="flex flex-col gap-[0.375rem]">
                            <span className="font-inter font-semibold">Avaliações</span>
                            <p className="font-inter font-light text-xs">{assessments.length} comentário(s)</p>
                        </div>
                        {assessments.slice(-quantComments).map(assessment => (
                            <Assessments
                                key={assessment.id}
                                data={assessment}
                            />
                        ))}
                        <div className="flex flex-row gap-80">
                            {quantComments < assessments.length && (
                                <button
                                    onClick={handleShowMoreComments}
                                    className="text-sm text-blue-600 hover:underline mt-6"
                                >
                                    Exibir mais comentários
                                </button>
                            )}

                            {quantComments > 3 && (
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

                <div className="mt-8">
                    <AssessmentsForm
                        table_id={service.id}
                        assessment_type="service"
                        user={user}
                        onAddAssessment={handleAddAssessments}
                        setService={setService}
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