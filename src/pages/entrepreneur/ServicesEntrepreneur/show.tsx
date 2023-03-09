import { SideBar } from "../../../components/Sidebar";

import { FiEdit2 } from "react-icons/fi";

import { useCallback, useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../../services/api";
import { Assessments } from "../../client/components/Assessments";
import { AssessmentsStars } from "../../client/components/AssessmentsStars";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface ServiceData {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url: string;

}

interface AssessmentsData {
    id: string;
    user_id: string;
    table_id: string;
    comment: string;
    stars: number;
}

export const ShowServicesEntrepreneur: React.FC = () => {
    const { id } = useParams();
    const [service, setService] = useState<ServiceData>({} as ServiceData);
    const [assessments, setAssessments] = useState<AssessmentsData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.get<ServiceData>(`services/${id}`).then(response => setService(response.data));

        api.get<AssessmentsData[]>(`assessments/service/${id}`).then(response =>
            setAssessments(response.data));

    }, [id]);

    const deleteService = useCallback(async () => {
        await api.delete(`/services/${service.id}`);
        toast.success("Serviço excluído com sucesso!");
        navigate('/admin/services');
    }, [service.id, toast, navigate]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="servicos" />
            <div className="flex flex-col w-full sm:ml-64 p-8">
                <PreviousPageButton />
                <div className="flex flex-row items-center gap-6 sm:gap-12 px-24 py-12  border-gray-300">
                    <img src={service.image_url} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-fill rounded-full" />
                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-bold text-2xl text-gray-800">{service.name}</span>
                        <span className="font-inter font-light text-sm">{service.category}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 py-8 px-24">
                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">Descrição</span>
                        <p className="font-inter text-sm text-justify">
                            {service.description}
                        </p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium">Categoria</span>
                        <p className="font-inter text-sm text-justify">{service.category}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <span className="font-inter font-medium text-base">Preço</span>
                        <p className="font-inter text-sm text-justify">
                            {service.price ? service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : 'Preço indisponível'}
                        </p>
                    </div>

                    {assessments.length > 0 ? (
                        <div className="flex flex-col mt-8 sm:mt-10 gap-1">
                            <span className="font-inter font-medium text-sm">Avaliações</span>
                            <p className="font-inter font-light text-sm">{assessments.length} avaliações recebidas</p>
                            {assessments.map(assessment => (
                                <div className="flex flex-row items-center gap-3">
                                    <AssessmentsStars stars={assessment.stars} mode="view" />
                                    <span
                                        className="font-inter font-semibold text-xs text-gray-700"
                                    >
                                        {assessment.stars}
                                    </span>
                                    <Assessments key={assessment.id} text={assessment.comment} stars={Number(assessment.stars)} />
                                    <span className="mt-4 font-inter font-medium text-sm text-blue-600">Veja todos os comentários</span>
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

                    <div className="flex flex-row items-center gap-6">

                        <button
                            onClick={() => navigate(`/admin/services/edit/${service.id}`)}
                            className="mt-6 sm:mt-12 w-36 h-12 p-4 flex flex-row items-center justify-center gap-2 sm:gap-4 rounded bg-green-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                            <FiEdit2 size={16} />
                            <span>Editar</span>
                        </button>

                        <button
                            onClick={deleteService}
                            className="mt-6 sm:mt-12 w-36 h-12 p-4 flex flex-row items-center justify-center gap-4 rounded bg-red-500 font-montserrat font-medium sm:text-base text-xs text-white cursor-pointer hover:brightness-90 duration-300">
                            <AiOutlineDelete size={16} />
                            <span>Excluir</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
}