import { format } from "date-fns";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { SideBar } from "../../../components/Sidebar";
import { Table } from "../../../components/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { TableHead } from "../../../components/Table/TableHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";
import api from "../../../services/api";

interface Company {
    id: string;
}
interface Proposals {
    id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    customer_id: string;
    createdAt: string;
    updatedAt: string;
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

export const BudgetEntrepreneur: React.FC = () => {
    const navigate = useNavigate();

    const [company, setCompany] = useState<Company>({} as Company);
    const [proposals, setProposals] = useState<Proposals[]>([]);
    const [budget, setBudget] = useState<Budget>({} as Budget);
    const [name, setName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const handlePageChange = useCallback((newPage: number) => {
        setCurrentPage(newPage);
    }, []);

    const inicialIndice = (currentPage - 1) * itemsPerPage;
    const finalIndice = inicialIndice * itemsPerPage;
    const data = proposals.slice(inicialIndice, finalIndice);

    useEffect(() => {
        api.get(`companies/me`).then((response) => setCompany(response.data));

        if (company.id) {
            api.get(`proposals/company/${company.id}`).then((response) => setProposals(response.data));
        }
    }, [company.id]);



    const handleEditBudget = useCallback(async (proposal_id: string) => {
        const response = await api.get(`proposals/budget/${proposal_id}`);

        if (response.data) {
            setBudget(response.data);
            navigate(`/admin/budget/edit-proposal/${proposal_id}`);
        } else {
            navigate(`/admin/budget/create-proposal/${proposal_id}`);
        }
    }, [navigate]);


    const handleSearchBudgets = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
        const name = event.target.value;
        setName(name);

        if (company.id) {
            if (!name) {
                api.get(`proposals/company/${company.id}`).then((response) => setProposals(response.data));
            } else {
                api.get(`proposals/filter/${company.id}`, {
                    params: {
                        name
                    }
                })
                    .then((response) => setProposals(response.data));
            }
        }
    }, [company?.id, setProposals]);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-montserrat font-medium text-2xl">Orçamentos</h1>
                </div>
                <div className="flex flex-col px-12 py-4">
                    <Search onChange={handleSearchBudgets} />
                    <div className="mt-6">
                        <Table>
                            <TableHead>
                                <TableRowHead>
                                    <TableHeader>Data</TableHeader>
                                    <TableHeader>Cliente</TableHeader>
                                    <TableHeader>Objetivo do serviço</TableHeader>
                                    <TableHeader>Prazo</TableHeader>
                                    <TableHeader>Status</TableHeader>
                                    <TableHeader>Última atualização</TableHeader>
                                    <TableHeader></TableHeader>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>

                                {proposals.length > 0 ? proposals.map((proposal) => (
                                    <TableRowBody key={proposal.id}>
                                        <TableData>{format(new Date(proposal.createdAt), "dd/MM/yyyy")}</TableData>
                                        <TableData>{proposal.customer && proposal.customer.user.name}</TableData>
                                        <TableData>{proposal.objective}</TableData>
                                        <TableData>{format(new Date(proposal.time), "dd/MM/yyyy")}</TableData>
                                        <TableData>{proposal.status && proposal.status.replace(/\(.*\)/g, "").trim()}</TableData>
                                        <TableData>{format(new Date(proposal.updatedAt), "dd/MM/yyyy")}</TableData>
                                        <TableData>
                                            <div className="flex flex-row gap-2">
                                                <Link to={`/admin/budget/details/${proposal.id}`}>
                                                    <AiOutlineEye size={24} color="#547DE5" />
                                                </Link>
                                                <span onClick={() => handleEditBudget(proposal.id)}>
                                                    <IoDocumentTextOutline size={24} color="#1EBF1B" />
                                                </span>
                                                <TbSend size={24} color="#EEB522" />
                                            </div>
                                        </TableData>
                                    </TableRowBody>
                                )) : (
                                    <TableRowBody>
                                        <TableData>Nenhuma proposta encontrada</TableData>
                                    </TableRowBody>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <PaginationTable
                        tot_results={data.length}
                        items_per_page={itemsPerPage}
                        current_page={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
