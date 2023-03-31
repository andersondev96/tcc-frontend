import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { NavBar } from "../../../components/NavBar/NavBar";
import { PaginationTable } from "../../../components/PaginationTable";
import { Search } from "../../../components/Search";
import { Table } from "../../../components/Table";
import { TableBody } from "../../../components/Table/TableBody";
import { TableRowBody } from "../../../components/Table/TableBody/TableRowBody";
import { TableData } from "../../../components/Table/TableData";
import { TableHead } from "../../../components/Table/TableHead";
import { TableHeader } from "../../../components/Table/TableHead/TableHeader";
import { TableRowHead } from "../../../components/Table/TableHead/TableRowHead";
import api from "../../../services/api";
import { PreviousPageButton } from "../components/PreviousPageButton";

interface Proposal {
    id: string;
    company_id: string;
    objective: string;
    time: string;
    description: string;
    status: string;
    createdAt: string;
    company: {
        id: string;
        name: string;
    }
}

interface Customer {
    id: string;
}

export const Budget: React.FC = () => {
    const navigate = useNavigate();
    const [customer, setCustomer] = useState<Customer>({} as Customer);
    const [proposals, setProposals] = useState<Proposal[]>([]);

    useEffect(() => {
        api.get(`/customers/my-customer`).then(response => setCustomer(response.data));
    }, []);

    useEffect(() => {
        api.get("/proposals").then(response => setProposals(response.data));
    }, []);

    const handleSearch = useCallback(() => {

    }, []);
    return (
        <div className="flex flex-col">
            <NavBar />
            <div className="flex flex-col p-10">
                <PreviousPageButton />

                <div className="flex flex-col">
                    <div className="flex flex-col items-start sm:items-center py-4">
                        <h1 className="font-montserrat font-medium text-2xl">
                            Meus orçamentos
                        </h1>
                    </div>
                    <div className="flex flex-col">
                        <Search onChange={handleSearch} />

                        <div className="mt-6">
                            <Table>
                                <TableHead>
                                    <TableRowHead>
                                        <TableHeader>Data</TableHeader>
                                        <TableHeader>Empresa</TableHeader>
                                        <TableHeader>Objetivo do serviço</TableHeader>
                                        <TableHeader>Prazo</TableHeader>
                                        <TableHeader>Status</TableHeader>
                                        <TableHeader></TableHeader>
                                    </TableRowHead>
                                </TableHead>
                                <TableBody>
                                    {proposals ? (
                                        proposals.map(proposal => (
                                            <TableRowBody key={proposal.id}>
                                                <TableData>{format(new Date(proposal.createdAt), "dd/MM/yyyy")}</TableData>
                                                <TableData>{proposal.company.name}</TableData>
                                                <TableData>{proposal.objective}</TableData>
                                                <TableData>{format(new Date(proposal.time), "dd/MM/yyyy")}</TableData>
                                                <TableData>{proposal.status}</TableData>
                                                <TableData>
                                                    <Link to={`/budget/details/${proposal.id}`}>
                                                        <AiOutlineEye size={24} color="#547DE5" />
                                                    </Link>
                                                </TableData>
                                            </TableRowBody>
                                        ))
                                    ) : (
                                        <p>Nenhuma proposta encontrada</p>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <PaginationTable results={proposals.length} />
                    </div>
                </div>
            </div>
        </div>
    );
};
