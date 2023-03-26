import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SideBar } from "../../../components/Sidebar";
import api from "../../../services/api";
import { PreviousPageButton } from "../../client/components/PreviousPageButton";

interface Proposal {
    id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    customer_id: string;
    createdAt: string;
    customer: {
        id: string;
        user_id: string;
        telephone: string;
        status: string;
        user: {
            id: string;
            name: string;
            email: string;
        }
    }
}

interface Budget {
    id: string;
    customer_id: string;
    company_id: string;
    proposal_id: string;
    description: string;
    delivery_date: string;
    amount: number;
    installments: number;
    files: string[];
}


export const DetailsBudgetEntrepreneur: React.FC = () => {
    const { proposal_id } = useParams();

    const [proposal, setProposal] = useState<Proposal>({} as Proposal);
    const [budget, setBudget] = useState<Budget>({} as Budget);

    useEffect(() => {
        api.get(`proposals/${proposal_id}`).then(response => setProposal(response.data));

        api.get(`proposals/budget/${proposal_id}`).then(response => setBudget(response.data));

    }, [proposal_id]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64 p-8">
                <PreviousPageButton />
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-medium text-lg sm:text-2xl ">
                        Orçamentos
                    </h1>
                </div>
                {proposal && (
                    <div className="flex flex-col gap-6 ml-16">
                        <div className="flex flex-col gap-2 items-start">
                            <span className="font-semibold mb-4 text-base sm:text-lg">
                                Informações do cliente
                            </span>
                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    Nome:
                                </span>
                                <p className="font-light text-sm ml-6">
                                    {proposal.customer?.user.name}
                                </p>
                            </div>
                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    E-mail:
                                </span>
                                <p className="font-light ml-6 text-sm">
                                    {proposal.customer?.user.email}
                                </p>
                            </div>
                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    Telefone:
                                </span>
                                <p className="font-light text-sm ml-1">
                                    {proposal.customer?.telephone}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold text-lg">
                                Sobre a proposta
                            </span>

                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    Objetivo:
                                </span>
                                <p className="font-light text-sm ml-1">
                                    {proposal.objective}
                                </p>
                            </div>

                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    Descrição:
                                </span>
                                <p className="font-light text-sm ml-1">
                                    {proposal.description}
                                </p>
                            </div>

                            <div className="flex flex-row gap-6">
                                <span className="font-semibold text-sm">
                                    Prazo esperado:
                                </span>
                                <p className="font-light text-sm ml-1">
                                    {isNaN(Date.parse(proposal.time)) ? "" : format(new Date(proposal.time), "dd/MM/yyyy")}
                                </p>
                            </div>
                        </div>

                        {
                            budget && (
                                <div className="flex flex-col gap-4">
                                    <span className="font-bold text-xl">Orçamento</span>
                                    <div className="flex flex-col gap-2 w-[45.25rem]">
                                        <span className="font-semibold sm:text-lg">
                                            Descrição
                                        </span>
                                        <p className="font-light text-sm mobile:text-xs">
                                            {budget.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 w-[45.25rem]">
                                        <span className="font-semibold sm:text-lg">
                                            Entrega/Execução do serviço
                                        </span>
                                        <p className="font-light text-xs sm:text-sm">
                                            {isNaN(Date.parse(budget.delivery_date)) ? "" : format(new Date(budget.delivery_date), "dd/MM/yyyy")}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 w-60 sm:w-[45.25rem] ">
                                        <span className="font-semibold sm:text-lg">
                                            Valor do serviço
                                        </span>
                                        <p className="font-light text-xs sm:text-sm text-justify">
                                            {budget.amount && `${budget.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} 
                                                ou ${budget.installments}x de ${(budget.amount / budget.installments).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-2 w-60 sm:w-[45.25rem]">
                                        <span className="font-semibold sm:text-lg">
                                            Anexos
                                        </span>
                                        {budget.files && budget.files.map(file => (
                                            <p key={file} className="font-light text-xs text-blue-700 sm:text-sm text-justify">
                                                {file}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-12">
                            <Link to={budget ? `/admin/budget/edit-proposal/${proposal_id}` : `/admin/budget/create-proposal/${proposal_id}`}>
                                <button className="flex flex-row items-center justify-center gap-5 w-32 sm:w-40 h-8 sm:h-12 rounded bg-blue-600 font-semibold text-white text-sm hover:brightness-90  transition-opacity duration-300">
                                    <span>{!budget ? 'Criar proposta' : 'Editar proposta'}</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
