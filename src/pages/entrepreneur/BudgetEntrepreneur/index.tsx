import { format } from "date-fns";
import React, { useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { IoDocumentTextOutline } from "react-icons/io5";
import { TbSend } from "react-icons/tb";
import { Link } from "react-router-dom";
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
}

export const BudgetEntrepreneur: React.FC = () => {
    const [company, setCompany] = useState<Company>({} as Company);
    const [proposals, setProposals] = useState<Proposals[]>([]);

    useEffect(() => {
        api.get(`companies/me`).then((response) => setCompany(response.data));

        api.get(`proposals/company/${company.id}`).then((response) => setProposals(response.data));
    }, [company.id]);




    const handleSearchBudgets = useCallback(() => {
        //
    }, []);

    return (
        <div className="flex flex-row">
            <SideBar pageActive="orcamentos" />
            <div className="flex flex-col w-full sm:ml-64">
                <div className="flex flex-col items-center py-6 sm:py-12">
                    <h1 className="font-montserrat font-medium text-2xl">Orçamentos</h1>
                </div>
                <div className="flex flex-col px-12">
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
                                    <TableHeader></TableHeader>
                                </TableRowHead>
                            </TableHead>
                            <TableBody>

                                {proposals.length > 0 ? proposals.map((proposal) => (
                                    <TableRowBody>
                                        <TableData>{format(new Date(proposal.createdAt), "dd/MM/yyyy")}</TableData>
                                        <TableData>{proposal.customer_id}</TableData>
                                        <TableData>{proposal.description}</TableData>
                                        <TableData>{format(new Date(proposal.time), "dd/MM/yyyy")}</TableData>
                                        <TableData>{proposal.status}</TableData>
                                        <TableData>
                                            <div className="flex flex-row gap-2">
                                                <Link to="/admin/budget/details">
                                                    <AiOutlineEye size={24} color="#547DE5" />
                                                </Link>
                                                <Link to="/admin/budget/create-proposal">
                                                    <IoDocumentTextOutline size={24} color="#1EBF1B" />
                                                </Link>
                                                <TbSend size={24} color="#EEB522" />
                                            </div>
                                        </TableData>
                                    </TableRowBody>
                                )) : (
                                    <p className="px-4">Nenhuma proposta encontrada</p>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <PaginationTable results={proposals.length} />
                </div>
            </div>
        </div>
    );
};
