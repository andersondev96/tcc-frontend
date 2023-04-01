import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { NavBar } from "../../../../components/NavBar/NavBar";
import api from "../../../../services/api";
import { PreviousPageButton } from "../../components/PreviousPageButton";

interface Proposal {
    id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    customer_id: string;
    createdAt: string;
    company: {
        id: string;
        name: string;
        email: string;
        telephone: string;
    }
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

export const BudgetDetails: React.FC = () => {
    const { proposal_id } = useParams();

    const [proposal, setProposal] = useState<Proposal>({} as Proposal);
    const [budget, setBudget] = useState<Budget>({} as Budget);

    useEffect(() => {
        api.get(`proposals/${proposal_id}`).then(response => setProposal(response.data));

        api.get(`proposals/budget/${proposal_id}`).then(response => setBudget(response.data));

    }, [proposal_id]);

    const handleResponseProposal = useCallback((status: string) => {
        console.log(status);
        api.patch(`/proposals/response/${proposal_id}`, {
            status
        }).then(
            (response) => {
                if (response.data.status === "Proposal accepted") {
                    toast.success("Proposta aceita, aguarde o contato do vendedor!")
                } else {
                    toast.error("Proposta recusada");
                }
            }
        )
    }, [proposal_id, toast]);

    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex flex-col p-10">
                <PreviousPageButton />

                <div className="flex flex-col items-start sm:items-center">
                    <div className="flex flex-col items-start sm:items-center py-4">
                        <h1 className="font-montserrat font-medium text-2xl">Orçamento</h1>
                    </div>
                    <div className="mt-6">
                        {proposal && (
                            <div className="flex flex-col gap-4 ml-16">
                                {
                                    proposal.company && (
                                        <div className="flex flex-row items-center gap-6">
                                            <span className="font-semibold text-sm">Vendedor:</span>
                                            <Link to={`/business/${proposal.company.id}`}>
                                                <p className="font-light ml-6 text-sm hover:underline hover:text-blue-500 duration-300">
                                                    {proposal.company.name}
                                                </p>
                                            </Link  >
                                        </div>
                                    )
                                }
                                <div className="flex flex-col items-start">
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
                                <div className="flex flex-col items-start">
                                    <span className="font-semibold mb-4 text-base sm:text-lg">
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
                                        <div className="flex flex-col gap-2 items-start">
                                            <span className="font-semibold mb-4 text-base sm:text-lg">
                                                Orçamento
                                            </span>
                                            <div className="flex flex-col w-[45.25rem]">
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

                                            {budget.files && budget.files.length > 0 && (
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
                                            )}
                                            <div className="mt-8 flex flex-col sm:flex-row gap-2 sm:gap-12">
                                                <button
                                                    onClick={() => handleResponseProposal("accept")}
                                                    className="flex flex-row items-center justify-center gap-5 w-32 h-10 rounded bg-green-600 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300"
                                                >
                                                    <AiOutlineCheck />
                                                    <span>Aceitar</span>
                                                </button>

                                                <button
                                                    onClick={() => handleResponseProposal("reject")}
                                                    className="flex flex-row items-center justify-center gap-5 w-32 h-10 rounded bg-red-500 font-montserrat font-semibold text-white hover:brightness-90  transition-opacity duration-300"
                                                >
                                                    <AiOutlineClose />
                                                    <span>Recusar</span>
                                                </button>
                                            </div>
                                        </div>

                                    )
                                }

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
